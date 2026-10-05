#!/usr/bin/env python3
"""Build Country Gardens pie fundraiser invoices from the Google Form responses.

Usage:
  invoices.py RESPONSES [--out DIR] [--decisions FILE] [--done INV-...,INV-...]

RESPONSES is the "Form Responses 1" table, either as the markdown pipe table the
Google Drive connector returns or as a CSV export. Writes one PDF (plus a .b64
copy for Gmail attachments) per order, orders.json and review.md to --out, and
prints the review table.
"""

import argparse
import base64
import csv
import datetime as dt
import json
import os
import re
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.utils import ImageReader
from reportlab.platypus import (HRFlowable, Image, Paragraph, SimpleDocTemplate,
                                Spacer, Table, TableStyle)
from xml.sax.saxutils import escape

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO = os.path.join(SKILL_DIR, 'assets', 'logo.jpg')

DK_GREEN = colors.HexColor('#1b4a1b')
MD_GREEN = colors.HexColor('#2e7d2e')
LT_GREEN = colors.HexColor('#eaf5ea')
STRIPE = colors.HexColor('#f5faf5')
GRAY_LINE = colors.HexColor('#cccccc')
GRAY_TEXT = colors.HexColor('#666666')
SIG_BG = colors.HexColor('#fff9c4')
SIG_BORDER = colors.HexColor('#e0b800')
RED = colors.HexColor('#b00000')


# ── reading the responses ─────────────────────────────────────────────────────

def _split_pipe_row(line):
    inner = line.strip()
    inner = inner[1:] if inner.startswith('|') else inner
    inner = inner[:-1] if inner.endswith('|') and not inner.endswith('\\|') else inner
    return [re.sub(r'\\(.)', r'\1', c).strip() for c in re.split(r'(?<!\\)\|', inner)]


def read_table(path):
    text = open(path, encoding='utf-8').read()
    if path.lower().endswith('.csv'):
        rows = list(csv.reader(text.splitlines()))
    else:
        rows = [_split_pipe_row(l) for l in text.splitlines() if l.strip().startswith('|')]
    header_i = next((i for i, r in enumerate(rows) if any(c == 'Timestamp' for c in r)), None)
    if header_i is None:
        sys.exit('Could not find the header row (a row with a "Timestamp" column).')
    header = rows[header_i]
    data = []
    for r in rows[header_i + 1:]:
        if all(re.fullmatch(r':?-*:?', c) for c in r):
            continue
        if len(r) != len(header):
            print(f'warning: skipping row with {len(r)} cells (header has {len(header)}): {r[:3]}',
                  file=sys.stderr)
            continue
        data.append(dict(zip(header, r)))
    return header, data


def find_col(header, pred):
    return next((h for h in header if pred(h.lower())), None)


# ── formatting helpers ────────────────────────────────────────────────────────

def money(x):
    return f'${x:,.2f}'


def parse_qty(raw):
    raw = (raw or '').strip()
    if raw == '':
        return 0, None
    try:
        v = float(raw)
        if v < 0 or v != int(v):
            raise ValueError
        return int(v), None
    except ValueError:
        return 0, raw


def fmt_date(raw):
    raw = (raw or '').strip()
    for f in ('%m/%d/%Y', '%m/%d/%y', '%Y-%m-%d', '%B %d, %Y', '%b %d, %Y'):
        try:
            d = dt.datetime.strptime(raw, f).date()
            return f'{d:%A}, {d:%m/%d/%Y}', d
        except ValueError:
            pass
    return raw, None


def fmt_time(raw):
    raw = (raw or '').strip()
    for f in ('%I:%M:%S %p', '%I:%M %p', '%I %p', '%I:%M%p', '%I%p', '%H:%M:%S', '%H:%M'):
        try:
            t = dt.datetime.strptime(raw.upper(), f)
            return t.strftime('%I:%M %p').lstrip('0')
        except ValueError:
            pass
    return raw


def fmt_phone(raw):
    digits = re.sub(r'\D', '', raw or '')
    if len(digits) == 11 and digits.startswith('1'):
        digits = digits[1:]
    if len(digits) == 10:
        return f'({digits[:3]}) {digits[3:6]}-{digits[6:]}'
    return (raw or '').strip()


# ── building orders ───────────────────────────────────────────────────────────

def build_orders(header, rows, cfg, decisions, existing):
    col = {
        'ts': find_col(header, lambda h: h == 'timestamp'),
        'org': find_col(header, lambda h: 'organization' in h),
        'name': find_col(header, lambda h: 'contact name' in h),
        'email': find_col(header, lambda h: 'email' in h),
        'phone': find_col(header, lambda h: 'phone' in h),
        'method': find_col(header, lambda h: 'pickup or delivery' in h),
        'date': find_col(header, lambda h: 'date' in h and 'timestamp' not in h),
        'time': find_col(header, lambda h: 'time' in h and 'timestamp' not in h),
        'addr': find_col(header, lambda h: 'address' in h),
        'notes': find_col(header, lambda h: 'note' in h),
    }
    pie_cols = [h for h in header if h.strip().lower().endswith('(qty)')]
    donut_col = find_col(header, lambda h: 'donut' in h)
    today = dt.date.today()

    orders = []
    for i, r in enumerate(rows, start=1):
        num = f'{cfg["invoice_prefix"]}-{i:03d}'
        dec = decisions.get(num, {})
        fixes = dec.get('fields', {})
        qty_fixes = {k.lower(): v for k, v in dec.get('quantities', {}).items()}
        get = lambda k: str(fixes[k]).strip() if k in fixes else (r.get(col[k]) or '').strip() if col[k] else ''
        flags = []

        pies = []
        for h in pie_cols:
            name = h[:-len('(qty)')].strip()
            q, bad = parse_qty(str(qty_fixes.get(name.lower(), r[h])))
            if bad is not None:
                flags.append(('decide', f'Unreadable quantity for {name}: "{bad}" (counted as 0)'))
            if q:
                pies.append((name, q))
        donuts, bad = parse_qty(str(qty_fixes.get('donuts', r.get(donut_col, '') if donut_col else '')))
        if bad is not None:
            flags.append(('decide', f'Unreadable donut quantity: "{bad}" (counted as 0)'))
        pie_count = sum(q for _, q in pies)

        method_raw = get('method').lower()
        method = 'Delivery' if 'deliver' in method_raw else 'Pickup' if 'pick' in method_raw else ''
        address = get('addr')
        date_txt, date_val = fmt_date(get('date'))
        notes = get('notes')
        email = get('email')

        pie_price = float(dec.get('pie_price', cfg['pie_price']))
        delivery_fee = float(dec.get('delivery_fee', cfg['delivery_fee'] if method == 'Delivery' else 0))

        if pie_count == 0 and donuts == 0:
            flags.append(('decide', 'Empty order: no pies or donuts'))
        elif pie_count < cfg['pie_minimum']:
            flags.append(('decide', f'{pie_count} pies: under the {cfg["pie_minimum"]}-pie minimum for '
                                    f'the {money(cfg["pie_price"])} fundraiser price'))
        if method == 'Delivery':
            flags.append(('decide', f'Delivery: confirm the fee (default {money(cfg["delivery_fee"])}) for '
                                    f'{address or "NO ADDRESS GIVEN"}'))
        elif not method:
            flags.append(('decide', f'Pickup or delivery not chosen ("{get("method")}")'))
        if date_val is None:
            flags.append(('decide', f'Could not read the date "{get("date")}"'))
        elif date_val < today:
            flags.append(('decide', f'Date {date_txt} is in the past'))
        if notes:
            flags.append(('decide', f'Customer note: "{notes}"'))
        if not email:
            flags.append(('decide', 'No contact email, so the invoice cannot be emailed'))
        if not get('org'):
            flags.append(('decide', 'No organization name'))

        lines = [(name, q, pie_price) for name, q in pies]
        sections = []
        label = (f'Fresh Baked Pies ({money(pie_price)} each — fundraiser rate)'
                 if pie_price == cfg['pie_price'] else f'Fresh Baked Pies ({money(pie_price)} each)')
        if lines:
            sections.append((label, lines))
        if donuts:
            sections.append(('Apple Cider Donuts', [(cfg['donut_label'], donuts, cfg['donut_price'])]))
        if delivery_fee:
            sections.append(('Delivery', [('Delivery Charge', 1, delivery_fee)]))
        total = sum(q * p for _, items in sections for _, q, p in items)

        orders.append({
            'num': num,
            'row': i + 1,
            'timestamp': get('ts'),
            'org': get('org'),
            'contact_name': get('name'),
            'contact_email': email,
            'contact_phone': fmt_phone(get('phone')),
            'method': method,
            'date': date_txt,
            'time': fmt_time(get('time')),
            'address': address,
            'notes': notes,
            'pie_count': pie_count,
            'pies': pies,
            'donuts': donuts,
            'pie_price': pie_price,
            'delivery_fee': delivery_fee,
            'sections': sections,
            'total': round(total, 2),
            'flags': flags,
            'decision_note': dec.get('note', ''),
            'skip': bool(dec.get('skip')),
            'resolved': bool(dec.get('resolved')),
        })
        o = orders[-1]
        o['subject'], o['body'] = email_text(o, cfg)
        o['done'] = o['subject'] in existing
        clash = [s for s in existing if f'({num})' in s and s != o['subject']]
        if clash:
            flags.append(('decide', f'{num} was already used in another email: "{clash[0]}"'))

    by_org = {}
    for o in orders:
        by_org.setdefault(o['org'].strip().lower(), []).append(o['num'])
    for o in orders:
        others = [n for n in by_org.get(o['org'].strip().lower(), []) if n != o['num']]
        if o['org'] and others:
            o['flags'].append(('decide', f'Same organization also submitted {", ".join(others)} '
                                         '(possible resubmission)'))

    for o in orders:
        needs = any(level == 'decide' for level, _ in o['flags'])
        if o['done']:
            o['status'] = 'Already drafted/sent'
        elif o['skip']:
            o['status'] = 'Skipped'
        elif needs and not o['resolved']:
            o['status'] = 'Needs your decision'
        else:
            o['status'] = 'Ready'
    return orders


# ── PDF ───────────────────────────────────────────────────────────────────────

def _p(text, fn='Helvetica', sz=9, color=colors.black, align=TA_LEFT):
    return Paragraph(text, ParagraphStyle('x', fontName=fn, fontSize=sz, textColor=color,
                                          alignment=align, leading=max(sz + 3, 11)))


def _pb(text, **kw):
    return _p(text, fn='Helvetica-Bold', **kw)


def build_pdf(o, cfg, path):
    v = cfg['vendor']
    doc = SimpleDocTemplate(path, pagesize=letter, leftMargin=0.42 * inch, rightMargin=0.42 * inch,
                            topMargin=0.38 * inch, bottomMargin=0.38 * inch, pageCompression=1)
    W = letter[0] - 0.84 * inch
    e = lambda s: escape(str(s))
    story = []

    iw, ih = ImageReader(LOGO).getSize()
    logo = Image(LOGO, width=1.76 * inch, height=1.76 * inch * ih / iw)
    today = dt.date.today()
    right = Table([
        [_pb('INVOICE', sz=22, color=DK_GREEN, align=TA_RIGHT)],
        [_p(f'Date: {today:%B} {today.day}, {today.year}', sz=8, color=GRAY_TEXT, align=TA_RIGHT)],
        [_p(f'Invoice #: {o["num"]}', sz=8, color=GRAY_TEXT, align=TA_RIGHT)],
    ], colWidths=[W - 1.82 * inch])
    right.setStyle(TableStyle([('TOPPADDING', (0, 0), (-1, -1), 1), ('BOTTOMPADDING', (0, 0), (-1, -1), 1)]))
    hdr = Table([[logo, right]], colWidths=[1.82 * inch, W - 1.82 * inch])
    hdr.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'MIDDLE')]))
    story += [hdr, HRFlowable(width='100%', thickness=2, color=DK_GREEN, spaceAfter=4, spaceBefore=3)]

    fulfil = [_p(e(o['method'] or 'Pickup / delivery not specified'), sz=9),
              _p(f'Date: {e(o["date"])}', sz=9),
              _p(f'Time: {e(o["time"])}', sz=9)]
    if o['method'] == 'Delivery':
        fulfil.append(_p(f'Address: {e(o["address"] or "To be confirmed")}', sz=9))
    else:
        fulfil.append(_p(f'Location: {e(v["name"])}', sz=9))
    contact = [_p(e(o['contact_name']), sz=9), _p(e(o['contact_phone']), sz=9),
               _p(e(o['contact_email']), sz=9), '']
    org = [_pb(e(o['org']), sz=11), '', '', '']
    bill_rows = [[_pb('ORGANIZATION', sz=8, color=DK_GREEN), _pb('CONTACT', sz=8, color=DK_GREEN),
                  _pb('DELIVERY / PICKUP', sz=8, color=DK_GREEN)]]
    bill_rows += [[org[k], contact[k], fulfil[k]] for k in range(4)]
    bill = Table(bill_rows, colWidths=[W * 0.30, W * 0.32, W * 0.38])
    bill.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('SPAN', (0, 1), (0, 4)),
                              ('TOPPADDING', (0, 0), (-1, -1), 2), ('BOTTOMPADDING', (0, 0), (-1, -1), 2)]))
    story.append(bill)
    if o['notes']:
        story += [Spacer(1, 3), _p(f'<i>Order notes: {e(o["notes"])}</i>', sz=8, color=GRAY_TEXT)]
    story.append(HRFlowable(width='100%', thickness=1, color=GRAY_LINE, spaceAfter=4, spaceBefore=4))

    CW = [W - 2.3 * inch, 0.5 * inch, 0.95 * inch, 0.85 * inch]
    rows = [[_pb('Item', sz=9, color=colors.white), _pb('Qty', sz=9, color=colors.white, align=TA_CENTER),
             _pb('Unit Price', sz=9, color=colors.white, align=TA_RIGHT),
             _pb('Amount', sz=9, color=colors.white, align=TA_RIGHT)]]
    ts = [('BACKGROUND', (0, 0), (-1, 0), DK_GREEN), ('TOPPADDING', (0, 0), (-1, -1), 2),
          ('BOTTOMPADDING', (0, 0), (-1, -1), 2), ('ALIGN', (1, 0), (1, -1), 'CENTER'),
          ('ALIGN', (2, 0), (3, -1), 'RIGHT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
          ('FONTSIZE', (0, 0), (-1, -1), 8)]
    ri = 1
    for sec, items in o['sections']:
        rows.append([_pb(e(sec), sz=8, color=colors.white), '', '', ''])
        ts += [('BACKGROUND', (0, ri), (-1, ri), MD_GREEN), ('SPAN', (0, ri), (-1, ri)),
               ('TOPPADDING', (0, ri), (-1, ri), 3), ('BOTTOMPADDING', (0, ri), (-1, ri), 3)]
        ri += 1
        for idx, (desc, q, price) in enumerate(items):
            rows.append([_p(e(desc), sz=8), str(q), money(price), money(q * price)])
            ts.append(('BACKGROUND', (0, ri), (-1, ri), STRIPE if idx % 2 == 0 else colors.white))
            ri += 1
    tbl = Table(rows, colWidths=CW)
    tbl.setStyle(TableStyle(ts))
    story.append(tbl)

    gt = Table([[_pb('GRAND TOTAL', sz=11, color=DK_GREEN, align=TA_RIGHT), '', '',
                 _pb(money(o['total']), sz=11, color=DK_GREEN, align=TA_RIGHT)]], colWidths=CW)
    gt.setStyle(TableStyle([('SPAN', (0, 0), (2, 0)), ('BACKGROUND', (0, 0), (-1, 0), LT_GREEN),
                            ('LINEABOVE', (0, 0), (-1, 0), 2, DK_GREEN), ('LINEBELOW', (0, 0), (-1, 0), 2, DK_GREEN),
                            ('TOPPADDING', (0, 0), (-1, 0), 6), ('BOTTOMPADDING', (0, 0), (-1, 0), 6)]))
    story += [gt, Spacer(1, 0.1 * inch), _pb(e(cfg['payment_note']), sz=9, color=RED), Spacer(1, 0.1 * inch)]

    sig = Table([
        [_pb('CUSTOMER SIGNATURE REQUIRED', sz=9, color=DK_GREEN), '', ''],
        [_p('My signature below confirms that these amounts are final and cannot be changed once submitted.',
            sz=8, color=colors.HexColor('#444444')), '', ''],
        ['', '', ''],
        [_p('_' * 36, sz=9), _p('_' * 28, sz=9), _p('_' * 14, sz=9)],
        [_p('Customer Signature', sz=7, color=GRAY_TEXT), _p('Printed Name', sz=7, color=GRAY_TEXT),
         _p('Date', sz=7, color=GRAY_TEXT)],
    ], colWidths=[W * 0.43, W * 0.37, W * 0.20], rowHeights=[None, None, 0.16 * inch, None, None])
    sig.setStyle(TableStyle([
        ('SPAN', (0, 0), (-1, 0)), ('SPAN', (0, 1), (-1, 1)),
        ('BACKGROUND', (0, 0), (-1, -1), SIG_BG), ('BOX', (0, 0), (-1, -1), 1.5, SIG_BORDER),
        ('LEFTPADDING', (0, 0), (-1, -1), 8), ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 2), ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
        ('TOPPADDING', (0, 0), (-1, 0), 7), ('BOTTOMPADDING', (0, -1), (-1, -1), 7),
    ]))
    story += [sig, Spacer(1, 0.06 * inch), HRFlowable(width='100%', thickness=0.5, color=GRAY_LINE, spaceAfter=3),
              _p(e(f'{v["name"]}  •  {v["address"]}  •  {v["phone"]}  •  {v["email"]}'),
                 sz=7, color=GRAY_TEXT, align=TA_CENTER)]
    doc.build(story)

    data = open(path, 'rb').read()
    return len(re.findall(rb'/Type /Page\b(?!s)', data))


# ── email text ────────────────────────────────────────────────────────────────

def email_text(o, cfg):
    v = cfg['vendor']
    first = o['contact_name'].split()[0] if o['contact_name'] else 'there'
    lines = [f'Hi {first},', '',
             f'Thank you for {o["org"]}\'s {cfg["order_phrase"]} with {v["name"]}! Your invoice is attached.', '',
             'Order summary:']
    pie_word = 'pie' if o['pie_count'] == 1 else 'pies'
    if o['pie_count']:
        lines.append(f'- {o["pie_count"]} {pie_word} at {money(o["pie_price"])} each: '
                     f'{money(o["pie_count"] * o["pie_price"])}')
    if o['donuts']:
        pack_word = 'pack' if o['donuts'] == 1 else 'packs'
        lines.append(f'- {o["donuts"]} {pack_word} of Apple Cider Donuts at {money(cfg["donut_price"])} each: '
                     f'{money(o["donuts"] * cfg["donut_price"])}')
    if o['delivery_fee']:
        lines.append(f'- Delivery charge: {money(o["delivery_fee"])}')
    lines += [f'Grand Total: {money(o["total"])}', '']
    when = o['date'] + (f' at {o["time"]}' if o['time'][:1].isdigit() else f', {o["time"]}' if o['time'] else '')
    if o['method'] == 'Delivery':
        lines += [f'Delivery: {when}', f'Address: {o["address"] or "to be confirmed"}']
    else:
        lines += [f'Pickup: {when}', f'Location: {v["name"]}, {v["address"]}']
    lines += ['',
              'Please review the invoice, sign the signature block, and return it to us. '
              'All payments must be made via cash or check.', '',
              'If anything looks incorrect, please let us know as soon as possible.', '',
              'Thank you,', v['name'], v['address'], v['phone']]
    subject = f'Country Gardens Pie Order Invoice – {o["org"]} ({o["num"]})'
    return subject, '\n'.join(lines)


# ── review output ─────────────────────────────────────────────────────────────

STATUS_ORDER = {'Needs your decision': 0, 'Ready': 1, 'Skipped': 2, 'Already drafted/sent': 3}


def review_markdown(orders):
    ordered = sorted(orders, key=lambda o: (STATUS_ORDER[o['status']], o['num']))
    out = ['| Invoice | Organization | Contact | Pies | Donuts | Pickup/Delivery | Total | Status | Flags |',
           '|---|---|---|---:|---:|---|---:|---|---|']
    for o in ordered:
        flags = '; '.join(o['flags']) or '—'
        if o['decision_note']:
            flags += f' → Decision: {o["decision_note"]}'
        cell = lambda s: str(s).replace('|', '/').replace('\n', ' ')
        out.append(f'| {o["num"]} | {cell(o["org"])} | {cell(o["contact_name"])} | {o["pie_count"]} | '
                   f'{o["donuts"]} | {o["method"] or "?"} {cell(o["date"])} | {money(o["total"])} | '
                   f'{o["status"]} | {cell(flags)} |')
    counts = {}
    for o in orders:
        counts[o['status']] = counts.get(o['status'], 0) + 1
    summary = ', '.join(f'{n} {s.lower()}' for s, n in sorted(counts.items(), key=lambda kv: STATUS_ORDER[kv[0]]))
    out += ['', f'{len(orders)} orders: {summary}.', '', '## Line items (check against the sheet)', '']
    for o in sorted(orders, key=lambda o: o['num']):
        items = ', '.join(f'{n} ×{q}' for n, q in o['pies']) or 'no pies'
        out.append(f'- **{o["num"]} {o["org"]}** (sheet row {o["row"]}): {items}; donuts ×{o["donuts"]}; '
                   f'delivery fee {money(o["delivery_fee"])}; total {money(o["total"])}')
    return '\n'.join(out)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('responses')
    ap.add_argument('--out', default='invoices/output')
    ap.add_argument('--decisions', help='JSON of per-invoice decisions (see SKILL.md)')
    ap.add_argument('--existing', help='text file of subjects of invoice emails already drafted or sent, '
                                       'one per line')
    ap.add_argument('--config', default=os.path.join(SKILL_DIR, 'config.json'))
    args = ap.parse_args()

    cfg = json.load(open(args.config))
    decisions = json.load(open(args.decisions)) if args.decisions and os.path.exists(args.decisions) else {}
    existing = set()
    if args.existing and os.path.exists(args.existing):
        existing = {l.strip() for l in open(args.existing, encoding='utf-8') if l.strip()}
    header, rows = read_table(args.responses)
    orders = build_orders(header, rows, cfg, decisions, existing)

    os.makedirs(args.out, exist_ok=True)
    for o in orders:
        if o['done'] or o['skip']:
            continue
        pdf = os.path.join(os.path.abspath(args.out), f'Invoice_{o["num"]}.pdf')
        pages = build_pdf(o, cfg, pdf)
        if pages != 1:
            o['flags'].append(('decide', f'Invoice runs to {pages} pages'))
            o['status'] = 'Needs your decision' if not o['resolved'] else o['status']
        with open(pdf + '.b64', 'w') as f:
            f.write(base64.b64encode(open(pdf, 'rb').read()).decode())
        o['pdf'] = pdf
        o['pdf_b64'] = pdf + '.b64'

    for o in orders:
        o['flags'] = [t for _, t in o['flags']]
    json.dump(orders, open(os.path.join(args.out, 'orders.json'), 'w'), indent=2)
    review = review_markdown(orders)
    open(os.path.join(args.out, 'review.md'), 'w').write(review + '\n')
    print(review)


if __name__ == '__main__':
    main()

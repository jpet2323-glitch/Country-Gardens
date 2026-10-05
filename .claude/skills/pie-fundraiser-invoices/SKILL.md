---
name: pie-fundraiser-invoices
description: Turn Country Gardens Farm Market pie fundraiser Google Form responses into branded PDF invoices and Gmail drafts, with a review step for orders that need a decision. Use this whenever someone wants to invoice pie, donut or fundraiser orders, process new form submissions, "do the invoices", check which fundraiser orders still need invoicing, or email invoices to PTOs, schools, teams or other organizations, even if they don't say "skill" or name the form.
---

# Pie fundraiser invoices

Country Gardens runs a Thanksgiving pie fundraiser for 30-35 groups (PTOs, schools, teams). Each group submits a Google Form. This skill turns the submissions into one-page invoices and emails them. **The owners review every invoice before it goes out**, and certain orders need their decision first. Nothing reaches a customer until they say so.

Everything that varies by season (prices, the 50-pie minimum, delivery fee, invoice number prefix, the responses sheet) lives in `config.json`. Read it at the start, and edit it when the owners change a price or start a new season.

## Workflow

### 1. Setup

```bash
python3 -c "import reportlab" 2>/dev/null || pip install -q reportlab
python3 -c "import pymupdf" 2>/dev/null || pip install -q pymupdf   # only for previews
mkdir -p invoices/output
```

`invoices/output/` is gitignored on purpose: invoices and responses contain customers' names, phones and emails, and this repo is public (it hosts the website). Never commit anything from it.

### 2. Get the form responses

Call the Google Drive connector's `read_file_content` with `responses_sheet_id` from `config.json`. Save the **"Form Responses 1"** table to `invoices/output/responses.md` exactly as returned: the pipe-table lines, including the header row with `Timestamp`. Leave out the "Form Questions" sheet. Copy cells verbatim. The script does all the parsing and arithmetic, so retyping or "cleaning" data only adds errors.

Check the result is complete. The connector prints `Table Range: A1:Z<N>`, which means N-1 orders. If your saved table has fewer data rows, the connector truncated it. In that case use `download_file_content` with `exportMimeType: "text/csv"`, decode the base64 into `invoices/output/responses.csv`, and use that instead.

### 3. Find invoices already emailed or drafted

Invoice numbers come from the row position (row 2 → `INV-2026-001`), so re-running is safe, as long as the script knows what already went out. Collect every subject line starting with `Country Gardens Pie Order Invoice` from:
- `search_threads` with query `subject:"Country Gardens Pie Order Invoice"` (sent mail), and again with `in:draft subject:"Country Gardens Pie Order Invoice"`
- page through results until there are no more

Write them one per line to `invoices/output/existing.txt`. Orders whose exact subject appears there are skipped. If an invoice number appears with a *different* organization, the script flags it. That means someone deleted or reordered rows in the responses sheet, and the owners need to sort it out before anything is sent.

### 4. Build invoices and the review table

```bash
python3 .claude/skills/pie-fundraiser-invoices/scripts/invoices.py invoices/output/responses.md \
  --out invoices/output --existing invoices/output/existing.txt --decisions invoices/output/decisions.json
```

This writes `Invoice_<num>.pdf` (+ `.b64`) for each order not yet sent or skipped, `orders.json` (all computed data including each email's subject and body), and `review.md`. It prints the review table, with flagged orders first.

### 5. Review with the owners

Show the review table, starting with the **Needs your decision** orders. These are the cases the owners explicitly want to see before anything goes out:

| Flag | Why it matters | Typical decision |
|---|---|---|
| Under the 50-pie minimum | Fundraiser price is only promised at 50+ pies | Keep $17, use another price, or hold the order |
| Delivery | Fee depends on distance; default is $100 | Confirm or change the fee |
| Customer note | Notes often change the order ("add 2 pecan", "deliver to the side door") | Adjust quantities/fields or just acknowledge |
| Same organization twice | Usually a corrected resubmission | Invoice one, skip the other |
| Unreadable quantity or date, past date, no email, empty order, more than one page | Bad data or a broken invoice | Correct the field, or skip |

Ask about each flagged order. AskUserQuestion works well for grouping a few at a time. Accept batch answers too ("$100 for all deliveries"). Never resolve a flag on your own judgment, because pricing and delivery are the owners' call. Also mention the "Line items" list in `review.md`, so they can spot-check quantities against the sheet.

Record answers in `invoices/output/decisions.json`, keyed by invoice number, then re-run step 4:

```json
{
  "INV-2026-001": {"skip": true, "note": "test submission"},
  "INV-2026-003": {"delivery_fee": 50, "resolved": true, "note": "close by, $50 fee"},
  "INV-2026-005": {"fields": {"date": "11/23/2026", "addr": "1 School Rd, Robbinsville NJ 08691"},
                   "quantities": {"Apple Crumb": 10}, "resolved": true},
  "INV-2026-007": {"pie_price": 16, "resolved": true, "note": "owner approved $16"}
}
```

- `resolved: true` marks the flags as handled. A corrected field or quantity that makes a flag disappear needs no `resolved`.
- `fields` can override: `org`, `name`, `email`, `phone`, `method`, `date`, `time`, `addr`, `notes`.
- `quantities` uses the pie names as they appear on the invoice, plus `donuts`.
- `note` is shown in the review table, so leave one explaining each decision.

`decisions.json` lives in the gitignored output folder and disappears when the session ends. That's fine, because Gmail is the record of what went out (step 3). Only orders not yet drafted need decisions in a later session.

Look at one rendered invoice per batch before drafting, especially any with a long organization name or notes. Render it with pymupdf to a PNG and read it.

### 6. Create Gmail drafts (Ready orders only)

Work in batches of about 5 so the owners can review as you go. For each Ready order in `orders.json`:

1. Read `pdf_b64` and call Gmail `create_draft` with `to: [contact_email]`, the order's `subject` and `body` exactly as written, and the attachment `{filename: "Invoice_<num>.pdf", mimeType: "application/pdf", content: <the base64>}`. Copy the base64 exactly. The attachment has to pass through this conversation, so a single wrong character corrupts the PDF.
2. Verify it: call `get_draft` with `messageFormat: "RAW"`, then run
   `python3 .claude/skills/pie-fundraiser-invoices/scripts/verify_draft.py <draftId> <pdf path>`.
   It finds the RAW result in this session's transcript and compares checksums. On `MISMATCH`, delete the draft, then recreate and re-verify. On `NOT FOUND`, tell the owners that this draft's attachment couldn't be checked automatically and they should open it in Gmail.

Then give the owners the list: organization, total, and draft link.

### 7. Send only on the owners' say-so

The owners review drafts in Gmail (cgfmfundraising@gmail.com) and may send them themselves. If they ask you to send, send exactly the drafts they approved with `send_message` and `draftId`. Approval covers only those drafts, not the rest of the batch or future batches. Afterwards, report what was sent.

## Notes

- Invoice number = `invoice_prefix` + data-row position. Rows must not be deleted or re-sorted in the responses sheet mid-season. To drop an order, skip it in `decisions.json` instead.
- Flavors come from the sheet's `(qty)` column headers, so adding or renaming a flavor in the form needs no code change. Every flavor is charged the same pie price.
- The invoice date is the day the PDF is generated.
- The PDF is designed to fit on one page. The script flags any that don't.

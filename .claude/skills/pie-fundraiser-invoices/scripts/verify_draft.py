#!/usr/bin/env python3
"""Confirm a Gmail draft's PDF attachment is byte-identical to the local invoice.

Usage: verify_draft.py DRAFT_ID PDF_PATH

Call the Gmail connector's get_draft with messageFormat RAW first. Its result
lands in this Claude Code session's transcript, which this script searches for
the draft's raw MIME, so the attachment never has to be copied out by hand.
Exit codes: 0 match, 1 mismatch, 2 draft not found in the transcript.
"""

import base64
import email
import glob
import hashlib
import os
import re
import sys
from email import policy

RAW_RE = re.compile(r'\\*"raw\\*"\s*:\s*\\*"([A-Za-z0-9_=-]+)')


def find_raw(draft_id):
    files = sorted(glob.glob(os.path.expanduser('~/.claude/projects/*/*.jsonl')),
                   key=os.path.getmtime, reverse=True)
    for f in files:
        found = None
        with open(f, encoding='utf-8', errors='replace') as fh:
            for line in fh:
                if draft_id in line and '"raw' in line.replace('\\', ''):
                    m = RAW_RE.search(line)
                    if m:
                        found = m.group(1)
        if found:
            return found
    return None


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    draft_id, pdf_path = sys.argv[1], sys.argv[2]
    raw = find_raw(draft_id)
    if not raw:
        print(f'NOT FOUND: no RAW get_draft result for {draft_id} in the session transcript')
        sys.exit(2)
    msg = email.message_from_bytes(base64.urlsafe_b64decode(raw + '=' * (-len(raw) % 4)),
                                   policy=policy.default)
    want = hashlib.md5(open(pdf_path, 'rb').read()).hexdigest()
    name = os.path.basename(pdf_path)
    for part in msg.iter_attachments():
        if part.get_filename() == name:
            got = hashlib.md5(part.get_payload(decode=True)).hexdigest()
            if got == want:
                print(f'MATCH: {name} in draft {draft_id}')
                sys.exit(0)
            print(f'MISMATCH: {name} in draft {draft_id} differs from the local file')
            sys.exit(1)
    print(f'MISMATCH: draft {draft_id} has no attachment named {name}')
    sys.exit(1)


if __name__ == '__main__':
    main()

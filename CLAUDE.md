# Project notes for Claude

## Dates on invoices, forms, and customer-facing documents

Never attach a day-of-week label (e.g. "Monday") to a date without verifying
it against the actual calendar first (e.g. `date -d "YYYY-MM-DD" +"%A"`).
Do not guess or infer the weekday from context, memory, or a source email —
always compute it directly before it goes into any invoice, spreadsheet
note, or other document sent to a customer or organization.

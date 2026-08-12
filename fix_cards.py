import os
import re

filepath = 'IRCTC/assets/new_ui.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the old buggy card CSS
old_css_regex = r"/\* MAKE INNER CARDS LOOK GOOD IN SECONDARY PAGES \*/.*?(?=/\* FIX INPUT GROUPS ON SECONDARY PAGES \*/)"
content = re.sub(old_css_regex, "", content, flags=re.DOTALL)

# Insert the correct comprehensive CSS
correct_css = '''/* FIX TRACKING, PNR, BOOKINGS CARDS */
.tracking-card, .pnr-result-card, .booking-card {
    background: var(--pure-white) !important;
    border: 1px solid var(--border-color) !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.03) !important;
    border-radius: 20px !important;
    padding: 25px !important;
    margin-top: 25px !important;
    text-align: left;
}

.tracking-header, .pnr-result-header, .bc-header {
    border-bottom: 1px solid var(--border-color) !important;
    padding-bottom: 15px !important;
    margin-bottom: 20px !important;
    background: transparent !important;
}

.tracking-header h3, .pnr-result-header h3, .bc-title {
    color: var(--dark-blue) !important;
    font-size: 24px !important;
}

.tracking-header p, .pnr-result-header p, .bc-subtitle, .bc-meta {
    color: var(--text-muted) !important;
}

.tracking-stats, .pnr-details, .bc-details, .pnr-passengers {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    background: transparent !important;
}

.tracking-stat, .pnr-detail, .bc-detail {
    background: #f9f9f9 !important;
    border: 1px solid var(--border-color) !important;
    border-radius: 12px !important;
    padding: 15px !important;
    flex: 1;
    min-width: 150px;
}

.tracking-stat strong, .pnr-detail strong, .bc-detail strong, .pnr-passenger-row td {
    color: var(--dark-blue) !important;
    font-size: 16px !important;
}

.tracking-stat span, .pnr-detail span, .bc-detail span, .pnr-passenger-row th {
    color: var(--text-muted) !important;
}

.bc-train-info, .bc-status {
    color: var(--text-dark) !important;
}

.pnr-passengers-table {
    width: 100% !important;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    margin-top: 15px !important;
}

.pnr-passengers-table th {
    background: #f9f9f9 !important;
    color: var(--text-muted) !important;
    padding: 12px 15px !important;
    border-bottom: 1px solid var(--border-color) !important;
}

.pnr-passengers-table td {
    padding: 15px !important;
    border-bottom: 1px solid var(--border-color) !important;
    color: var(--dark-blue) !important;
}

'''

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content + correct_css)

print("Replaced buggy CSS with highly targeted CSS")

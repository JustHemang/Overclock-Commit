import os

filepath = 'IRCTC/assets/new_ui.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

if 'zoom: 1.3333;' not in content:
    content = content.replace('.page-card {\n    background-color: var(--pure-white) !important;', '.page-card {\n    zoom: 1.3333; /* Counters the 0.75 body zoom to make content 1.0 */\n    background-color: var(--pure-white) !important;')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed page-card zoom")

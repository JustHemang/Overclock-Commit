import os

filepath = 'IRCTC/assets/new_ui.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '''.page-card p, .page-card span, .page-card div, .page-card label, .page-card td, .page-card th, .page-card li {
    color: var(--text-dark);
}''', 
    '''.page-card p, .page-card span, .page-card div, .page-card label, .page-card td, .page-card th, .page-card li {
    color: var(--text-dark) !important;
}'''
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated CSS with important flag")

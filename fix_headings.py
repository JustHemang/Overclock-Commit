import os

filepath = 'IRCTC/assets/new_ui.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix page-title font
content = content.replace(
    "font-family: 'Brigends Expanded', sans-serif;",
    "font-family: 'Brigends Expanded', sans-serif !important;"
)

# Fix page-subtitle to look like the pill
old_subtitle = '''.page-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 18px !important;
    color: var(--text-muted) !important;
    margin-bottom: 40px !important;
}'''

new_subtitle = '''.page-subtitle {
    font-family: 'Mileast', serif !important;
    font-size: 28px !important;
    color: var(--dark-blue) !important;
    background-color: var(--off-white) !important;
    padding: 12px 35px !important;
    border-radius: 100px !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
    display: inline-block !important;
    margin-bottom: 40px !important;
    margin-top: -5px !important;
    letter-spacing: 0.5px !important;
}'''

content = content.replace(old_subtitle, new_subtitle)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated headings")

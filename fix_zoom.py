import os

filepath = 'IRCTC/assets/new_ui.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the body:not(.home-page) zoom override so all pages stay 0.75 scale consistently
content = content.replace('''/* FIX ZOOM FOR SECONDARY PAGES */
body:not(.home-page) {
    zoom: 1 !important;
}''', '')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Removed zoom override")

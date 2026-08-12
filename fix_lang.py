import os

filepath = 'IRCTC/index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace localstorage check so it always shows
content = content.replace("if (!localStorage.getItem('irctc_lang')) {", "if (true) {")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html to always show language prompt")

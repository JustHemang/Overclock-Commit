import os

filepath = 'IRCTC/assets/new_ui.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add zoom back to body
if 'zoom: 0.75;' not in content.split('body {')[1].split('}')[0]:
    content = content.replace('body {\n', 'body {\n    zoom: 0.75;\n')

# Remove zoom from .hero
content = content.replace('.hero {\n    zoom: 0.75;\n', '.hero {\n')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Reverted zoom to body")

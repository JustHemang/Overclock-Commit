import os
import re

filepath = 'IRCTC/assets/new_ui.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove zoom from body
content = content.replace('    zoom: 0.75; /* Zoom out the entire layout */\n', '')

# Add zoom to hero
content = content.replace('.hero {\n', '.hero {\n    zoom: 0.75;\n')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated zoom placement")

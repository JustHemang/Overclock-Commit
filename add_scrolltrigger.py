import os
import glob

directory = 'IRCTC/'
files = glob.glob(directory + '*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    if 'gsap.min.js' not in content:
        content = content.replace('</head>', '  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n</head>')
        modified = True
    if 'ScrollTrigger.min.js' not in content:
        content = content.replace('</head>', '  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n</head>')
        modified = True
        
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added scripts to {filepath}")

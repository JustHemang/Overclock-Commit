import os
import glob

directory = 'IRCTC/'
files = glob.glob(directory + '*.html')

scripts_to_add = '''
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
'''

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'gsap.min.js' not in content:
        content = content.replace('</head>', scripts_to_add + '</head>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added GSAP to {filepath}")

import os

filepath = 'IRCTC/index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

start_tag = '<section class="quick-actions">'
end_tag = '</section>'

if start_tag in content and end_tag in content:
    start_idx = content.find(start_tag)
    end_idx = content.find(end_tag, start_idx) + len(end_tag)
    new_content = content[:start_idx] + content[end_idx:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Quick actions removed.")
else:
    print("Not found.")

import re

with open('contact.html', 'r', encoding='utf-8') as f:
    content = f.read()

def replace_avatar(match):
    name_match = re.search(r'<div class="org-name-v2">(.*?)</div>', match.group(0))
    if not name_match: return match.group(0)
    name = name_match.group(1)
    url_name = name.replace(' ', '+')
    img_tag = f'<img src="https://ui-avatars.com/api/?name={url_name}&background=random&color=fff&size=150" alt="{name}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">'
    
    new_block = re.sub(r'<div class="org-avatar-v2">.*?</div>', f'<div class="org-avatar-v2">{img_tag}</div>', match.group(0))
    return new_block

new_content = re.sub(r'<div class="organizer-card-v2">.*?</div>\s*</div>\s*</div>', replace_avatar, content, flags=re.DOTALL)

with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

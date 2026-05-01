import os
import re

html_files = ["index.html", "about.html", "skills.html", "projects.html", "contact.html"]
directory = r"e:\2"

for filename in html_files:
    filepath = os.path.join(directory, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        content = re.sub(
            r'<\/footer>\s*<\/div>\s*.*?(?=<\/body>)',
            '</footer>\n  </div>\n  <script src="main.js?v=6"></script>\n',
            content,
            flags=re.DOTALL
        )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filename}")

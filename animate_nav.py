import os
import re

html_files = ["index.html", "about.html", "skills.html", "projects.html", "contact.html"]
directory = r"e:\2"

old_menu_classes = r'class="absolute top-full left-0 w-full bg-black/95 border-b border-white/10 flex-col items-center py-6 gap-6 hidden md:hidden z-50"'
new_menu_classes = 'class="absolute top-full left-0 w-full bg-black/95 border-b border-white/10 flex flex-col items-center py-6 gap-6 md:hidden z-50 transition-all duration-300 ease-out opacity-0 pointer-events-none -translate-y-4"'

old_js = """  <!-- Mobile Menu Script -->
  <script>
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
      });
    }
  </script>"""

new_js = """  <!-- Mobile Menu Script -->
  <script>
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('opacity-0');
        mobileMenu.classList.toggle('pointer-events-none');
        mobileMenu.classList.toggle('-translate-y-4');
        mobileMenu.classList.toggle('opacity-100');
        mobileMenu.classList.toggle('pointer-events-auto');
        mobileMenu.classList.toggle('translate-y-0');
      });
    }
  </script>"""

for filename in html_files:
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace mobile menu div
    content = content.replace(old_menu_classes, new_menu_classes)

    # Replace JS script
    # It might be missing the exact spacing, so we can also use regex
    js_pattern = re.compile(r'  <!-- Mobile Menu Script -->\s*<script>.*?</script>', re.DOTALL)
    content = js_pattern.sub(new_js, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {filename} with animated nav.")

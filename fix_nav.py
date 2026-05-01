import os
import re

html_files = ["index.html", "about.html", "skills.html", "projects.html", "contact.html"]
directory = r"e:\2"

js_script = """
  <!-- Mobile Menu Script -->
  <script>
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
      });
    }
  </script>
</body>
"""

for filename in html_files:
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the nav block div
    nav_pattern = r'<div class="hidden md:flex gap-10 items-center font-medium text-white/70">\s*(.*?)\s*</div>\s*</nav>'
    match = re.search(nav_pattern, content, flags=re.DOTALL)
    
    if match:
        links_html = match.group(1)
        mobile_links = links_html.replace('id="nav-', 'id="mobile-nav-')
        
        replacement = f'''      <!-- Mobile Menu Button -->
      <button id="mobile-menu-btn" class="md:hidden text-white hover:text-cyan-400 focus:outline-none">
        <iconify-icon icon="lucide:menu" class="text-3xl"></iconify-icon>
      </button>

      <div class="hidden md:flex gap-10 items-center font-medium text-white/70">
        {links_html}
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="absolute top-full left-0 w-full bg-black/95 border-b border-white/10 flex-col items-center py-6 gap-6 hidden md:hidden z-50">
        {mobile_links}
      </div>
    </nav>'''
        
        new_content = re.sub(nav_pattern, replacement.replace('\\', '\\\\'), content, flags=re.DOTALL)

        if 'mobile-menu-btn' in new_content and 'const mobileBtn' not in new_content:
            new_content = new_content.replace('</body>', js_script)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"Nav pattern not found in {filename}")

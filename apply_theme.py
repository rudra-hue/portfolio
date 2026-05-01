import os
import re

html_files = ["about.html", "skills.html", "projects.html", "contact.html"]
directory = r"e:\2"

new_head = """  <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Exo+2:wght@400;600;700;900&family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>"""

new_body_start = """<body>
  <!-- CURSOR -->
  <div id="cursor"></div>
  <div id="cursor-trail"></div>

  <!-- LOADER -->
  <div id="loader">
    <div class="loader-text">POWERING UP...</div>
    <div class="loader-bar-wrap"><div class="loader-bar"></div></div>
    <div style="font-family:'Orbitron',monospace;font-size:0.65rem;letter-spacing:4px;color:rgba(0,212,255,0.6);">RUDRA PARMAR — INITIALIZING</div>
  </div>

  <!-- PARTICLES -->
  <canvas id="particles-canvas"></canvas>

  <div class="min-h-screen relative selection:bg-blue-500/30">
    <div class="fixed inset-0 pointer-events-none z-0"></div>"""

new_script = """    </footer>
  </div>
  <script src="main.js"></script>
</body>"""

for filename in html_files:
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace <head> style block
    content = re.sub(r'<style>.*?@import url\(.*?<\/style>\s*<\/head>', new_head, content, flags=re.DOTALL)
    
    # 2. Replace <body> start and particles
    content = re.sub(
        r'<body>\s*<div class="min-h-screen relative selection:bg-cyan-500/30">\s*<div class="fixed inset-0 bg-noise pointer-events-none z-0"><\/div>',
        new_body_start,
        content
    )
    
    # 3. Replace scripts at the bottom
    content = re.sub(
        r'<\/footer>\s*<\/div>\s*(?:<script.*?<\/script>\s*)*<\/body>',
        new_script,
        content,
        flags=re.DOTALL
    )

    # 4. Color theme swaps: cyan -> orange, purple -> blue where appropriate
    content = content.replace('bg-cyan-500', 'bg-orange-500')
    content = content.replace('text-cyan-400', 'text-orange-400')
    content = content.replace('text-cyan-500', 'text-orange-500')
    content = content.replace('border-cyan-500', 'border-orange-500')
    content = content.replace('from-cyan-400', 'from-orange-400')
    content = content.replace('via-cyan-900', 'via-orange-900')
    content = content.replace('neon-glow-cyan', '')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filename}")

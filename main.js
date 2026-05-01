  // ─── LOADER ───────────────────────────────────────
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      loader.style.opacity = '0';
      loader.style.transform = 'scale(1.1)';
      setTimeout(() => loader.style.display = 'none', 800);
    }
  }, 2200);

  // ─── CURSOR ───────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let mx = -100, my = -100, tx = -100, ty = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    if (cursor) {
      cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    }
    tx += (mx - tx) * 0.12; ty += (my - ty) * 0.12;
    if (trail) {
      trail.style.left = tx + 'px'; trail.style.top = ty + 'px';
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.addEventListener('mousedown', () => { if(cursor) cursor.style.transform = 'translate(-50%,-50%) scale(0.6)'; });
  document.addEventListener('mouseup', () => { if(cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });

  // Hover effect on interactables
  const interactables = document.querySelectorAll('a, button, input, textarea');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) {
         cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
         cursor.style.background = 'transparent';
         cursor.style.border = '2px solid var(--orange)';
         cursor.style.boxShadow = '0 0 10px var(--orange)';
      }
      if (trail) trail.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) {
         cursor.style.transform = 'translate(-50%, -50%) scale(1)';
         cursor.style.background = 'var(--blue)';
         cursor.style.border = 'none';
         cursor.style.boxShadow = '0 0 15px var(--blue), 0 0 30px var(--blue)';
      }
      if (trail) trail.style.borderColor = 'rgba(0, 212, 255, 0.4)';
    });
  });

  // Mobile Nav Script
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('opacity-0');
      mobileMenu.classList.toggle('pointer-events-none');
      mobileMenu.classList.toggle('-translate-y-4');
      mobileMenu.classList.toggle('opacity-100');
      mobileMenu.classList.toggle('pointer-events-auto');
      mobileMenu.classList.toggle('translate-y-0');
    });
  }

  // ─── PARTICLES ────────────────────────────────────
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

    const particles = [];
    const colors = ['rgba(0,212,255,', 'rgba(155,48,255,', 'rgba(255,107,0,', 'rgba(255,255,255,'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.1,
        alpha: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.pulse += 0.02;
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + a + ')';
        ctx.fill();
        if (p.r > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color + (a * 0.15) + ')';
          ctx.fill();
        }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  // ─── SCROLL REVEAL ────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
  }

  // ─── SKILL BARS ─────────────────────────
  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = e.target;
          const width = bar.getAttribute('data-width');
          setTimeout(() => { bar.style.width = width + '%'; }, 200);
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  // ─── LIGHTNING BOLTS (Hero) ──────────────────────────────
  const heroSection = document.getElementById('home');
  if (heroSection) {
    const lightningContainer = document.createElement('div');
    lightningContainer.className = 'lightning-container';
    heroSection.appendChild(lightningContainer);

    function spawnLightning() {
      const bolt = document.createElement('div');
      bolt.className = 'lightning';
      const x = 250 + Math.random() * 200;
      const h = 40 + Math.random() * 120;
      bolt.style.cssText = `
        left:${x}px; top:${80 + Math.random() * 300}px;
        height:${h}px; opacity:0;
        transform:rotate(${(Math.random()-0.5)*30}deg);
      `;
      lightningContainer.appendChild(bolt);
      bolt.animate([
        {opacity: 0}, {opacity: 1}, {opacity: 0.5}, {opacity: 1}, {opacity: 0}
      ], { duration: 300 + Math.random() * 400, easing: 'ease-out' }).onfinish = () => bolt.remove();
    }
    setInterval(spawnLightning, 600 + Math.random() * 800);
    setInterval(spawnLightning, 900 + Math.random() * 600);
  }

  // ─── CONTACT SUBMIT ───────────────────────────────
  const contactSubmit = document.querySelector('.contact-submit');
  if (contactSubmit) {
    contactSubmit.addEventListener('click', function(e) {
      e.preventDefault();
      this.textContent = '✅ Message Launched!';
      this.style.background = 'linear-gradient(135deg, #00cc88, #00ffcc)';
      setTimeout(() => {
        this.innerHTML = '<span class="submit-aura"></span>⚡ Launch Message';
        this.style.background = '';
      }, 3000);
    });
  }

  // ─── HOVER GLOW ON CARDS ──────────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--x', x + '%');
      card.style.setProperty('--y', y + '%');
    });
  });

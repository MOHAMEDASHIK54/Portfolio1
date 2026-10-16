// ============================================================
// MOHAMED ASHIK M — 3D CYBERPUNK PORTFOLIO ENGINE v5.0
// Three.js Quantum Core, Real-time HUD, Matrix Rain, CLI & Audio
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Three.js 3D WebGL Quantum Core & Magnetic Particles
  initThreeJsBackground();

  // 2. Custom Interactive Magnetic Cursor
  initCustomCursor();

  // 3. Dynamic Card Spotlight Cursor Tracking
  initCardSpotlight();

  // 4. Floating Cyber HUD (Clocks, FPS & Theme Selector)
  initCyberHud();

  // 5. Dynamic Typing Console in Hero
  initTypingConsole();

  // 6. Scroll Reveal Engine
  initScrollReveal();

  // 7. Animated Stats Counters
  initStatCounters();

  // 8. Interactive Mac Terminal CLI v5.0
  initTerminalCli();

  // 9. Project Filter Tabs & 3D Architecture Modals
  initProjectsAndModals();

  // 10. Web Audio FX Synthesizer
  initAudioSystem();

  // 11. Navbar Scroll & Smooth Navigation
  initNavbarScroll();

  // 12. 3D Talking Avatar Video Controller & Cyber Tilt
  initAvatarVideoController();
  initAvatarTiltInteraction();

  // 13. Instant Gmail Web & Clipboard Handlers
  initEmailButtons();
});

// ============================================================
// 1. THREE.JS 3D WEBGL QUANTUM CORE & MAGNETIC PARTICLES
// ============================================================
function initThreeJsBackground() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 32;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- A. CENTRAL 3D QUANTUM TORUS KNOT ---
  const torusGeom = new THREE.TorusKnotGeometry(7, 1.8, 120, 24);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x00f2fe,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const quantumCore = new THREE.Mesh(torusGeom, torusMat);
  quantumCore.position.set(13, 2, -6);
  scene.add(quantumCore);

  // Inner Core Octahedron
  const innerGeom = new THREE.OctahedronGeometry(4.2, 0);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });
  const innerCore = new THREE.Mesh(innerGeom, innerMat);
  quantumCore.add(innerCore);

  // --- B. 4 ORBITING 3D TECH SATELLITES ---
  const satellites = [];
  const satGeoms = [
    new THREE.BoxGeometry(1.6, 1.6, 1.6),        // Frontend Cube
    new THREE.OctahedronGeometry(1.4, 0),        // Backend Octahedron
    new THREE.IcosahedronGeometry(1.4, 0),       // Database Icosahedron
    new THREE.TorusGeometry(1.2, 0.35, 8, 20)    // Cloud Ring
  ];
  const satColors = [0x00f2fe, 0xf59e0b, 0x8b5cf6, 0x10b981];

  satGeoms.forEach((geom, idx) => {
    const mat = new THREE.MeshBasicMaterial({
      color: satColors[idx],
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);
    satellites.push({
      mesh,
      speed: 0.015 + idx * 0.006,
      radiusX: 16 + idx * 4,
      radiusY: 8 + idx * 2.5,
      angle: (idx * Math.PI) / 2
    });
  });

  // --- C. 2,000 DYNAMIC MAGNETIC STARDUST PARTICLES ---
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const basePositions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorPalette = [
    new THREE.Color(0x00f2fe), // Cyan
    new THREE.Color(0xa855f7), // Purple
    new THREE.Color(0x38bdf8), // Sky Blue
    new THREE.Color(0xf59e0b)  // Amber
  ];

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const x = (Math.random() - 0.5) * 180;
    const y = (Math.random() - 0.5) * 180;
    const z = (Math.random() - 0.5) * 160;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    basePositions[i3] = x;
    basePositions[i3 + 1] = y;
    basePositions[i3 + 2] = z;

    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i3] = chosenColor.r;
    colors[i3 + 1] = chosenColor.g;
    colors[i3 + 2] = chosenColor.b;
  }

  const particleGeom = new THREE.BufferGeometry();
  particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.55,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  const particleCloud = new THREE.Points(particleGeom, particleMat);
  scene.add(particleCloud);

  // --- MOUSE & SCROLL PARALLAX DYNAMICS ---
  let mouseX = 0;
  let mouseY = 0;
  let targetCamX = 0;
  let targetCamY = 0;
  let targetCamZ = 32;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    targetCamZ = 32 + scrollY * 0.015;
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Camera Lerp
    targetCamX += (mouseX * 5 - targetCamX) * 0.04;
    targetCamY += (-mouseY * 4 - targetCamY) * 0.04;
    camera.position.x = targetCamX;
    camera.position.y = targetCamY;
    camera.position.z += (targetCamZ - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);

    // Rotate Quantum Core
    quantumCore.rotation.x = elapsedTime * 0.25;
    quantumCore.rotation.y = elapsedTime * 0.35;
    innerCore.rotation.y = -elapsedTime * 0.5;

    // Orbit Satellites
    satellites.forEach((sat, i) => {
      sat.angle += sat.speed;
      sat.mesh.position.x = 13 + Math.cos(sat.angle) * sat.radiusX;
      sat.mesh.position.y = 2 + Math.sin(sat.angle) * sat.radiusY;
      sat.mesh.position.z = -6 + Math.sin(sat.angle * 2) * 5;
      sat.mesh.rotation.x += 0.02;
      sat.mesh.rotation.y += 0.03;
    });

    // Drift Particles
    particleCloud.rotation.y = elapsedTime * 0.015;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ============================================================
// 2. CUSTOM INTERACTIVE MAGNETIC CURSOR
// ============================================================
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.16;
    outlineY += (mouseY - outlineY) * 0.16;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  const hoverTargets = document.querySelectorAll('a, button, [data-hover], .tilt-card, input, textarea');
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    target.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
  });
}

// ============================================================
// 3. DYNAMIC CARD SPOTLIGHT CURSOR TRACKING
// ============================================================
function initCardSpotlight() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ============================================================
// 4. FLOATING CYBER HUD (FPS, Clocks & Themes)
// ============================================================
function initCyberHud() {
  // A. Real-Time FPS Counter
  const fpsDisplay = document.getElementById('hud-fps-counter');
  let frameCount = 0;
  let lastTime = performance.now();

  function calcFps() {
    frameCount++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      const currentFps = Math.round((frameCount * 1000) / (now - lastTime));
      if (fpsDisplay) fpsDisplay.textContent = `${currentFps} FPS`;
      frameCount = 0;
      lastTime = now;
    }
    requestAnimationFrame(calcFps);
  }
  requestAnimationFrame(calcFps);

  // B. Dual Clocks: IST & Gulf (Dubai)
  const clockIst = document.getElementById('clock-ist');
  const clockGulf = document.getElementById('clock-gulf');

  function updateClocks() {
    const now = new Date();

    // Indian Standard Time (UTC + 5:30)
    const istTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now);

    // Gulf Standard Time (Dubai/UAE, UTC + 4)
    const gulfTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dubai',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now);

    if (clockIst) clockIst.textContent = `${istTime} IST`;
    if (clockGulf) clockGulf.textContent = `${gulfTime} GST`;
  }

  updateClocks();
  setInterval(updateClocks, 1000);

  // C. Multi-Theme Switcher
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      document.body.className = `theme-${theme}`;

      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      showToast(`Interface Theme updated to ${theme.toUpperCase()} ✨`);
      playSound('click');
    });
  });
}

// ============================================================
// 5. DYNAMIC TYPING CONSOLE IN HERO
// ============================================================
function initTypingConsole() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const lines = [
    'Full Stack Developer (Java · React.js)',
    '2025 MCA Graduate 🎓',
    'Specialist in React 19, Node.js & PostgreSQL ⚡',
    'Turning Complex Logic into Fluid UIs 🚀',
    'Open to Relocate: India & Gulf 🌍'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = lines[phraseIdx];

    if (isDeleting) {
      typingElement.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingElement.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 30 : 65;

    if (!isDeleting && charIdx === current.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % lines.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

// ============================================================
// 6. SCROLL REVEAL ENGINE
// ============================================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ============================================================
// 7. ANIMATED STATS NUMBERS
// ============================================================
function initStatCounters() {
  const statCards = document.querySelectorAll('.stat-num');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statCards.forEach(card => {
          const target = parseInt(card.getAttribute('data-target'), 10);
          if (isNaN(target)) return;

          let count = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const interval = setInterval(() => {
            count += step;
            if (count >= target) {
              card.textContent = target;
              clearInterval(interval);
            } else {
              card.textContent = count;
            }
          }, 28);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.stats-counter-grid');
  if (statsSection) observer.observe(statsSection);
}

// ============================================================
// 8. INTERACTIVE MAC TERMINAL CLI v5.0 & MATRIX RAIN
// ============================================================
function initTerminalCli() {
  const cliOutput = document.getElementById('cli-output');
  const cliInput = document.getElementById('cli-input');
  const copyBtn = document.getElementById('cli-copy-btn');
  const quickBtns = document.querySelectorAll('.quick-cmd-btn');

  // Quick Command Buttons
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
      playSound('click');
    });
  });

  // CLI Input Submit
  window.handleCliInput = function () {
    if (!cliInput) return;
    const command = cliInput.value.trim();
    if (command) {
      executeCommand(command);
      cliInput.value = '';
    }
  };

  // Play mechanical key audio on typing
  if (cliInput) {
    cliInput.addEventListener('keydown', () => playSound('type'));
  }

  // Command Execution Engine
  function executeCommand(cmd) {
    if (!cliOutput) return;

    const entry = document.createElement('div');
    entry.className = 'cli-entry';
    const normalized = cmd.toLowerCase().trim();

    if (normalized === 'clear' || normalized === 'cls') {
      cliOutput.innerHTML = '';
      return;
    }

    let response = '';

    switch (normalized) {
      case 'help':
        response = `
Available commands:
  • <span style="color: var(--neon-cyan)">whoami</span>          - Display developer summary
  • <span style="color: var(--neon-cyan)">cat status.json</span> - View status, MCA education & relocation readiness
  • <span style="color: var(--neon-cyan)">skills</span>          - List full-stack technology stack
  • <span style="color: var(--neon-cyan)">projects</span>        - Display production-ready projects
  • <span style="color: var(--neon-cyan)">matrix</span>          - Launch interactive fullscreen Matrix Digital Rain 🌧️
  • <span style="color: var(--neon-cyan)">sudo hire-ashik</span> - Instant hiring authorization sequence 🚀
  • <span style="color: var(--neon-cyan)">philosophy</span>      - Show quotes from real-world heroes
  • <span style="color: var(--neon-cyan)">contact</span>         - Open direct contact coordinates
  • <span style="color: var(--neon-cyan)">clear</span>           - Clear terminal window
`;
        break;

      case 'whoami':
        response = 'Mohamed Ashik M — Full Stack Developer (Java · React.js) | 2025 MCA Graduate';
        break;

      case 'cat status.json':
      case 'status':
      case 'status.json':
        response = `
<pre class="cli-json"><code>{
  "name": "Mohamed Ashik M",
  "education": "Master of Computer Applications (MCA) — 2025",
  "location": "India 🇮🇳 (Ready to relocate: India &amp; Gulf 🌍)",
  "specialization": "Full-Stack Development (Java, React 19, Node.js, PostgreSQL)",
  "currently_building": "High-performance enterprise dashboards &amp; web apps",
  "superpower": "Transforming complex logic into sleek, fluid UIs",
  "status": "Ready for high-impact software engineering roles"
}</code></pre>`;
        break;

      case 'skills':
        response = `
⚡ Frontend: React 19, JavaScript (ES6+), Tailwind CSS, Vite, HTML5, CSS3, Figma
⚙️ Backend: Java, Node.js, Express.js, RESTful APIs
🗄️ Databases: PostgreSQL, MySQL
🧰 Tools: Git, GitHub, VS Code
`;
        break;

      case 'projects':
        response = `
1. 📌 <a href="https://github.com/MOHAMEDASHIK54/Kanban-Board" target="_blank" style="color: var(--neon-cyan);">Kanban-Board</a> — Full-stack sprint task manager (React 19, Vite, Tailwind, Node.js, Express, PostgreSQL)
2. 📌 <a href="https://github.com/MOHAMEDASHIK54/Borgholm-OFFICE-SITE" target="_blank" style="color: var(--neon-cyan);">Borgholm-OFFICE-SITE</a> — Luxury agency & studio platform (React 19, Vite, Express, PostgreSQL)
3. 📌 <a href="https://github.com/MOHAMEDASHIK54/Layers-Site" target="_blank" style="color: var(--neon-cyan);">Layers-Site</a> — Creative responsive UI architecture (HTML5, CSS3, JS)
`;
        break;

      case 'matrix':
        response = '<span style="color: var(--neon-green)">Initializing Neural Quantum Stream... Click screen or press ESC to exit matrix.</span>';
        startMatrixRain();
        break;

      case 'sudo hire-ashik':
      case 'hire':
        response = `
<span style="color: var(--neon-green); font-weight: 700;">[ACCESS GRANTED] You just unlocked the most dedicated software engineer of 2026.</span>
<br/>Launching contact transmission protocol... Let's build something legendary together!
`;
        triggerConfetti();
        playSound('victory');
        setTimeout(() => {
          window.open('https://mail.google.com/mail/?view=cm&fs=1&to=news2ashik@gmail.com&su=Full-Stack%20Offer%20for%20Mohamed%20Ashik%20M', '_blank');
        }, 1800);
        break;

      case 'philosophy':
        response = `
🌟 "Verily, Allah loves that when any one of you does a job, he executes it with Ihsan (mastery, devotion, and excellence)." — Prophet Muhammad (ﷺ)
🚀 "If you want to shine like a sun, first burn like a sun." — Dr. A.P.J. Abdul Kalam
🥊 "Champions are made from something they have deep inside them — a desire, a dream, a vision." — Muhammad Ali
`;
        break;

      case 'contact':
        response = `
📧 Email: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=news2ashik@gmail.com&su=Hello%20Mohamed%20Ashik" target="_blank" style="color: var(--neon-cyan);">news2ashik@gmail.com (Click to open Gmail)</a>
🐙 GitHub: <a href="https://github.com/MOHAMEDASHIK54" target="_blank" style="color: var(--neon-cyan);">github.com/MOHAMEDASHIK54</a>
💼 Open to relocation: India &amp; Gulf 🌍
`;
        break;

      default:
        response = `zsh: command not found: ${escapeHtml(cmd)}. Type <span style="color: var(--neon-cyan);">help</span> to view available commands.`;
    }

    entry.innerHTML = `
      <span class="cli-prompt">ashik@station:~$</span> <span class="cli-cmd-text">${escapeHtml(cmd)}</span>
      <div class="cli-response">${response}</div>
    `;

    cliOutput.appendChild(entry);
    const cliScreen = document.getElementById('cli-screen');
    if (cliScreen) cliScreen.scrollTop = cliScreen.scrollHeight;
  }

  // Copy Terminal Content
  if (copyBtn && cliOutput) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(cliOutput.innerText).then(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--neon-green)"></i>';
        showToast('Terminal session copied to clipboard! 📋');
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2200);
      });
    });
  }

  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

// ============================================================
// FULLSCREEN MATRIX DIGITAL RAIN SCREEN SAVER
// ============================================================
let matrixInterval = null;

function startMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add('active');

  const chars = '0123456789ABCDEFJAVA_REACT_POSTGRES_MCA_2025_IHSAN_ASHIK';
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(2, 12, 6, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  if (matrixInterval) clearInterval(matrixInterval);
  matrixInterval = setInterval(draw, 33);

  function stopMatrixRain() {
    if (matrixInterval) {
      clearInterval(matrixInterval);
      matrixInterval = null;
    }
    canvas.classList.remove('active');
    document.removeEventListener('keydown', handleKey);
    canvas.removeEventListener('click', stopMatrixRain);
    showToast('Exited Matrix Mode.');
  }

  function handleKey(e) {
    if (e.key === 'Escape') stopMatrixRain();
  }

  document.addEventListener('keydown', handleKey);
  canvas.addEventListener('click', stopMatrixRain);
}

// ============================================================
// CONFETTI CELEBRATION EFFECT
// ============================================================
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const count = 120;
  const colors = ['#00f2fe', '#ff007a', '#7f00ff', '#f59e0b', '#10b981'];

  for (let i = 0; i < count; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 6 + 3,
      speedX: (Math.random() - 0.5) * 4,
      rotation: Math.random() * 360
    });
  }

  let frames = 0;
  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += 4;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frames++;
    if (frames < 140) {
      requestAnimationFrame(updateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  updateConfetti();
}

// ============================================================
// 9. PROJECT FILTERS & 3D ARCHITECTURE MODAL SYSTEM
// ============================================================
function initProjectsAndModals() {
  // A. Filter Tabs
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-3d-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      playSound('click');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // B. Architecture Modals
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalBody = document.getElementById('modal-body-content');
  const closeBtn = document.getElementById('modal-close-btn');

  const archData = {
    kanban: {
      title: 'Kanban-Board Task Manager Blueprint',
      flow: [
        { title: 'Client UI', desc: 'React 19 & Tailwind' },
        { title: 'Bundler', desc: 'Vite 5 (HMR)' },
        { title: 'API Gateway', desc: 'Node.js Express' },
        { title: 'Persistence', desc: 'PostgreSQL ACID' }
      ],
      highlights: [
        'Optimistic UI drag-and-drop task movements with immediate visual responsiveness.',
        'RESTful Express backend handling task status transitions and team assignments.',
        'PostgreSQL normalized schema guaranteeing zero state drift or orphaned records.',
        'Zero external heavy UI libraries — clean, lightweight custom CSS/Tailwind architecture.'
      ],
      repo: 'https://github.com/MOHAMEDASHIK54/Kanban-Board'
    },
    borgholm: {
      title: 'Borgholm Studio Platform Architecture',
      flow: [
        { title: 'Frontend', desc: 'React 19 & Fluid CSS' },
        { title: 'Asset Pipeline', desc: 'Vite Optimized' },
        { title: 'REST Engine', desc: 'Express Server' },
        { title: 'Database', desc: 'PostgreSQL Relational' }
      ],
      highlights: [
        'Luxury agency visual presentation featuring 60 FPS fluid micro-animations.',
        'High-speed server-driven portfolio categorization with cached API payloads.',
        'PostgreSQL dynamic query aggregation for rapid client case study retrieval.',
        'Fully responsive design with sub-second First Contentful Paint (FCP).'
      ],
      repo: 'https://github.com/MOHAMEDASHIK54/Borgholm-OFFICE-SITE'
    },
    layers: {
      title: 'Layers Creative Interface Engineering',
      flow: [
        { title: 'Markup', desc: 'Semantic HTML5' },
        { title: 'Design System', desc: 'Modern Vanilla CSS' },
        { title: 'Interactivity', desc: 'ES6+ Native JS' },
        { title: 'Target', desc: '100% Cross-Browser' }
      ],
      highlights: [
        'Ultra-pure zero-dependency layout showcasing advanced CSS grid & flexbox hierarchy.',
        'Fluid responsive scaling across mobile, tablet, 4K desktops.',
        'Micro-animations executed strictly on GPU-accelerated CSS properties.',
        'Clean, maintainable token-based styling methodology.'
      ],
      repo: 'https://github.com/MOHAMEDASHIK54/Layers-Site'
    }
  };

  const openBtns = document.querySelectorAll('.open-arch-modal');
  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = archData[projKey];
      if (!data) return;

      modalTitle.textContent = data.title;

      let flowHtml = data.flow.map((node, i) => `
        <div class="arch-node">
          <span class="arch-node-title">${node.title}</span>
          <span class="arch-node-desc">${node.desc}</span>
        </div>
        ${i < data.flow.length - 1 ? '<i class="fa-solid fa-arrow-right arch-arrow"></i>' : ''}
      `).join('');

      let listHtml = data.highlights.map(item => `
        <li><i class="fa-solid fa-check-circle"></i> <div>${item}</div></li>
      `).join('');

      modalBody.innerHTML = `
        <div class="arch-flow-diagram">${flowHtml}</div>
        <h4 style="font-family: var(--font-heading); font-size: 16px; color: var(--text-pure); margin-top: 10px;">Engineering Highlights</h4>
        <ul class="arch-highlights-list">${listHtml}</ul>
        <div style="margin-top: 10px; display: flex; gap: 12px;">
          <a href="${data.repo}" target="_blank" class="btn btn-cyber-sm" data-hover>
            <i class="fa-brands fa-github"></i> Inspect Source Repository
          </a>
        </div>
      `;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      playSound('beep');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    playSound('click');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

// ============================================================
// 10. SCI-FI AUDIO FX SYNTHESIZER (Web Audio API)
// ============================================================
let audioCtx = null;
let soundEnabled = false;

function initAudioSystem() {
  const toggleBtn = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  const audioBars = document.getElementById('audio-bars');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;

      if (soundEnabled) {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        soundIcon.className = 'fa-solid fa-volume-high';
        soundIcon.style.color = 'var(--neon-cyan)';
        if (audioBars) audioBars.classList.add('active');
        showToast('Sci-Fi Sound Synthesis Online 🔊');
        playSound('beep');
      } else {
        soundIcon.className = 'fa-solid fa-volume-xmark';
        soundIcon.style.color = 'var(--text-muted)';
        if (audioBars) audioBars.classList.remove('active');
        showToast('Sound Synthesizer Muted 🔇');
      }
    });
  }

  const hoverables = document.querySelectorAll('[data-hover], .btn, .filter-tab, .quick-cmd-btn, .stat-card, .skill-3d-card, .project-3d-card, .philosophy-card-3d');
  hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => playSound('hover'));
  });
}

function playSound(type) {
  if (!soundEnabled || !audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.04);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'type') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(240, now);
      gain.gain.setValueAtTime(0.008, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'beep') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'victory') {
      // Celebratory Tri-Tone Fanfare
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const vOsc = audioCtx.createOscillator();
        const vGain = audioCtx.createGain();
        vOsc.connect(vGain);
        vGain.connect(audioCtx.destination);

        const t = now + i * 0.12;
        vOsc.frequency.setValueAtTime(freq, t);
        vGain.gain.setValueAtTime(0.05, t);
        vGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        vOsc.start(t);
        vOsc.stop(t + 0.25);
      });
    }
  } catch (e) {
    // Audio safe fallback
  }
}

// ============================================================
// 11. SILKY SMOOTH MOMENTUM SCROLL (Lenis) & NAVBAR
// ============================================================
let lenis = null;

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  // Initialize Lenis Silky Smooth Inertial Momentum Scroll
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ({ scroll }) => {
      handleScrollState(scroll);
    });
  } else {
    window.addEventListener('scroll', () => {
      handleScrollState(window.scrollY);
    }, { passive: true });
  }

  function handleScrollState(pos) {
    if (pos > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (backToTop) {
      if (pos > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
      }
    }

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top = sec.offsetTop - 160;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (pos >= top && pos < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-links');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  // Silky Smooth Anchor Navigation (Lenis Glide)
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();

          if (lenis) {
            lenis.scrollTo(targetElement, { offset: -65, duration: 1.4 });
          } else {
            const offset = 65;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementRect - bodyRect - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }

          if (menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
          }
        }
      }
    });
  });
}

// ============================================================
// 12. TOAST NOTIFICATION & FORM SUBMISSION
// ============================================================
function showToast(msg) {
  const toast = document.getElementById('cyber-toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3600);
}

function handleFormSubmit() {
  const name = document.getElementById('userName').value || 'Visitor';
  const email = document.getElementById('userEmail').value || 'Not provided';
  const subject = document.getElementById('userSubject').value || 'Portfolio Contact';
  const msg = document.getElementById('userMsg').value || '';

  const bodyContent = `Hi Mohamed Ashik,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=news2ashik@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(`To: news2ashik@gmail.com\nSubject: ${subject}\n\n${bodyContent}`).catch(() => { });
  }

  const win = window.open(gmailUrl, '_blank');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = `mailto:news2ashik@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
  }

  showToast(`Opening Gmail! Message also copied to clipboard 🚀`);
  document.getElementById('contact-form').reset();
  if (typeof playSound === 'function') playSound('beep');
}

// ============================================================
// ============================================================
// 13. 3D TALKING AVATAR VIDEO CONTROLLER
// ============================================================
function initAvatarVideoController() {
  const video = document.getElementById('mascot-video');
  const img = document.getElementById('mascot-img');
  const btn = document.getElementById('avatar-video-btn');
  if (!video || !img) return;

  // Check if video source loads successfully
  video.addEventListener('canplay', () => {
    img.style.display = 'none';
    video.style.display = 'block';
    video.muted = true;
    video.play().catch(() => { });
    if (btn) btn.style.display = 'flex';
  }, { once: true });

  video.addEventListener('error', () => {
    // If video file is not present, gracefully retain the 3D animated photo
    img.style.display = 'block';
    video.style.display = 'none';
    if (btn) btn.style.display = 'none';
  });

  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (video.paused) {
        video.muted = false; // unmute so speech is audible
        video.play().then(() => {
          btn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>Pause</span>';
          if (typeof playSound === 'function') playSound('beep');
        }).catch(() => {
          video.muted = true;
          video.play();
          btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span>Muted</span>';
        });
      } else {
        video.pause();
        btn.innerHTML = '<i class="fa-solid fa-play"></i> <span>Intro</span>';
        if (typeof playSound === 'function') playSound('click');
      }
    });
  }

  video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play().catch(() => { });
  });
}

// ============================================================
// 13B. NATURAL HEAD TILT & HOLOGRAPHIC PARALLAX INTERACTION
// ============================================================
function initAvatarTiltInteraction() {
  const card = document.querySelector('.technologist-3d-card');
  const hologram = document.getElementById('mascot-hologram-wrap');
  const decorRing = document.querySelector('.hud-decor-ring');
  const techBackdrop = document.querySelector('.tech-backdrop-rings');
  const badgeL = document.querySelector('.floating-tech-badge.badge-left');
  const badgeR = document.querySelector('.floating-tech-badge.badge-right');
  if (!card || !hologram) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = (-y / (rect.height / 2)) * 10;
    const rotY = (x / (rect.width / 2)) * 10;

    // Subtle 3D perspective on card
    card.style.transform = `perspective(1000px) rotateX(${rotX * 0.35}deg) rotateY(${rotY * 0.35}deg)`;
    hologram.style.transform = `perspective(600px) rotateX(${rotX * 0.65}deg) rotateY(${rotY * 0.65}deg) translateZ(10px)`;
    if (decorRing) decorRing.style.transform = `translate(${rotY * 0.8}px, ${rotX * 0.8}px)`;
    if (techBackdrop) techBackdrop.style.transform = `translate(${-rotY * 0.5}px, ${-rotX * 0.4}px)`;
    if (badgeL) badgeL.style.transform = `translateY(-50%) translate(${-rotY * 0.8}px, ${-rotX * 0.5}px)`;
    if (badgeR) badgeR.style.transform = `translateY(-50%) translate(${-rotY * 0.8}px, ${-rotX * 0.5}px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    hologram.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    hologram.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    if (decorRing) {
      decorRing.style.transform = 'translate(0px, 0px)';
      decorRing.style.transition = 'transform 0.5s ease';
    }
    if (techBackdrop) {
      techBackdrop.style.transform = 'translate(0px, 0px)';
      techBackdrop.style.transition = 'transform 0.5s ease';
    }
    if (badgeL) {
      badgeL.style.transform = 'translateY(-50%)';
      badgeL.style.transition = 'transform 0.5s ease';
    }
    if (badgeR) {
      badgeR.style.transform = 'translateY(-50%)';
      badgeR.style.transition = 'transform 0.5s ease';
    }
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
    hologram.style.transition = 'none';
    if (decorRing) decorRing.style.transition = 'none';
    if (techBackdrop) techBackdrop.style.transition = 'none';
    if (badgeL) badgeL.style.transition = 'none';
    if (badgeR) badgeR.style.transition = 'none';
  });
}

// ============================================================
// 14. INSTANT GMAIL WEB & CLIPBOARD HANDLER
// ============================================================
function initEmailButtons() {
  const emailBtns = document.querySelectorAll('.email-direct-btn');
  emailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('news2ashik@gmail.com').catch(() => { });
      }
      showToast('Opening Gmail! Copied news2ashik@gmail.com to clipboard 📋');
      if (typeof playSound === 'function') playSound('beep');
    });
  });
}



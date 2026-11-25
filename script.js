(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  $('#year').textContent = new Date().getFullYear();

  const menu = $('#menuToggle');
  const nav = $('#nav');
  menu?.addEventListener('click', () => nav.classList.toggle('open'));
  $$('#nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

  const progress = $('#scrollProgress');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
  };
  addEventListener('scroll', updateProgress, { passive:true });
  updateProgress();

  // Scroll reveal
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold:.12 });
    revealItems.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 65}ms`; observer.observe(el); });
  } else revealItems.forEach(el => el.classList.add('visible'));

  // Cursor glow
  const glow = $('#cursorGlow');
  if (finePointer && glow) addEventListener('pointermove', e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive:true });

  // Elastic 3D identity card with spring-like return
  const stage = $('#idStage');
  const card = $('#idCard');
  if (stage && card && finePointer && !reducedMotion) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0, raf = 0;
    const render = () => {
      currentX += (targetX - currentX) * .13;
      currentY += (targetY - currentY) * .13;
      const stretch = Math.min(1, Math.hypot(targetX, targetY) / 16);
      card.style.transform = `rotateX(${-8 - currentY}deg) rotateY(${13 + currentX}deg) scale(${1 + stretch * .012},${1 - stretch * .008})`;
      if (Math.abs(targetX-currentX)>.01 || Math.abs(targetY-currentY)>.01) raf = requestAnimationFrame(render);
      else raf = 0;
    };
    stage.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      targetX = x * 22;
      targetY = -y * 18;
      if (!raf) raf = requestAnimationFrame(render);
    });
    stage.addEventListener('pointerleave', () => {
      targetX = 0; targetY = 0;
      if (!raf) raf = requestAnimationFrame(render);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('card-selected');
        card.style.transform = card.classList.contains('card-selected')
          ? 'rotateX(0deg) rotateY(180deg) scale(1.04)' : '';
      }
    });
  }

  // Optional synthesized UI sounds. Audio starts only after the visitor enables it.
  let audioContext = null;
  let soundOn = false;
  const soundButton = $('#soundToggle');
  const soundLabel = $('#soundLabel');
  function blip(freq = 560, duration = .07, type = 'sine') {
    if (!soundOn) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      gain.gain.setValueAtTime(.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.035, audioContext.currentTime + .012);
      gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + duration);
      osc.connect(gain); gain.connect(audioContext.destination);
      osc.start(); osc.stop(audioContext.currentTime + duration + .02);
    } catch (_) {}
  }
  soundButton.addEventListener('click', () => {
    soundOn = !soundOn;
    soundButton.classList.toggle('active', soundOn);
    soundLabel.textContent = soundOn ? 'SOUND ON' : 'SOUND OFF';
    if (soundOn) blip(740, .12, 'triangle');
  });
  $$('a, button, .social-link, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => blip(480, .045));
    el.addEventListener('click', () => blip(680, .06, 'triangle'));
  });

  // Small magnetic hover on primary CTA
  if (finePointer && !reducedMotion) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        el.style.transform = `translate(${x*.08}px,${y*.12}px)`;
      });
      el.addEventListener('pointerleave', () => el.style.transform = '');
    });
  }
})();

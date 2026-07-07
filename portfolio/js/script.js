// ============================================================
// Footer year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// ============================================================
// Hero waveform: draws a signal that settles into a calm idle pulse
// (nods to the anomaly-detection work in CybSecure)
// ============================================================
const waveformPath = document.getElementById('waveformPath');
const WIDTH = 1200;
const HEIGHT = 160;
const MID = 80;
const POINTS = 60;

function buildPath(amplitudeFn) {
  let d = `M0,${MID}`;
  for (let i = 0; i <= POINTS; i++) {
    const x = (WIDTH / POINTS) * i;
    const y = MID + amplitudeFn(i, x);
    d += ` L${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
}

let frame = 0;
const totalFrames = 130;

function animateWaveform() {
  frame++;
  const progress = Math.min(frame / totalFrames, 1);
  const settle = 1 - progress; // noise fades out as progress -> 1

  const path = buildPath((i, x) => {
    const noise = (Math.sin(i * 1.7 + frame * 0.4) * 28 + Math.sin(i * 0.6 + frame * 0.15) * 14) * settle;
    const calm = Math.sin((x / WIDTH) * Math.PI * 2 + frame * 0.02) * 6 * progress;
    return noise + calm;
  });

  waveformPath.setAttribute('d', path);

  if (progress < 1) {
    requestAnimationFrame(animateWaveform);
  } else {
    idlePulse();
  }
}

function idlePulse() {
  let t = 0;
  function loop() {
    t += 0.02;
    const path = buildPath((i, x) => Math.sin((x / WIDTH) * Math.PI * 2 + t) * 6);
    waveformPath.setAttribute('d', path);
    requestAnimationFrame(loop);
  }
  loop();
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  waveformPath.setAttribute('d', buildPath((i, x) => Math.sin((x / WIDTH) * Math.PI * 2) * 6));
} else {
  requestAnimationFrame(animateWaveform);
}

// ============================================================
// Placeholder-link guard
// Elements with data-fill are stand-ins for links you need to add
// (GitHub repos, live demos, certificate images, social profiles).
// Clicking one explains what to update instead of going nowhere.
// ============================================================
document.querySelectorAll('[data-fill]').forEach(el => {
  el.addEventListener('click', (e) => {
    if (el.getAttribute('href') === '#' || !el.getAttribute('href')) {
      e.preventDefault();
      const key = el.getAttribute('data-fill');
      alert(
        `This link is a placeholder ("${key}").\n\n` +
        `Open index.html, find data-fill="${key}", and set its href ` +
        `to the real URL (GitHub repo, live demo, certificate image, or profile link).`
      );
    }
  });
});

// ============================================================
// Contact form: friendly inline confirmation on submit
// (Formspree handles the actual send once YOUR_FORM_ID is set)
// ============================================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  const action = contactForm.getAttribute('action') || '';
  if (action.includes('YOUR_FORM_ID')) {
    e.preventDefault();
    formNote.textContent = 'Set up your Formspree form ID first — see the README for the two-minute setup.';
    formNote.style.color = 'var(--coral)';
  }
});

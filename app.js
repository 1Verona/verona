const track = document.querySelector('.track');
const viewport = document.querySelector('.gallery-viewport');
const panels = [...document.querySelectorAll('.panel')];
const navLinks = [...document.querySelectorAll('.rail a')];
const progress = document.querySelector('.progress');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const isMobile = window.matchMedia('(max-width: 800px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
const initialHash = location.hash;
const scrollEnd = () => Math.max(0, panels[panels.length - 1].offsetLeft);
const journeyPosition = () => Math.max(0, Math.min(window.scrollY, scrollEnd()));
function goTo(index) {
  index = Math.max(0, Math.min(index, panels.length - 1));
  const behavior = reducedMotion.matches ? 'instant' : 'smooth';
  if (isMobile.matches) panels[index].scrollIntoView({ behavior, block: 'start' });
  else window.scrollTo({ top: Math.min(panels[index].offsetLeft, scrollEnd()), behavior });
}
function followAnchor(hash) {
  const target = document.getElementById(hash.slice(1));
  const panel = target?.closest('.panel');
  const index = panels.indexOf(panel);
  if (index < 0) return false;
  goTo(index);
  if (target.id === 'inicio') panel.querySelector('.intro-body').scrollTop = 0;
  if (target !== panel) {
    if (isMobile.matches) target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
    else {
      const body = panel.querySelector('.slide-body');
      if (body) body.scrollTo({ top: target.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
  }
  history.replaceState(null, '', hash);
  return true;
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
  if (!document.getElementById(link.hash.slice(1))?.closest('.panel')) return;
  link.addEventListener('click', event => { event.preventDefault(); followAnchor(link.hash); });
});
// The document owns vertical scrolling. Its distance drives the horizontal
// gallery, so a mouse wheel, trackpad and scrollbar all follow the same path.
function sizeScrollJourney() {
  if (isMobile.matches) {
    document.body.style.height = '';
    track.style.transform = '';
  } else {
    document.body.style.height = `${window.innerHeight + scrollEnd()}px`;
    track.style.transform = `translateX(${-journeyPosition()}px)`;
  }
  requestUpdate();
}
window.addEventListener('wheel', event => {
  if (isMobile.matches || event.ctrlKey || document.querySelector('dialog[open]')) return;
  // Normal vertical gestures scroll the document natively. Also support
  // horizontal trackpad gestures without requiring a modifier key.
  if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
  event.preventDefault();
  const delta = event.deltaX * (event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? track.clientWidth : 1);
  window.scrollBy({ top: delta, behavior: 'instant' });
}, { passive: false });
function updatePosition() {
  if (isMobile.matches) {
    current = panels.reduce((best, panel, index) => Math.abs(panel.getBoundingClientRect().top - 90) < Math.abs(panels[best].getBoundingClientRect().top - 90) ? index : best, 0);
  } else {
    current = panels.reduce((best, panel, index) => Math.abs(panel.offsetLeft - journeyPosition()) < Math.abs(panels[best].offsetLeft - journeyPosition()) ? index : best, 0);
    if (journeyPosition() >= scrollEnd() - 8) current = panels.length - 1;
    const percent = Math.max(0, Math.min(100, (journeyPosition() / Math.max(1, scrollEnd())) * 100));
    progress.firstElementChild.style.width = `${percent}%`;
    progress.setAttribute('aria-valuenow', String(Math.round(percent)));
  }
  navLinks.forEach((link, index) => {
    const homeBody = document.querySelector('.intro-body');
    const activeRail = current === 0 && !isMobile.matches && homeBody.scrollTop > homeBody.clientHeight / 2 ? 'projetos' : (panels[current].dataset.rail || panels[current].id);
    const selected = link.hash === `#${activeRail}`;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  document.querySelector('.page-counter').textContent = `${String(current + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`;
  const activeHash = `#${panels[current].id}`;
  if (location.hash !== activeHash) history.replaceState(null, '', activeHash);
  previous.disabled = current === 0;
  next.disabled = current === panels.length - 1;
}
let queued = false;
function requestUpdate() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    if (!isMobile.matches) {
      viewport.scrollLeft = 0;
      track.scrollLeft = 0;
      track.style.transform = `translateX(${-journeyPosition()}px)`;
    }
    updatePosition(); queued = false;
  });
}
track.addEventListener('scroll', requestUpdate, { passive: true });
viewport.addEventListener('scroll', requestUpdate, { passive: true });
document.querySelector('.intro-body').addEventListener('scroll', requestUpdate, { passive: true });
window.addEventListener('scroll', () => {
  requestUpdate();
}, { passive: true });
window.addEventListener('resize', sizeScrollJourney);
isMobile.addEventListener('change', sizeScrollJourney);
new ResizeObserver(sizeScrollJourney).observe(track);
previous.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));
track.addEventListener('keydown', event => {
  if (isMobile.matches || event.target.closest('button,video,a') || document.querySelector('dialog[open]')) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); goTo(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
const dialog = document.querySelector('.video-dialog');
const player = document.querySelector('.player');
const videoError = document.querySelector('.video-error');
let activeVideoButton = null;
window.addEventListener('languagechange', () => {
  sizeScrollJourney();
  if (dialog.open && activeVideoButton) document.querySelector('#video-title').textContent = activeVideoButton.dataset.title;
});
document.querySelectorAll('.media-open').forEach(button => {
  button.addEventListener('click', () => {
    activeVideoButton = button;
    document.querySelector('#video-title').textContent = button.dataset.title;
    videoError.hidden = true;
    videoError.querySelector('a').href = button.dataset.video;
    player.src = button.dataset.video;
    dialog.showModal();
    player.play().catch(() => {});
  });
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { player.pause(); player.removeAttribute('src'); player.load(); });
player.addEventListener('error', () => { if (player.getAttribute('src')) videoError.hidden = false; });
sizeScrollJourney();
if (initialHash) requestAnimationFrame(() => followAnchor(initialHash === '#trabalhos' ? '#projetos' : initialHash));

// Keep the logo artwork intact; tilt its image plane toward the pointer.
const logoImages = [...document.querySelectorAll('.metallic-logo')];
let logoFrame = 0;
logoImages.forEach(logo => logo.classList.add('logo-tilt'));
function resetLogoTilt() {
  cancelAnimationFrame(logoFrame);
  logoFrame = 0;
  logoImages.forEach(logo => {
    logo.style.setProperty('--logo-x', '0deg');
    logo.style.setProperty('--logo-y', '0deg');
    logo.querySelector('.metal-gradient').setAttribute('gradientTransform', 'rotate(-20 545 525)');
    const light = logo.querySelector('.metal-light');
    light.setAttribute('x', '350');
    light.setAttribute('y', '80');
    light.setAttribute('z', '420');
    logo.querySelector('.metal-dither-glow').setAttribute('cx', '65%');
    logo.querySelector('.metal-dither-glow').setAttribute('cy', '25%');
    logo.parentElement.style.setProperty('--light-x', '65%');
    logo.parentElement.style.setProperty('--light-y', '25%');
    if (logo.closest('.identity-card')) {
      logo.closest('.identity-card').style.setProperty('--light-x', '65%');
      logo.closest('.identity-card').style.setProperty('--light-y', '25%');
    }
  });
}
window.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || reducedMotion.matches || dialog.open) return;
  cancelAnimationFrame(logoFrame);
  logoFrame = requestAnimationFrame(() => {
    logoFrame = 0;
    const clamp = value => Math.max(-1, Math.min(1, value));
    logoImages.forEach(logo => {
      // Read the stationary parent so the transform cannot feed back into itself.
      const bounds = logo.parentElement.getBoundingClientRect();
      if (bounds.right < 0 || bounds.left > innerWidth) return;
      const x = clamp((event.clientX - (bounds.left + bounds.width / 2)) / Math.max(bounds.width, innerWidth * .4));
      const y = clamp((event.clientY - (bounds.top + bounds.height / 2)) / Math.max(bounds.height, innerHeight * .4));
      logo.style.setProperty('--logo-x', `${(-y * 14).toFixed(2)}deg`);
      logo.style.setProperty('--logo-y', `${(x * 18).toFixed(2)}deg`);
      logo.querySelector('.metal-gradient').setAttribute('gradientTransform', `rotate(${-20 + x * 40 + y * 15} 545 525)`);
      const light = logo.querySelector('.metal-light');
      light.setAttribute('x', String(545 + x * 500));
      light.setAttribute('y', String(300 + y * 400));
      light.setAttribute('z', String(420 - Math.abs(x) * 100));
      const highlightX = `${50 + x * 35}%`;
      const highlightY = `${50 + y * 35}%`;
      logo.querySelector('.metal-dither-glow').setAttribute('cx', highlightX);
      logo.querySelector('.metal-dither-glow').setAttribute('cy', highlightY);
      logo.parentElement.style.setProperty('--light-x', highlightX);
      logo.parentElement.style.setProperty('--light-y', highlightY);
      if (logo.closest('.identity-card')) {
        logo.closest('.identity-card').style.setProperty('--light-x', highlightX);
        logo.closest('.identity-card').style.setProperty('--light-y', highlightY);
      }
    });
  });
}, { passive: true });
window.addEventListener('pointerout', event => { if (!event.relatedTarget) resetLogoTilt(); });
window.addEventListener('pointercancel', resetLogoTilt);
window.addEventListener('blur', resetLogoTilt);
document.addEventListener('visibilitychange', () => { if (document.hidden) resetLogoTilt(); });
reducedMotion.addEventListener('change', resetLogoTilt);
dialog.addEventListener('close', resetLogoTilt);

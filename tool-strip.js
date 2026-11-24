(() => {
  const dialog = document.querySelector('#ai-video');
  const secret = dialog.querySelector('.tool-secret');
  const particles = secret.querySelector('.tool-particles');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let shown;
  let lastBurst = -Infinity;

  function burst() {
    const now = performance.now();
    if (reducedMotion.matches || now - lastBurst < 280) return;
    lastBurst = now;
    const batch = document.createDocumentFragment();
    [[-72, -12], [-57, -66], [22, -93], [61, -63]].forEach(([x, y], index) => {
      const particle = document.createElement('span');
      particle.textContent = '🤫';
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      particle.style.setProperty('--spin', `${x / 3}deg`);
      particle.style.setProperty('--delay', `${index * 46}ms`);
      particle.addEventListener('animationend', () => particle.remove(), { once: true });
      batch.append(particle);
    });
    particles.replaceChildren(batch);
  }

  function hideName() {
    shown?.removeAttribute('data-show-name');
    shown = undefined;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.tool-button');
    if (!button) return;
    const wasShown = button === shown;
    hideName();
    if (wasShown) return;
    shown = button;
    button.setAttribute('data-show-name', '');
    if (button === secret) burst();
  });
  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('.tool-button')) hideName();
  });
  document.addEventListener('focusout', event => {
    if (event.target === shown) hideName();
  });
  secret.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' || (event.pointerType === 'pen' && event.buttons === 0)) burst();
  });
  secret.addEventListener('focus', () => {
    if (secret.matches(':focus-visible')) burst();
  });
  document.addEventListener('close', event => {
    if (shown && event.target.contains(shown)) hideName();
    if (event.target === dialog) particles.replaceChildren();
  }, true);
})();

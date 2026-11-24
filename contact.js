(() => {
  const email = 'joao@verona.media';
  const panel = document.querySelector('.contact-popover');
  const input = panel.querySelector('input');
  const status = panel.querySelector('.copy-status');
  const copyButton = panel.querySelector('.copy-email');
  const triggers = [...document.querySelectorAll('[data-copy-contact]')];
  let state = 'idle', lastTrigger = null, attempt = 0;
  function render() {
    const pt = document.documentElement.lang === 'pt-BR';
    const messages = {
      idle: '',
      copying: pt ? 'Copiando e-mail…' : 'Copying email…',
      copied: pt ? 'E-mail copiado para a área de transferência.' : 'Email copied to clipboard.',
      failed: pt ? 'Selecione e copie o e-mail acima.' : 'Select and copy the email above.'
    };
    status.textContent = messages[state];
    copyButton.firstElementChild.textContent = state === 'copied' ? (pt ? 'Copiado ✓' : 'Copied ✓') : (pt ? 'Copiar e-mail' : 'Copy email');
    panel.dataset.copyState = state;
  }
  function close(restoreFocus = false) {
    panel.hidden = true;
    triggers.forEach(button => button.setAttribute('aria-expanded','false'));
    if (restoreFocus) lastTrigger?.focus();
  }
  async function copy() {
    const id = ++attempt;
    state = 'copying'; render();
    try {
      await navigator.clipboard.writeText(email);
      if (id !== attempt) return;
      state = 'copied'; render();
    } catch {
      if (id !== attempt) return;
      state = 'failed'; render();
      if (!panel.hidden) { input.focus(); input.select(); }
    }
  }
  triggers.forEach(button => button.addEventListener('click', () => {
    lastTrigger = button;
    panel.hidden = false;
    triggers.forEach(trigger => trigger.setAttribute('aria-expanded','true'));
    copy();
  }));
  copyButton.addEventListener('click',copy);
  input.addEventListener('click',()=>input.select());
  panel.querySelector('.dismiss-contact').addEventListener('click',()=>close(true));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){event.preventDefault();close(true);}});
  document.addEventListener('pointerdown',event=>{if(!panel.hidden&&!panel.contains(event.target)&&!event.target.closest('[data-copy-contact]'))close();});
  window.addEventListener('languagechange',render);
  render();
})();

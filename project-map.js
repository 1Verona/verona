(() => {
  const scene = document.querySelector('.map-scene');
  const svg = scene.querySelector('.map-connections');
  const target = scene.querySelector('.fusion-node');
  const code = scene.querySelector('.code-node');
  const sources = [['video',scene.querySelector('.video-node')],['code',code]];
  let frame = 0;
  function draw() {
    frame = 0;
    const base = scene.getBoundingClientRect();
    if (!base.width || !base.height) return;
    svg.setAttribute('viewBox',`0 0 ${base.width} ${base.height}`);
    const to = target.getBoundingClientRect();
    const mobile = window.matchMedia('(max-width: 800px)').matches;
    sources.forEach(([key,node],index) => {
      const from = node.getBoundingClientRect();
      let path;
      if (mobile) {
        const x1 = from.left + from.width / 2 - base.left;
        const y1 = from.bottom - base.top;
        const x2 = to.left + to.width * (index ? .64 : .36) - base.left;
        const y2 = to.top - base.top;
        const distance = (y2-y1)*.65;
        path = `M ${x1} ${y1} C ${x1} ${y1+distance}, ${x2} ${y2-distance}, ${x2} ${y2}`;
      } else {
        const x1 = from.right-base.left;
        const y1 = from.top+from.height/2-base.top;
        const x2 = to.left-base.left;
        const y2 = to.top+to.height*(index ? .64 : .36)-base.top;
        const distance = (x2-x1)*.6;
        path = `M ${x1} ${y1} C ${x1+distance} ${y1}, ${x2-distance} ${y2}, ${x2} ${y2}`;
      }
      svg.querySelectorAll(`[data-curve="${key}"]`).forEach(curve=>curve.setAttribute('d',path));
    });


  }
  function schedule() { if (!frame) frame=requestAnimationFrame(draw); }
  new ResizeObserver(schedule).observe(scene);
  [target,...sources.map(([,node])=>node)].forEach(node=>new ResizeObserver(schedule).observe(node));
  window.addEventListener('languagechange',schedule);
  window.addEventListener('resize',schedule);
  document.fonts.ready.then(schedule);
  schedule();
})();

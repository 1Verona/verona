// Ordered dither fields use a lightweight 2D surface, separate from the text.
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const panels = [...document.querySelectorAll('.panel')];
  const bayer = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
  const scenes = panels.map((panel,index) => {
    const canvas = document.createElement('canvas');
    canvas.className = 'dither-blobs';
    canvas.setAttribute('aria-hidden','true');
    const context = canvas.getContext('2d',{alpha:true});
    if (!context) return null;
    panel.prepend(canvas);
    return {panel,canvas,context,index,visible:false,pixels:null};
  }).filter(Boolean);
  let frame = 0, last = 0;
  function paint(scene,time) {
    const {canvas,context,pixels,index} = scene;
    if (!pixels || !scene.visible) return;
    const w=canvas.width,h=canvas.height,seed=index*2.71+.4;
    const t=motion.matches?0:time*.00012;
    const centers=[
      [.79+.10*Math.sin(t*.6+seed),.73+.09*Math.cos(t*.7+seed),.38,.49,1],
      [.54+.12*Math.cos(t*.4+seed*1.3),.13+.10*Math.sin(t*.7+seed),.44,.29,.85],
      [.13+.10*Math.sin(t*.5+seed*.8),.38+.10*Math.cos(t*.4+seed),.24,.40,.6]
    ];
    const smooth=(a,b,v)=>{const x=Math.max(0,Math.min(1,(v-a)/(b-a)));return x*x*(3-2*x);};
    for(let y=0;y<h;y++) {
      const uy=(y+.5)/h,dx=.075*Math.sin(uy*7+t+seed)+.035*Math.sin(uy*16-t*.6);
      for(let x=0;x<w;x++) {
        const ux=(x+.5)/w,px=ux+dx,py=uy+.07*Math.sin(ux*8-t*.8+seed*.7);
        let f=0;
        for(const [cx,cy,sx,sy,weight] of centers) {const a=(px-cx)/sx,b=(py-cy)/sy;f+=Math.exp(-(a*a+b*b)*3.2)*weight;}
        const ripple=.5+.5*Math.sin(f*13+py*5-t);
        const density=(smooth(.12,1,f)*(.18+Math.pow(ripple,6)*.23)+smooth(.65,1.15,f)*.19)*smooth(0,.06,ux)*smooth(0,.06,uy);
        const i=(y*w+x)*4;
        pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=209;
        pixels.data[i+3]=density>(bayer[(y%4)*4+x%4]+.5)/16?166:0;
      }
    }
    context.putImageData(pixels,0,0);
  }
  function resize() {
    scenes.forEach(s=>{
      const bounds=s.panel.getBoundingClientRect();
      const scale=Math.min(1/3,360/Math.max(bounds.width,1),230/Math.max(bounds.height,1));
      s.canvas.width=Math.max(1,Math.round(bounds.width*scale));
      s.canvas.height=Math.max(1,Math.round(bounds.height*scale));
      s.pixels=s.context.createImageData(s.canvas.width,s.canvas.height);
      paint(s,performance.now());
    });
  }
  function animate(t) {
    frame=0;
    if(document.hidden || motion.matches || !scenes.some(s=>s.visible)) return;
    if(t-last>80) {scenes.forEach(s=>paint(s,t));last=t;}
    frame=requestAnimationFrame(animate);
  }
  function start() {if(!frame&&!document.hidden&&!motion.matches&&scenes.some(s=>s.visible))frame=requestAnimationFrame(animate);}
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{const scene=scenes.find(s=>s.panel===entry.target);if(scene){scene.visible=entry.isIntersecting;paint(scene,performance.now());}});
    start();
  });
  scenes.forEach(s=>observer.observe(s.panel));
  new ResizeObserver(resize).observe(document.querySelector('.gallery-viewport'));
  window.addEventListener('resize',resize);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else start();});
  motion.addEventListener('change',()=>{cancelAnimationFrame(frame);frame=0;scenes.forEach(s=>paint(s,performance.now()));start();});
  resize();
})();

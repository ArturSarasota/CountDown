// Minimal fireworks engine (particles with gravity + fade)
export function startFireworks(canvas){
  const ctx = canvas.getContext('2d');
  let W, H, rafId;
  const particles = [];
  let intensity = 0.35; // 0..1 baseline

  function resize(){
    W = canvas.width = canvas.clientWidth;
    H = canvas.height = canvas.clientHeight;
  }
  window.addEventListener('resize', resize, {passive:true}); resize();

  function burst(){
    const x = Math.random() * W*0.9 + W*0.05;
    const y = Math.random() * H*0.5 + H*0.1;
    const count = Math.floor(50 + Math.random()*50);
    for(let i=0;i<count;i++){
      const angle = Math.random()*Math.PI*2;
      const speed = 1 + Math.random()*3;
      particles.push({
        x,y,
        vx: Math.cos(angle)*speed,
        vy: Math.sin(angle)*speed,
        life: 60 + Math.random()*40,
        color: pickColor()
      });
    }
  }
  function pickColor(){
    const palette = [
      '#FF6B6B', '#FDB515', '#2AB7CA', '#FFFFFF',
      '#FF3B3B', '#FFD166', '#06D6A0'
    ];
    return palette[Math.floor(Math.random()*palette.length)];
  }

  function step(){
    ctx.clearRect(0,0,W,H);
    // occasional burst
    if (Math.random() < 0.02 + intensity*0.03) burst();

    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.vy += 0.02; // gravity
      p.x  += p.vx;
      p.y  += p.vy;
      p.life -= 1;

      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x,p.y,2,0,Math.PI*2);
      ctx.fill();

      if (p.life <= 0 || p.y > H+10) particles.splice(i,1);
    }
    rafId = requestAnimationFrame(step);
  }
  step();

  const api = {
    setIntensity(v){ intensity = Math.max(0, Math.min(1, v)); }
  };
  window.fireworks = api;
  return api;
}

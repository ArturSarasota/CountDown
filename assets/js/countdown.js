// Core countdown shared by all pages
// Target: July 4, 2026 at 9:00 PM EDT (UTC-4)
const COUNTDOWN_TARGET_ISO = "2026-07-04T21:00:00-04:00"; // Sarasota in July is EDT

// Format helpers
const pad2 = (n) => String(n).padStart(2, "0");

export function startCountdown(rootEl, onTick) {
  const targetMs = new Date(COUNTDOWN_TARGET_ISO).getTime();
  const parts = {
    days: rootEl.querySelector('[data-part="days"]'),
    hours: rootEl.querySelector('[data-part="hours"]'),
    minutes: rootEl.querySelector('[data-part="minutes"]'),
    seconds: rootEl.querySelector('[data-part="seconds"]'),
    done: rootEl.querySelector('[data-part="done"]'),
  };

  function render(ms){
    if (ms <= 0) {
      parts.days.textContent = "0";
      parts.hours.textContent = "00";
      parts.minutes.textContent = "00";
      parts.seconds.textContent = "00";
      if (parts.done) parts.done.hidden = false;
      if (typeof onTick === "function") onTick(0, {d:0,h:0,m:0,s:0});
      return true;
    }
    if (parts.done) parts.done.hidden = true;
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    parts.days.textContent = String(d);
    parts.hours.textContent = pad2(h);
    parts.minutes.textContent = pad2(m);
    parts.seconds.textContent = pad2(sec);
    if (typeof onTick === "function") onTick(ms, {d,h,m,sec});
    return false;
  }

  function tick(){
    const now = Date.now();
    const remaining = targetMs - now;
    const finished = render(remaining);
    if (!finished){
      const nextDelay = 1000 - (now % 1000); // align to next second
      setTimeout(tick, nextDelay);
    }
  }

  tick();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tick();
  });
}

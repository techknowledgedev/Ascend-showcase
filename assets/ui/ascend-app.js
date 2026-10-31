/* Interactive ASCEND demo for the showcase page. Runs entirely in the browser: nothing is stored, nothing is sent. */
(function () {
  'use strict';
  var U = window.AscendUI, host = document.getElementById('axhost');
  if (!U || !host) return;
  var live = document.getElementById('axlive');
  var S = U.newState(), goalsDone = {}, toastT = 0, voiceFlip = 0;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- sound (off until asked) ---------- */
  var snd = { on: false, ctx: null };
  function ac() {
    if (!snd.on) return null;
    try {
      if (!snd.ctx) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; snd.ctx = new C(); }
      if (snd.ctx.state === 'suspended') snd.ctx.resume();
      return snd.ctx;
    } catch (e) { return null; }
  }
  function tone(c, f, t0, d, type, v, f2) {
    var o = c.createOscillator(), g = c.createGain(), t = c.currentTime + t0;
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + d + 0.03);
  }
  function noise(c, t0, d, v, fc) {
    var n = Math.floor(c.sampleRate * d), b = c.createBuffer(1, n, c.sampleRate), x = b.getChannelData(0);
    for (var i = 0; i < n; i++) x[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
    var s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = b; f.type = 'lowpass'; f.frequency.value = fc || 1800; g.gain.value = v;
    s.connect(f); f.connect(g); g.connect(c.destination); s.start(c.currentTime + t0);
  }
  var SFX = {
    done: function (c) { tone(c, 784, 0, .14, 'triangle', .16); tone(c, 1175, .07, .18, 'triangle', .14); },
    all: function (c) { [523, 659, 784, 1047].forEach(function (f, i) { tone(c, f, i * .09, .3, 'triangle', .15); }); },
    level: function (c) { [392, 523, 659, 784, 1047, 1319].forEach(function (f, i) { tone(c, f, i * .11, .7, 'triangle', .13); tone(c, f * 2, i * .11, .5, 'sine', .04); }); tone(c, 196, 0, 1.6, 'sine', .12); },
    hit: function (c) { noise(c, 0, .14, .5, 2400); tone(c, 150, 0, .22, 'sine', .3, 48); },
    boss: function (c) { noise(c, 0, .5, .5, 900); tone(c, 110, 0, 1.2, 'sine', .3, 40); [440, 659, 880, 1109].forEach(function (f, i) { tone(c, f, .25 + i * .06, 1.3, 'triangle', .1); }); },
    coin: function (c) { tone(c, 1568, 0, .5, 'sine', .14); tone(c, 3636, 0, .3, 'sine', .05); tone(c, 2093, .09, .55, 'sine', .12); },
    badge: function (c) { tone(c, 659, 0, .5, 'sine', .14); tone(c, 988, .09, .7, 'sine', .12); tone(c, 1976, .09, .4, 'sine', .04); },
    alert: function (c) { tone(c, 880, 0, .12, 'square', .06); tone(c, 660, .13, .2, 'square', .06); }
  };
  function sfx(n) { var c = ac(); if (c && SFX[n]) SFX[n](c); }
  function buzz(p) { if (snd.on && navigator.vibrate && !RM) try { navigator.vibrate(p); } catch (e) {} }

  /* ---------- goals ---------- */
  var goalEls = document.querySelectorAll('[data-goal]');
  function goal(k) {
    if (goalsDone[k]) return; goalsDone[k] = true;
    var el = document.querySelector('[data-goal="' + k + '"]'); if (el) { el.classList.add('done'); el.querySelector('.gmark').setAttribute('data-ok', '1'); }
    var n = Object.keys(goalsDone).length, c = document.getElementById('goalcount');
    if (c) c.textContent = n + ' of ' + goalEls.length + ' cleared';
    if (n === goalEls.length) setTimeout(function () { toast('All demo goals cleared. Nothing was saved or sent.', 'gold', 4200); sfx('all'); }, 700);
  }

  /* ---------- plumbing ---------- */
  var lastK = null;
  function render() {
    U.render(host, S);
    var inert = !!S.viewer, i, els = host.querySelectorAll('[data-sc],.tabs');
    for (i = 0; i < els.length; i++) { if (inert) els[i].setAttribute('inert', ''); else els[i].removeAttribute('inert'); }
    if (S.viewer) { var x = host.querySelector('[data-k="vx"]'); if (x) x.focus({ preventScroll: true }); }
  }
  function toast(text, tone, ms) {
    S.toast = { text: text, tone: tone || '' }; render(); if (live) live.textContent = '[ System ] ' + text;
    clearTimeout(toastT); toastT = setTimeout(function () { S.toast = null; render(); }, ms || 2200);
  }
  var pick = function (a) { voiceFlip++; return a[voiceFlip % a.length]; };

  function act(a, v, k) {
    var D = U.derive(S), q, was;
    switch (a) {
      case 'tab': S.tab = v; S.overlay = null; S.viewer = null; render(); break;
      case 'view': S.view = v; render(); break;
      case 'quest':
        q = U.QUESTS[+v];
        if (S.closed) { toast('Day cleared. Reset the demo to play it again.'); break; }
        if (q.auto) { toast(S.synced ? 'Cleared by your phone and your sleep log.' : 'This one clears itself. Open Health and log last night\'s sleep.'); break; }
        was = S.done[+v]; S.done[+v] = !was; S.pop = +v; render(); S.pop = null;
        if (!was) {
          goal('tick'); sfx('done'); buzz(12);
          var D2 = U.derive(S);
          if (D2.all) { toast('All daily quests cleared. Reward available.', 'gold'); sfx('all'); }
          else if (D2.routine && !D.routine) toast('Routine done. +20 XP added.', 'gold');
          else toast(pick(['Quest cleared. +' + q.xp + ' XP.', 'Task complete. Stat growth recorded.']));
        }
        break;
      case 'collect': S.overlay = 'levelup'; render(); sfx('level'); buzz([20, 40, 20]); break;
      case 'claim':
        S.bank = D.xpToday + S.extra; S.baseXp = D.total - S.need; S.need += 100; S.level += 1; S.points += 3; S.streak += 1;
        S.claimed = true; S.closed = true; S.newTitle = 'fortnight'; S.riseT = null; render(); sfx('coin'); setTimeout(function () { sfx('badge'); }, 260); goal('clear'); break;
      case 'alloc': S.overlay = 'stats'; S.tab = 'status'; render(); break;
      case 'cont': S.overlay = null; S.tab = 'status'; render(); break;
      case 'stats': S.overlay = 'stats'; render(); break;
      case 'statsdone': S.overlay = null; S.tab = 'status'; render(); break;
      case 'addstat': if (S.points > 0) { S.stats[+v]++; S.points--; render(); sfx('done'); buzz(12); } else toast('No points to spend. Each level gives 3.'); break;
      case 'strike':
        S.hp = Math.max(0, S.hp - 15); S.struck++; S.shake = true; S.float = true; render(); S.shake = false; sfx('hit'); buzz(30); goal('strike');
        if (S.hp === 0) {
          S.bossDown = true;
          if (!S.gateBroken) { S.gateBroken = true; S.extra += 200; S.newTitle = 'gate_breaker'; }
          setTimeout(function () { sfx('boss'); toast('Gate cleared. +200 XP.', 'gold', 3000); }, 180);
        } else toast(pick(['Strike landed. Boss HP −15.', 'Direct hit. The Golem weakens.']), 'red', 1600);
        setTimeout(function () { S.float = false; render(); }, 900);
        break;
      case 'respawn': S.hp = 100; S.bossDown = false; render(); break;
      case 'hard': S.hard = !S.hard; render(); sfx('alert'); break;
      case 'sync':
        S.synced = true; S.steps = 8640; S.sleep = 432; if (!S.closed) { S.done[3] = true; S.done[4] = true; }
        render(); goal('sync'); sfx('done'); setTimeout(function () { sfx('done'); }, 140);
        toast(S.closed ? 'Sleep logged.' : 'Sleep logged. Steps and sleep cleared. +60 XP.', 'gold', 2800);
        if (U.derive(S).all && !S.closed) setTimeout(function () { toast('All daily quests cleared. Reward available.', 'gold'); sfx('all'); }, 2900);
        break;
      case 'view-crest': lastK = k; S.viewer = v; render(); sfx('badge'); goal('crest'); break;
      case 'close-viewer': S.viewer = null; render(); if (lastK) { var b = host.querySelector('[data-k="' + lastK + '"]'); if (b) b.focus({ preventScroll: true }); } break;
      case 'soon': toast(v + ' is in the app. This demo covers the main loop.'); break;
    }
  }
  host.addEventListener('click', function (e) {
    var b = e.target.closest('[data-a]'); if (!b || !host.contains(b)) return;
    act(b.getAttribute('data-a'), b.getAttribute('data-v'), b.getAttribute('data-k'));
  });
  host.addEventListener('keydown', function (e) { if (e.key === 'Escape' && S.viewer) { e.preventDefault(); act('close-viewer'); } });

  /* ---------- controls ---------- */
  var sb = document.getElementById('axsound');
  if (sb) sb.addEventListener('click', function () {
    snd.on = !snd.on; sb.setAttribute('aria-pressed', snd.on); sb.querySelector('span').textContent = snd.on ? 'Sound and haptics on' : 'Sound and haptics off';
    if (snd.on) { sfx('badge'); buzz(12); }
  });
  var rb = document.getElementById('axreset');
  if (rb) rb.addEventListener('click', function () {
    S = U.newState(); goalsDone = {}; document.querySelectorAll('[data-goal]').forEach(function (g) { g.classList.remove('done'); g.querySelector('.gmark').removeAttribute('data-ok'); });
    var c = document.getElementById('goalcount'); if (c) c.textContent = '0 of ' + goalEls.length + ' cleared'; render();
    if (live) live.textContent = 'Demo reset.';
  });

  /* ---------- scale the 390x844 screen to whatever width it gets ---------- */
  var fit = host.parentNode;
  function scale() { var w = fit.clientWidth; if (w) fit.style.setProperty('--s', (w / 390).toFixed(4)); }
  if (window.ResizeObserver) new ResizeObserver(scale).observe(fit); else window.addEventListener('resize', scale);
  scale();

  /* ---------- start: render when the section nears the viewport (fonts first) ---------- */
  var started = false;
  function start() { if (started) return; started = true; var go = function () { render(); }; (document.fonts && document.fonts.ready) ? document.fonts.ready.then(go) : go(); }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { start(); o.disconnect(); } }, { rootMargin: '400px' }).observe(fit); else start();
})();

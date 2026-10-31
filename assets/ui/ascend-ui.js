/* ASCEND UI kit: screens as pure functions of a state object.
   Used by the playable demo on the page and by the film, so both show the same components.
   Source of truth for look and copy: the "Level Up App UI" design boards (Status, Quests, Dungeon, Level Up, Stats, Titles). */
(function (root) {
  'use strict';
  var U = { base: 'assets/' };

  /* ---------- icons: 24 grid, 1.8 stroke, round caps, one colour ---------- */
  var PATH = {
    status: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    quests: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    dungeon: '<path d="M5 21V10a7 7 0 0 1 14 0v11"/><path d="M5 21h14M12 21v-7"/>',
    health: '<path d="M20.8 8.6a5 5 0 0 0-8.8-3.1 5 5 0 0 0-8.8 3.1c0 5.4 8.8 11 8.8 11s8.8-5.6 8.8-11z"/><path d="M6 12h3l1.5-3 3 6 1.5-3h3"/>',
    more: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    chev: '<path d="M9 5l7 7-7 7"/>',
    flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .5 1.5 1.5 2 2 2-1-3 0-5 1-8z"/>',
    snow: '<path d="M12 3v18M4 7.5l16 9M4 16.5l16-9"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    star: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>',
    sword: '<path d="M14 4l6 6-10 10-4 1 1-4z"/><path d="M13 5l6 6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    sync: '<path d="M20 11a8 8 0 0 0-14.5-4M4 4v4h4M4 13a8 8 0 0 0 14.5 4M20 20v-4h-4"/>'
  };
  function ico(n, s, sw, st) {
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.8) +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (st ? ' style="' + st + '"' : '') + '>' + PATH[n] + '</svg>';
  }
  var A = function (p) { return U.base + 'art/' + p + '.webp'; };

  /* ---------- content ---------- */
  var QUESTS = [
    { k: 'workout', name: 'Workout 30 min', short: 'Workout', stat: 'STR', xp: 40, how: 'By hand', step: 1 },
    { k: 'meditate', name: 'Meditate 10 min', short: 'Meditate', stat: 'SEN', xp: 20, how: 'By hand', step: 2 },
    { k: 'read', name: 'Read 20 pages', short: 'Read', stat: 'INT', xp: 30, how: 'By hand', step: 3 },
    { k: 'walk', name: 'Walk 8,000 steps', short: 'Walk', stat: 'AGI', xp: 30, how: 'Auto · phone', auto: true },
    { k: 'sleep', name: 'Sleep 7 hours', short: 'Sleep', stat: 'VIT', xp: 30, how: 'Auto · watch', auto: true },
    { k: 'deep', name: 'Deep work 2 hours', short: 'Deep work', stat: 'DIS', xp: 50, how: 'By hand', hard: true }
  ];
  var STATN = ['STR', 'INT', 'VIT', 'AGI', 'SEN', 'DIS'];
  var STATFULL = ['STRENGTH', 'INTELLECT', 'VITALITY', 'AGILITY', 'SENSE', 'DISCIPLINE'];
  var RANKS = [['e', 'E', 1, '#93A9C8'], ['d', 'D', 5, '#3DDC97'], ['c', 'C', 10, '#3EA8FF'], ['b', 'B', 20, '#B48CFF'], ['a', 'A', 35, '#FFC857'], ['s', 'S', 50, '#FF8A9C']];
  var TITLES = [
    ['newcomer', 'Newcomer', 'Everyone starts here.'], ['first_step', 'First Step', 'Clear your first day.'], ['getting_started', 'Getting Started', 'Complete 10 quests.'],
    ['week_warrior', 'Week Warrior', 'Reach a 7 day streak.'], ['iron_will', 'Iron Will', 'Reach level 7.'], ['fortnight', 'Fortnight', 'Reach a 14 day streak.'],
    ['bookworm', 'Bookworm', 'Finish a book.'], ['sage', 'Sage', 'Reach Intellect 20.'], ['gate_breaker', 'Gate Breaker', 'Clear a dungeon gate.'],
    ['month_master', 'Month Master', 'Reach a 30 day streak.'], ['habit_forged', 'Habit Forged', 'Reach a 66 day streak.'], ['gate_warden', 'Gate Warden', 'Clear a D-rank gate.'],
    ['gate_master', 'Gate Master', 'Clear a C-rank gate.'], ['quest_runner', 'Quest Runner', 'Complete 100 quests.'], ['veteran', 'Veteran', 'Reach level 10.'],
    ['elite', 'Elite', 'Reach level 20.'], ['treasure_keeper', 'Treasure Keeper', 'Hold 25 silver.']];
  var COINS = [['gold', 'Gold', '100 silver make one gold. Worth ₹10,000.', '#FFC857'], ['silver', 'Silver', '100 copper make one silver. Worth ₹100.', '#D8E4F2'], ['copper', 'Copper', 'The smallest coin. Worth ₹1.', '#E59A5B']];

  U.QUESTS = QUESTS; U.TITLES = TITLES; U.RANKS = RANKS; U.COINS = COINS; U.ico = ico; U.art = A;

  /* ---------- state ---------- */
  U.newState = function () {
    return {
      tab: 'status', overlay: null, day0: 4, view: 'today', closed: false, claimed: false,
      done: [false, false, false, false, false, false], pop: null, bank: 0,
      level: 7, baseXp: 790, need: 1000, extra: 0, gateBroken: false, streak: 13, wallet0: 4260, points: 0, stats: [14, 18, 12, 11, 9, 16],
      hard: false, hp: 60, bossDown: false, struck: 0, shake: null, float: false,
      synced: false, steps: 6120, sleep: 0,
      viewer: null, toast: null, film: null, name: 'PLAYER'
    };
  };
  var fmt = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
  U.fmt = fmt;
  U.derive = function (S) {
    var xp = 0, n = 0, steps = 0, i;
    for (i = 0; i < 6; i++) if (S.done[i]) { xp += QUESTS[i].xp; n++; if (QUESTS[i].step) steps++; }
    var routine = steps === 3; if (routine) xp += 20;
    var total = S.baseXp + xp + S.extra - S.bank;
    return { xpToday: xp, count: n, steps: steps, routine: routine, total: total, pct: Math.max(0, Math.min(100, total / S.need * 100)), all: n === 6, wallet: S.wallet0 + xp + S.extra };
  };
  U.rankOf = function (lv) { var r = RANKS[0]; for (var i = 0; i < RANKS.length; i++) if (lv >= RANKS[i][2]) r = RANKS[i]; return r; };
  function rankProgress(lv) { var i = RANKS.indexOf(U.rankOf(lv)); if (i >= RANKS.length - 1) return 100; return Math.round((lv - RANKS[i][2]) / (RANKS[i + 1][2] - RANKS[i][2]) * 100); }
  function coinSplit(r) { return { g: Math.floor(r / 10000), s: Math.floor((r % 10000) / 100), c: r % 100 }; }
  U.coinSplit = coinSplit;
  function titleOn(S, D, key) {
    switch (key) {
      case 'newcomer': case 'first_step': case 'getting_started': return true;
      case 'week_warrior': return S.streak >= 7;
      case 'iron_will': return S.level >= 7;
      case 'fortnight': return S.streak >= 14;
      case 'veteran': return S.level >= 10;
      case 'elite': return S.level >= 20;
      case 'treasure_keeper': return D.wallet >= 2500;
      case 'gate_breaker': return !!S.gateBroken;
      default: return false;
    }
  }
  U.titleOn = titleOn;
  function hm(min) { return min ? Math.floor(min / 60) + 'h ' + (min % 60 < 10 ? '0' : '') + (min % 60) + 'm' : '--'; }

  /* ---------- screens ---------- */
  var R = {};
  var bar = function (k, pct, cls) { return '<div class="bar ' + (cls || '') + '"><i data-bar="' + k + '" style="width:' + pct.toFixed(2) + '%"></i></div>'; };

  function sysMsg(S, D) {
    if (S.closed) return 'Day cleared. Rest well, new quests arrive tomorrow.';
    if (D.all) return 'All quests cleared. Collect your reward.';
    if (D.count === 0) return 'Player detected. Daily quests are ready.';
    var left = 6 - D.count; return (left === 1 ? 'One quest left.' : left + ' quests left.') + (S.done[5] ? '' : ' Deep work is Hard Mode.');
  }

  R.status = function (S, D) {
    var rk = U.rankOf(S.level)[1], left = [];
    QUESTS.forEach(function (q, i) { if (!S.done[i]) left.push(q.short + (q.hard ? ' (Hard)' : '')); });
    var coin = coinSplit(D.wallet);
    return '<div class="body enter" data-sc="status">' +
      '<div class="hd"><span class="ttl">STATUS</span></div>' +
      '<div class="sysline"><span><span class="tg">[ SYSTEM ]</span>' + sysMsg(S, D) + '</span></div>' +
      '<div class="pn glow" style="gap:12px;padding:14px 16px">' +
        '<div class="who"><div class="av"><img src="' + A('avatar_knight') + '" alt=""></div>' +
        '<div class="nm"><b>' + S.name + '</b><span><img src="' + A('badge_title_' + (S.streak >= 14 ? 'fortnight' : 'iron_will')) + '" alt="">Title: ' + (S.streak >= 14 ? 'Fortnight' : 'Iron Will') + '</span></div>' +
        '<span class="lv">LV ' + S.level + ' · ' + rk + '</span></div>' +
        '<div style="display:flex;flex-direction:column;gap:4px"><div class="split cap14"><span>XP TO LEVEL ' + (S.level + 1) + '</span><span>' + fmt(Math.min(D.total, S.need)) + ' / ' + fmt(S.need) + '</span></div>' + bar('xp', D.pct) + '</div>' +
        '<div class="chips"><span class="pl gold">' + ico('flame', 16, 2) + S.streak + ' DAYS</span><span class="pl">' + ico('snow', 16, 2) + '1 FREEZE LEFT</span></div>' +
        '<button class="wallet" data-a="tab" data-v="more" data-k="wallet" aria-label="Open wallet, ' + fmt(D.wallet) + ' rupees"><img src="' + A('coin_gold') + '" alt=""><span class="t"><span class="v">₹' + fmt(D.wallet) + '</span><span>in your wallet</span></span>' + ico('chev', 20, 2, 'color:#93a9c8') + '</button>' +
      '</div>' +
      '<button class="pn link" data-a="tab" data-v="quests" data-k="qcard">' +
        '<div class="split"><span class="lab">DAILY QUESTS</span><span class="num">' + D.count + ' / 6</span></div>' +
        '<div class="segs">' + QUESTS.map(function (q, i) { return '<i class="' + (S.done[i] ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
        '<div class="split cap14"><span>' + (left.length > 3 ? 'Left: ' + left.slice(0, 2).join(', ') + ' and ' + (left.length - 2) + ' more' : left.length ? 'Left: ' + left.join(', ') : 'All done') + '</span><span style="color:var(--cyan)">+' + D.xpToday + ' XP today</span></div>' +
      '</button>' +
      '<button class="pn link" data-a="tab" data-v="health" data-k="hcard">' +
        '<div class="split"><span class="lab g">TODAY\'S HEALTH</span><span class="cap14">' + (S.synced ? 'Synced just now' : 'Synced 20 min ago') + '</span></div>' +
        '<div class="m3"><div><b>' + fmt(S.steps) + '</b><span>steps</span></div><div><b>' + hm(S.sleep) + '</b><span>sleep</span></div><div><b>64</b><span>resting bpm</span></div></div>' +
      '</button>' +
      '<button class="pn link" data-a="stats" data-k="scard">' +
        '<div class="split"><span class="lab">STATS</span>' + (S.points ? '<span class="chip">' + S.points + ' POINTS TO SPEND</span>' : '') + '</div>' +
        '<div class="m6">' + STATN.map(function (n, i) { return '<div><b>' + S.stats[i] + '</b><span>' + n + '</span></div>'; }).join('') + '</div>' +
      '</button>' +
      '<button class="row2 gold" data-a="soon" data-v="Monthly review" data-k="mrev"><span><span class="lab y">OCTOBER REVIEW</span><b>Three short answers. Pays ₹50 and makes a one page PDF.</b></span>' + ico('chev', 20, 2, 'color:#93a9c8') + '</button>' +
      '<button class="row2" data-a="soon" data-v="Backup" data-k="bk"><span><span class="lab">SHARE A BACKUP COPY</span><b>Last copy left this phone 9 days ago.</b></span>' + ico('chev', 20, 2, 'color:#93a9c8') + '</button>' +
    '</div>';
  };

  function qrow(S, D, i, nextI) {
    var q = QUESTS[i], on = S.done[i];
    var popAttr = '';
    if (S.pop != null && S.pop !== false) {
      var pi = typeof S.pop === 'object' ? S.pop.i : S.pop;
      if (pi === i) {
        if (typeof S.pop === 'object' && S.pop.p != null) popAttr = ' style="animation:axPop .2s linear both;animation-play-state:paused!important;animation-delay:-' + (S.pop.p * .2).toFixed(3) + 's!important"';
        else popAttr = '';
      }
    }
    var isPop = S.pop != null && S.pop !== false && (typeof S.pop === 'object' ? S.pop.i : S.pop) === i;
    var cls = 'q' + (on ? ' done' : q.hard ? ' hard' : (nextI === i ? ' next' : ''));
    var dis = S.closed || q.auto;
    var aria = q.name + ', ' + q.xp + ' XP, ' + (on ? 'done' : 'not done') + (q.auto ? ', automatic' : '') + (q.step ? ', morning routine step ' + q.step : '');
    return '<button class="' + cls + '" role="checkbox" aria-checked="' + on + '"' + (dis ? ' aria-disabled="true"' : '') + ' data-a="quest" data-v="' + i + '" data-k="q' + i + '" aria-label="' + aria + '">' +
      '<span class="cb' + (isPop && !popAttr ? ' pop' : '') + '"' + popAttr + '>' + (on ? ico('check', 18, 3, 'color:#050914') : '') + '</span>' +
      '<span class="qt"><b>' + q.name + '</b><span>' + q.stat + ' · ' + q.how + (q.hard ? ' · HARD' : '') + (q.step ? ' · STEP ' + q.step : '') + '</span></span>' +
      '<span class="xp">+' + q.xp + '</span></button>';
  }

  R.quests = function (S, D) {
    var steps = [0, 1, 2], next = null; steps.forEach(function (i) { if (next === null && !S.done[i]) next = i; });
    var rt = D.routine;
    var body;
    if (S.view === 'today') {
      body =
        '<div style="display:flex;flex-direction:column;gap:4px"><div class="split cap14"><span>' + D.count + ' OF 6 CLEARED</span><span style="color:var(--cyan)">' + D.xpToday + ' / 220 XP</span></div>' + bar('qxp', D.xpToday / 220 * 100) + '</div>' +
        '<div class="grp' + (rt ? ' ok' : '') + '"><div class="gh"><span class="lab">MORNING ROUTINE</span><span class="num" style="font-size:14px;color:' + (rt ? 'var(--green)' : 'var(--gold)') + '">' + D.steps + '/3</span></div>' +
        '<span class="gs">' + (rt ? 'Routine done. +20 XP added.' : 'Next: ' + QUESTS[next].name + '. +20 XP when every step is done.') + '</span>' + steps.map(function (i) { return qrow(S, D, i, next); }).join('') + '</div>' +
        '<div class="ql">' + [3, 4, 5].map(function (i) { return qrow(S, D, i, -1); }).join('') + '</div>' +
        (S.closed ? '<div class="nt">Day cleared. Six new quests arrive tomorrow. Reset the demo to play it again.</div>'
          : D.all ? '<button class="xb gold" data-a="collect" data-k="collect">COLLECT REWARD</button>'
          : '<div class="nt">Steps and sleep clear on their own: open Health and sync. Tap the rest when done. Finish every routine step for +20 XP. Hard Mode: miss it and lose double XP.</div>');
    } else {
      var manage = [['Workout 30 min', 'Daily · Strength · 40 XP · Morning step 1'], ['Walk 8,000 steps', 'Daily · Agility · auto from phone'], ['Read 20 pages', 'Daily · Intellect · 30 XP · Morning step 3'], ['Sleep 7 hours', 'Daily · Vitality · auto from watch'], ['Meditate 10 min', 'Daily · Sense · 20 XP · Morning step 2'], ['Deep work 2 hours', 'Daily · Discipline · Hard Mode'], ['Long run 5 km', 'Weekly · Saturday · Strength · 60 XP'], ['Weekly review', 'Weekly · Sunday · Discipline · 40 XP']];
      body = '<div class="ql">' + manage.map(function (m) { return '<button class="row2" style="min-height:56px;padding:4px 14px;border-color:var(--line)" data-a="soon" data-v="Quest editor" data-k="m' + m[0] + '"><span><b style="font-size:17px">' + m[0] + '</b><span class="cap14" style="font-weight:600">' + m[1] + '</span></span>' + ico('chev', 20, 2, 'color:#93a9c8') + '</button>'; }).join('') + '</div>';
    }
    return '<div class="body enter" data-sc="quests">' +
      '<div class="hd"><span class="ttl">QUESTS</span><button class="ib sq" data-a="soon" data-v="Quest editor" data-k="add" aria-label="Add a quest">' + ico('plus', 22, 2.4) + '</button></div>' +
      '<div class="seg2" role="group" aria-label="View"><button data-a="view" data-v="today" data-k="vt" aria-pressed="' + (S.view === 'today') + '">TODAY</button><button data-a="view" data-v="all" data-k="va" aria-pressed="' + (S.view === 'all') + '">ALL QUESTS</button></div>' +
      body + '</div>';
  };

  R.dungeon = function (S, D) {
    var dead = S.hp <= 0, days = '';
    for (var i = 1; i <= 7; i++) days += '<i class="' + (i < S.day0 ? 'on' : i === S.day0 ? (S.struck ? 'on' : 'now') : '') + '"></i>';
    var gcls = 'gate', gst = 'position:relative';
    if (S.shake) { if (typeof S.shake === 'object') gst += ';animation:axShake .4s linear both;animation-play-state:paused!important;animation-delay:-' + (S.shake.p * .4).toFixed(3) + 's!important'; else gcls += ' shake'; }
    return '<div class="body enter" data-sc="dungeon">' +
      '<div class="hd"><span class="gatebadge">[ GATE DETECTED ]</span><div style="display:flex;align-items:center;gap:8px"><span class="rankbadge">E-RANK</span></div></div>' +
      '<div class="' + gcls + '" style="' + gst + '">' +
        '<div class="bossrow"><img src="' + A('boss_golem') + '" alt=""><div class="bn"><span>BOSS · 7 DAY DUNGEON</span><b>THE PROCRASTINATION GOLEM</b></div></div>' +
        '<div style="display:flex;flex-direction:column;gap:6px"><div class="split"><span class="lab r" style="color:var(--redtx)">BOSS HP</span><span class="o" style="font-weight:600;font-size:14px">' + Math.max(0, S.hp) + ' / 100</span></div><div class="hpbar"><i data-bar="hp" style="width:' + Math.max(0, S.hp) + '%"></i></div></div>' +
        '<div style="display:flex;flex-direction:column;gap:6px"><span class="cap14" style="letter-spacing:2px">DAY ' + S.day0 + ' OF 7</span><div class="days">' + days + '</div></div>' +
        (dead ? '<div class="cleared"><b>DUNGEON CLEARED · +200 XP</b>' + (S.film ? '' : '<button data-a="respawn" data-k="respawn">RESPAWN BOSS (DEMO)</button>') + '</div>'
          : '<button class="strike" data-a="strike" data-k="strike">' + ico('sword', 20) + 'STRIKE · DO TODAY\'S TASK</button>') +
        (S.float ? '<span class="float" data-fx="float:' + S.struck + '" style="left:46px;top:94px' + (typeof S.float === 'object' ? ';animation:axFloat .9s linear both;animation-play-state:paused!important;animation-delay:-' + (S.float.p * .9).toFixed(3) + 's!important' : '') + '">' + (S.floatTxt || '−15') + '</span>' : '') +
      '</div>' +
      (dead ? '' : '<div class="nt" style="margin-top:-4px">In the app you strike once a day. Here you can keep going.</div>') +
      '<div class="hardrow' + (S.hard ? ' on' : '') + '"><div class="ht"><b>HARD MODE</b><span>' + (S.hard ? 'Miss a day: lose 100 XP and the boss heals 20 HP.' : 'Off. Missed days only break your streak.') + '</span></div>' +
        '<button class="sw" role="switch" aria-checked="' + S.hard + '" aria-label="Hard mode" data-a="hard" data-k="hard"></button></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px">' +
        '<div class="locked">' + ico('lock', 20) + '<span>D-Rank Gate · 21 days</span><small>LV 10</small></div>' +
        '<div class="locked">' + ico('lock', 20) + '<span>C-Rank Gate · 66 days</span><small>LV 20</small></div></div>' +
    '</div>';
  };

  R.health = function (S, D) {
    var st = S.steps, sl = S.sleep;
    return '<div class="body enter" data-sc="health">' +
      '<div class="hd"><span class="ttl">HEALTH</span></div>' +
      '<div class="sysline" style="border-left-color:var(--green)"><span><span class="tg" style="color:var(--green)">[ SYSTEM ]</span>' + (S.synced ? 'Watch synced just now.' : 'Connected. Watch synced 20 min ago.') + '</span></div>' +
      '<div class="pn"><div class="split"><span class="lab g">STEPS</span><span class="cap14">From phone</span></div><div class="bigv">' + fmt(st) + '</div>' +
        '<div class="goalbar"><i data-bar="steps" style="width:' + Math.min(100, st / 8000 * 100).toFixed(1) + '%"></i></div>' +
        '<span class="cap14">' + (st >= 8000 ? 'of 8,000 · quest cleared' : 'of 8,000 · ' + fmt(8000 - st) + ' to go') + '</span></div>' +
      '<div class="pn"><div class="split"><span class="lab g">SLEEP</span><span class="cap14">From watch · 23:10 to 06:22</span></div><div class="bigv">' + hm(sl) + '</div>' +
        '<div class="goalbar"><i data-bar="sleep" style="width:' + Math.min(100, sl / 420 * 100).toFixed(1) + '%"></i></div>' +
        '<span class="cap14">' + (sl >= 420 ? 'of 7h · quest cleared' : sl ? 'of 7h' : 'Not synced yet · of 7h') + '</span></div>' +
      '<div class="pn"><div class="split"><span class="lab g">HEART</span><span class="cap14">From watch</span></div><div class="m3"><div><b>64</b><span>resting bpm</span></div><div><b>52</b><span>lowest, asleep</span></div><div><b>148</b><span>peak, workout</span></div></div></div>' +
      (S.synced ? '<div class="xb ghost" role="status" style="cursor:default">SYNCED JUST NOW</div>' : '<button class="xb blue" data-a="sync" data-k="sync">' + ico('sync', 20) + 'SYNC WATCH</button>') +
      '<div class="nt">ASCEND only reads this data, never writes it. Steps and sleep clear their quests on their own.</div>' +
    '</div>';
  };

  R.more = function (S, D) {
    var rk = U.rankOf(S.level), n = 0;
    TITLES.forEach(function (t) { if (titleOn(S, D, t[0])) n++; });
    var cs = coinSplit(D.wallet);
    var crest = function (kind, id, src, label, on, isNew) { return '<button class="crest' + (on ? '' : ' lock') + (isNew ? ' new' : '') + '" data-a="view-crest" data-v="' + kind + ':' + id + '" data-k="c' + kind + id + '" aria-label="Enlarge ' + label + (on ? '' : ', locked') + '"><img src="' + src + '" alt="" loading="lazy"></button>'; };
    return '<div class="body enter" data-sc="more">' +
      '<div class="hd"><span class="ttl">MORE</span></div>' +
      '<div class="pn glow prof" style="gap:10px"><div class="who"><div class="av"><img src="' + A('avatar_knight') + '" alt=""></div><div class="nm"><b>' + S.name + '</b><span>LV ' + S.level + ' · Rank ' + rk[1] + ' · ' + (S.streak >= 14 ? 'Fortnight' : 'Iron Will') + '</span></div></div></div>' +
      '<div class="pn"><div class="split"><span class="lab y">RANK LADDER</span><span class="cap14">You are rank ' + rk[1] + '</span></div>' +
        '<div class="crests" role="group" aria-label="Rank crests">' + RANKS.map(function (r) { return crest('rank', r[0], A('badge_rank_' + r[0]), 'Rank ' + r[1], S.level >= r[2]); }).join('') + '</div></div>' +
      '<div class="pn"><div class="split"><span class="lab">TITLES AND RANKS</span><span class="cap14">' + n + ' of 17 unlocked</span></div>' +
        '<div class="crests" role="group" aria-label="Title crests, scroll sideways">' + TITLES.map(function (t) { var on = titleOn(S, D, t[0]); return crest('title', t[0], A('badge_title_' + t[0]), t[1], on, S.newTitle === t[0]); }).join('') + '</div>' +
        '<span class="nt">Tap any crest to enlarge it.</span></div>' +
      '<div class="pn"><div class="split"><span class="lab y">WALLET</span><span class="num" style="color:var(--gold)">₹' + fmt(D.wallet) + '</span></div>' +
        '<div class="coins3">' + [['gold', cs.g], ['silver', cs.s], ['copper', cs.c]].map(function (c) { return '<button class="coin1" data-a="view-crest" data-v="coin:' + c[0] + '" data-k="coin' + c[0] + '" aria-label="Enlarge ' + c[0] + ' coin, you have ' + c[1] + '"><img src="' + A('coin_' + c[0]) + '" alt=""><b>' + c[1] + '</b><span>' + c[0] + '</span></button>'; }).join('') + '</div>' +
        '<span class="nt">100 copper make a silver, 100 silver make a gold. One copper is worth ₹1.</span></div>' +
    '</div>';
  };

  R.levelup = function (S, D) {
    var up = S.lvlPending ? true : false;
    var oldL = S.claimed ? S.level - 1 : S.level, newL = oldL + 1;
    var pct = rankProgress(newL), rk0 = U.rankOf(newL), ri = RANKS.indexOf(rk0), nx = RANKS[Math.min(RANKS.length - 1, ri + 1)];
    var rise = S.riseT != null ? ' style="animation-delay:-' + S.riseT.toFixed(3) + 's!important"' : '';
    return '<div class="lvlbody enter' + (S.claimed ? ' cm' : '') + '" data-sc="levelup">' +
      '<div class="sysbox">[ SYSTEM ] ALL TASKS CLEARED</div>' +
      '<div class="burst"><div class="ring"></div><div class="ring b"></div><div class="big-t">LEVEL UP</div>' +
        '<div class="lvnums"><span style="color:var(--muted)">' + oldL + '</span>' + ico('arrow', 30, 2.2, 'color:#3ea8ff') + '<span style="color:var(--cyan)">' + newL + '</span></div></div>' +
      '<div class="summary">' +
        '<div class="split"><span class="l">XP EARNED TODAY</span><span class="v" style="color:var(--cyan)">+' + (S.claimed ? S.bank : D.xpToday + S.extra) + '</span></div>' +
        '<div class="split"><span class="l">STREAK</span><span class="v" style="color:var(--gold)">' + (S.claimed ? S.streak : S.streak + 1) + ' days</span></div>' +
        '<div style="display:flex;flex-direction:column;gap:6px"><div class="split" style="align-items:baseline"><span class="l">RANK ' + rk0[1] + ' → ' + nx[1] + '</span><span style="font-size:15px;font-weight:700">' + pct + '%</span></div>' + bar('rank', pct, 'gold sm') + '</div>' +
      '</div>' +
      (S.claimed ? '<div class="rewards" data-fx="rewards"' + rise + '>' +
          '<div class="rw gold"><span class="n">+3</span><span>Stat points to spend</span></div>' +
          '<div class="rw"><img src="' + A('badge_title_fortnight') + '" alt=""><span>New title unlocked: <span style="color:var(--cyan)">Fortnight</span></span></div>' +
          '<div class="rw gold" style="border-color:var(--line2);background:rgba(10,18,40,.6)"><img src="' + A('coin_gold') + '" alt=""><span>Coins earned today <b style="color:var(--gold)">+₹' + S.bank + '</b></span></div>' +
        '</div>' : '') +
      '<div class="grow"></div>' +
      (S.claimed ? '<div class="stack"><button class="xb gold" style="animation:none;box-shadow:none;color:#fff" data-a="alloc" data-k="alloc">ALLOCATE POINTS</button><button class="xb ghost" data-a="cont" data-k="cont">CONTINUE</button></div>'
        : '<button class="xb blue" data-a="claim" data-k="claim">CLAIM REWARD</button>') +
    '</div>';
  };

  R.stats = function (S, D) {
    var cx = 150, cy = 130, Rr = 100, MAX = 30, pts = S.points;
    var poly = S.stats.map(function (v, i) { var a = (-90 + i * 60) * Math.PI / 180, r = Rr * Math.min(v, MAX) / MAX; return (cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1); }).join(' ');
    var ring = function (f) { return STATN.map(function (_, i) { var a = (-90 + i * 60) * Math.PI / 180; return (cx + Rr * f * Math.cos(a)).toFixed(1) + ',' + (cy + Rr * f * Math.sin(a)).toFixed(1); }).join(' '); };
    var axes = STATN.map(function (n, i) { var a = (-90 + i * 60) * Math.PI / 180; var x = cx + (Rr + 18) * Math.cos(a), y = cy + (Rr + 18) * Math.sin(a) + 5; return '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + Rr * Math.cos(a)).toFixed(1) + '" y2="' + (cy + Rr * Math.sin(a)).toFixed(1) + '" stroke="#1f4a8a"/><text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" text-anchor="middle" font-family="Orbitron" font-weight="600" font-size="14" fill="#93a9c8">' + n + '</text>'; }).join('');
    return '<div class="body enter" data-sc="stats" style="inset:0;gap:10px">' +
      '<div class="appbar"><button class="ib" data-a="statsdone" data-k="sback" aria-label="Back">' + ico('back', 24) + '</button><span class="ttl">STATS</span><span class="lv" style="margin-right:8px">LV ' + S.level + ' · RANK ' + U.rankOf(S.level)[1] + '</span></div>' +
      '<svg class="radar" width="250" height="217" viewBox="0 0 300 260" role="img" aria-label="Radar chart. ' + STATFULL.map(function (n, i) { return n.toLowerCase() + ' ' + S.stats[i]; }).join(', ') + '">' +
        [1, .66, .33].map(function (f) { return '<polygon points="' + ring(f) + '" fill="none" stroke="#1f4a8a"/>'; }).join('') + axes +
        '<polygon points="' + poly + '" fill="rgba(62,168,255,.28)" stroke="#7fe3ff" stroke-width="2"/></svg>' +
      '<div class="ptsbox' + (pts ? ' on' : '') + '"><span>UNSPENT POINTS</span><span class="num" style="font-size:20px">' + pts + '</span></div>' +
      STATFULL.map(function (n, i) { return '<div class="srow"><span class="sn">' + n + '</span><div class="sb"><i style="width:' + (Math.min(S.stats[i], MAX) / MAX * 100) + '%"></i></div><span class="sv">' + S.stats[i] + '</span><button class="plus' + (pts ? ' on' : '') + '" data-a="addstat" data-v="' + i + '" data-k="p' + i + '" aria-label="Add a point to ' + n.toLowerCase() + '"' + (pts ? '' : ' aria-disabled="true"') + '>' + ico('plus', 22, 2.2) + '</button></div>'; }).join('') +
      '<div class="nt">Each level gives 3 points. Quests also grow their linked stat by themselves. Stats set your next titles.</div>' +
      '<button class="xb" data-a="statsdone" data-k="sdone">DONE</button>' +
    '</div>';
  };

  R.tabs = function (S) {
    var T = [['status', 'Status'], ['quests', 'Quests'], ['dungeon', 'Dungeon'], ['health', 'Health'], ['more', 'More']];
    return '<nav class="tabs" aria-label="Main tabs">' + T.map(function (t) { return '<button data-a="tab" data-v="' + t[0] + '" data-k="t' + t[0] + '"' + (S.tab === t[0] ? ' aria-current="page"' : '') + '>' + ico(t[0], 22) + t[1] + '</button>'; }).join('') + '</nav>';
  };

  U.viewerItem = function (spec) {
    var p = spec.split(':'), k = p[0], id = p[1], i;
    if (k === 'rank') for (i = 0; i < RANKS.length; i++) if (RANKS[i][0] === id) return { src: A('badge_rank_' + id), title: 'Rank ' + RANKS[i][1], line: 'Reach level ' + RANKS[i][2] + '.', glow: RANKS[i][3] + '99' };
    if (k === 'title') for (i = 0; i < TITLES.length; i++) if (TITLES[i][0] === id) return { src: A('badge_title_' + id), title: TITLES[i][1], line: TITLES[i][2], glow: 'rgba(62,168,255,.6)' };
    if (k === 'coin') for (i = 0; i < COINS.length; i++) if (COINS[i][0] === id) return { src: A('coin_' + id), title: COINS[i][1], line: COINS[i][2], glow: COINS[i][3] + '88' };
    return null;
  };
  R.viewer = function (S) {
    if (!S.viewer) return '';
    var it = U.viewerItem(S.viewer); if (!it) return '';
    return '<div class="viewer" data-fx="viewer:' + S.viewer + '" role="dialog" aria-modal="true" aria-label="' + it.title + '"><div class="halo" style="--g:' + it.glow + '"></div>' +
      '<button class="ib x" data-a="close-viewer" data-k="vx" aria-label="Close">' + ico('close', 24, 2) + '</button>' +
      '<img src="' + it.src + '" alt="' + it.title + '"><b>' + it.title.toUpperCase() + '</b><p>' + it.line + '</p></div>';
  };
  R.toast = function (S) {
    var t = S.toast; if (!t) return '';
    return '<div class="toast ' + (t.tone || '') + '" data-fx="toast:' + t.text + '" aria-hidden="true"><span><span class="tg">[ SYSTEM ]</span>' + t.text + '</span></div>';
  };

  /* ---------- render ---------- */
  U.cls = function (S) {
    return 'ax' + (S.overlay === 'levelup' ? ' lvl' : (S.tab === 'dungeon' && S.overlay !== 'stats') ? ' dng' : '') + (S.film ? ' film still' : '');
  };
  U.html = function (S) {
    S.day0 = S.day0 || 4;
    var D = U.derive(S), main;
    if (S.overlay === 'levelup') main = R.levelup(S, D);
    else if (S.overlay === 'stats') main = R.stats(S, D);
    else main = R[S.tab](S, D) + R.tabs(S);
    return main + R.viewer(S) + R.toast(S);
  };
  var RM = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  U.render = function (el, S) {
    var key = S.tab + '|' + S.overlay + '|' + S.view;
    var oldBars = {}, sc = el.querySelector('[data-sc]'), scTop = sc ? sc.scrollTop : 0, scName = sc ? sc.getAttribute('data-sc') : '';
    var bars = el.querySelectorAll('[data-bar]'), i;
    for (i = 0; i < bars.length; i++) oldBars[bars[i].getAttribute('data-bar')] = bars[i].style.width;
    var act = document.activeElement, focusK = act && el.contains(act) ? act.getAttribute('data-k') : null;
    el.className = U.cls(S);
    if (S.film) el.style.setProperty('--t', S.film.t.toFixed(3)); else el.style.removeProperty('--t');
    el.innerHTML = U.html(S);
    var changed = el._key !== key; el._key = key;
    /* one-shot entrances must not replay when an unrelated re-render rebuilds the DOM */
    var prevFx = el._fx || {}, nowFx = {}, fx = el.querySelectorAll('[data-fx]');
    for (i = 0; i < fx.length; i++) {
      var fk = fx[i].getAttribute('data-fx'); nowFx[fk] = 1;
      if (prevFx[fk] && !S.film) { fx[i].style.animation = 'none'; var kids = fx[i].querySelectorAll('*'); for (var q = 0; q < kids.length; q++) kids[q].style.animation = 'none'; }
    }
    el._fx = nowFx;
    /* looping glows keep their phase across re-renders */
    if (!S.film && el.getAnimations) { try { el.getAnimations({ subtree: true }).forEach(function (a) { var t = a.effect && a.effect.getComputedTiming(); if (t && t.iterations === Infinity) a.startTime = 0; }); } catch (e) {} }
    var nb = el.querySelector('[data-sc]');
    if (nb) {
      if (!changed || RM) nb.classList.remove('enter');
      if (!changed && nb.getAttribute('data-sc') === scName) nb.scrollTop = scTop;
    }
    if (!S.film && !RM) {
      var nbars = el.querySelectorAll('[data-bar]');
      for (i = 0; i < nbars.length; i++) (function (b) {
        var k = b.getAttribute('data-bar'), to = b.style.width, from = oldBars[k] != null ? oldBars[k] : '0%';
        if (from !== to) { b.style.width = from; void b.offsetWidth; requestAnimationFrame(function () { b.style.width = to; }); }
      })(nbars[i]);
    }
    if (focusK) { var f = el.querySelector('[data-k="' + focusK + '"]'); if (f) f.focus({ preventScroll: true }); }
    return U.derive(S);
  };
  root.AscendUI = U;
})(window);

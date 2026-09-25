/* Country Gardens — shared site script (every page) */
(function () {
  'use strict';

  var FOUNDED = 1986;

  // Links from the old one-page site (index.html#/deli, #/inquire/catering, …) → new pages.
  var OLD_LINKS = {
    home: './', 'farm-market': 'farm-market.html', farmmarket: 'farm-market.html', deli: 'deli.html', menu: 'deli.html',
    bakery: 'bakery.html', catering: 'catering.html', fundraising: 'fundraising.html',
    landscaping: 'landscaping.html', landscape: 'landscaping.html', 'garden-center': 'garden-center.html', garden: 'garden-center.html',
    gallery: 'gallery.html', about: 'about.html', visit: 'visit.html', contact: 'visit.html', hours: 'visit.html',
    'mulch-delivery': 'mulch-delivery.html', mulch: 'mulch-delivery.html', 'bruce-the-spruce': 'bruce-the-spruce.html', bruce: 'bruce-the-spruce.html',
    rooted: 'classes-workshops.html', 'gift-cards': 'gift-cards.html', giftcards: 'gift-cards.html',
    donations: 'donations.html', donation: 'donations.html', employment: 'employment.html', inquire: 'quote.html'
  };
  if (/^#\//.test(location.hash)) {
    var parts = location.hash.slice(2).split('/');
    var dest = OLD_LINKS[parts[0]];
    if (dest) { location.replace(dest + (parts[0] === 'inquire' && parts[1] ? '#' + parts[1] : '')); return; }
  }

  /* ── Years in business ── */
  var year = new Date().getFullYear();
  document.querySelectorAll('.years-open').forEach(function (el) { el.textContent = year - FOUNDED; });
  document.querySelectorAll('.this-year').forEach(function (el) { el.textContent = year; });

  /* ── Store time (always Eastern, wherever the visitor is) ── */
  // Opening hours: [open, close] in 24h, index 0 = Sunday. Keep in sync with the hours text.
  var HOURS = [[8, 17], [8, 18], [8, 18], [8, 18], [8, 18], [8, 18], [8, 18]];
  function storeNow() {
    var parts = {};
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    return {
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday),
      year: Number(parts.year), month: Number(parts.month), date: Number(parts.day),
      mins: (Number(parts.hour) % 24) * 60 + Number(parts.minute)
    };
  }
  function fmtHour(h) { return (h % 12 || 12) + (h < 12 ? ' AM' : ' PM'); }

  function updateOpenStatus() {
    var now = storeNow(), h = HOURS[now.day], open = now.mins >= h[0] * 60 && now.mins < h[1] * 60;
    var text;
    if (open) text = 'Open now · until ' + fmtHour(h[1]);
    else if (now.mins < h[0] * 60) text = 'Closed · opens ' + fmtHour(h[0]) + ' today';
    else text = 'Closed · opens ' + fmtHour(HOURS[(now.day + 1) % 7][0]) + ' tomorrow';
    document.querySelectorAll('.open-status').forEach(function (el) {
      el.textContent = el.classList.contains('mob-status') ? (open ? 'Open now' : 'Closed now') : text;
      el.classList.toggle('is-open', open);
      el.classList.toggle('is-closed', !open);
      el.hidden = false;
    });
    document.querySelectorAll('.hours-table tr').forEach(function (tr) {
      tr.classList.toggle('today', tr.dataset.days.split(',').indexOf(String(now.day)) !== -1);
    });
  }
  updateOpenStatus();
  setInterval(updateOpenStatus, 60000);

  /* ── Seasonal content: "What's Fresh" strip + announcement bar switch automatically by month ──
     Edit these lists to change what shows each season. `announce` is optional. */
  var SEASONS = [
    { name: 'Winter', months: [1, 2],
      fresh: [['House-Made Soups', 'Daily'], ['Brewed Organic Coffee', 'Hot or Iced'], ['Boar\'s Head Deli', 'Made to Order'], ['Deep-Dish Pies', 'Daily'], ['Party Platters', 'Order Ahead'], ['Firewood &amp; Propane', 'In Stock']],
      announce: { text: '<strong>Planning a spring project?</strong> Book your landscape or hardscape consultation now, before the season fills up.', cta: 'Request a quote →', href: 'quote.html#landscape' } },
    { name: 'Spring', months: [3, 4, 5],
      fresh: [['Spring Bedding Plants', 'In Stock'], ['Easter Flowers', 'In Season'], ['Mulch &amp; Topsoil', 'Delivery Available'], ['Apple Cider Donuts', 'Daily'], ['Boar\'s Head Deli', 'Made to Order'], ['Easter Catering', 'Order Ahead']],
      announce: { text: '<strong>Spring planting season is here.</strong> Bedding plants are in, and mulch and topsoil delivery is available.', cta: 'Mulch delivery →', href: 'mulch-delivery.html' } },
    { name: 'Summer', months: [6, 7, 8],
      fresh: [['Jersey Fresh Produce', 'In Daily'], ['Summer Annuals', 'In Stock'], ['Iced Organic Coffee', 'Open Daily'], ['Boar\'s Head Deli', 'Made to Order'], ['Seasonal Fruit Pies', 'Daily'], ['Party Platters', 'Order Ahead']],
      announce: { text: '<strong>Jersey Fresh season.</strong> Local produce in daily, plus sandwiches and platters for every summer get-together.', cta: 'Order online →', href: 'https://order.toasttab.com/online/dj-s-country-gardens-42-robbinsville-edinburg-rd' } },
    { name: 'Fall', months: [9, 10],
      fresh: [['Deep-Dish Apple Pies', 'Daily'], ['Apple Cider Donuts', 'Daily'], ['Mums, Pumpkins &amp; Fall Decor', 'In Season'], ['Boar\'s Head Deli', 'Made to Order'], ['Firewood', 'In Stock'], ['Thanksgiving Pies &amp; Dinners', 'Order Ahead']],
      announce: { text: '<strong>Thanksgiving is coming.</strong> Order your deep-dish pies and holiday dinners early.', cta: 'Holiday catering →', href: 'catering.html' } },
    { name: 'Holiday', months: [11, 12],
      fresh: [['Holiday Pies', 'Order Ahead'], ['Christmas Trees', 'In Season'], ['Wreaths &amp; Poinsettias', 'In Season'], ['Holiday Dinners', 'Order Ahead'], ['Gift Cards', 'Perfect Gift'], ['Apple Cider Donuts', 'Daily']],
      announce: { text: '<strong>The holidays at Country Gardens:</strong> pies, holiday dinners, Christmas trees, wreaths and gift cards.', cta: 'Holiday catering →', href: 'catering.html' } }
  ];
  (function applySeason() {
    if (!document.getElementById('freshCards')) return;
    var now = storeNow();
    var season = SEASONS.filter(function (x) { return x.months.indexOf(now.month) !== -1; })[0];
    if (!season) return;
    // Until Thanksgiving (4th Thursday of November), lead with Thanksgiving instead of Christmas.
    var thanksgiving = 22 + (11 - new Date(Date.UTC(now.year, 10, 1)).getUTCDay()) % 7;
    if (now.month === 11 && now.date <= thanksgiving) season = Object.assign({}, season, {
      fresh: season.fresh.filter(function (f) { return f[0] !== 'Christmas Trees'; })
        .map(function (f) { return f[0] === 'Holiday Pies' ? ['Thanksgiving Pies', f[1]] : f; })
        .concat([['Mums &amp; Fall Decor', 'In Season']]),
      announce: { text: '<strong>Thanksgiving pies &amp; dinners:</strong> order ahead, they go fast.', cta: 'Order now →', href: 'catering.html' } });
    document.getElementById('seasonName').textContent = ' · ' + season.name;
    document.getElementById('freshCards').innerHTML = season.fresh.map(function (f) {
      return '<div class="fresh-card">' + f[0] + ' <span class="fresh-tag">' + f[1] + '</span></div>';
    }).join('');
    if (season.announce) {
      var a = document.getElementById('announce');
      a.href = season.announce.href;
      if (/^https?:/.test(season.announce.href)) { a.target = '_blank'; a.rel = 'noopener'; }
      document.getElementById('announceText').innerHTML = season.announce.text;
      document.getElementById('announceCta').textContent = season.announce.cta;
      a.hidden = false;
    }
  })();

  /* ── Mobile sidebar ── */
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('mobOverlay');
  var toggle = document.getElementById('mobToggle');
  function openSidebar() { sidebar.classList.add('open'); overlay.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', function () { sidebar.classList.contains('open') ? closeSidebar() : openSidebar(); });
  overlay.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSidebar(); });

  /* ── "Sign up for updates" buttons jump to the footer newsletter ── */
  document.querySelectorAll('[data-action="focus-newsletter"]').forEach(function (b) {
    b.addEventListener('click', function () {
      var input = document.getElementById('nl-email');
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { input.focus({ preventScroll: true }); }, 350);
    });
  });

  /* ── Formspree ── */
  function submitToFormspree(form, onOk, errorEl, btn) {
    var label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    if (errorEl) errorEl.classList.remove('show');
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (res.ok) return onOk();
        return res.json().catch(function () { return {}; }).then(function (data) {
          var msg = (data.errors && data.errors.map(function (e) { return e.message; }).join(' ')) || 'Something went wrong.';
          throw new Error(msg);
        });
      })
      .catch(function (err) {
        if (errorEl) {
          errorEl.textContent = (err && err.message ? err.message + ' ' : '') + 'Please try again or call (609) 259-1221.';
          errorEl.classList.add('show');
        }
      })
      .then(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
  }

  // One-step forms: donation, employment, newsletter
  document.querySelectorAll('form.js-formspree').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.getElementById(form.dataset.success);
      var errorEl = form.dataset.error ? document.getElementById(form.dataset.error) : form.querySelector('.form-error');
      submitToFormspree(form, function () {
        form.hidden = true;
        success.classList.add('show');
        success.focus();
      }, errorEl, form.querySelector('[type="submit"]'));
    });
  });

  /* ── Request-a-quote wizard (quote.html; quote.html#catering pre-selects a type) ── */
  var inqForm = document.getElementById('inqForm');
  if (!inqForm) return;
  var inqWrap = document.getElementById('inqFormWrap');
  var inqSuccess = document.getElementById('inqSuccess');
  var inqSteps = document.getElementById('inqSteps');
  var inqType = '';
  var TYPE_LABELS = { landscape: 'Landscape Job', catering: 'Catering Order', other: 'General Inquiry' };
  var FIELD_LABELS = {
    first_name: 'First name', last_name: 'Last name', email: 'Email', phone: 'Phone', best_contact_time: 'Best time',
    landscape_type: 'Work type', property_address: 'Property', landscape_timeline: 'Timeline', landscape_budget: 'Budget', landscape_description: 'Description',
    catering_type: 'Event type', event_date: 'Event date', guest_count: 'Guests', pickup_delivery: 'Pickup / delivery', dietary_notes: 'Dietary', catering_description: 'Details',
    other_type: 'Topic', other_subject: 'Subject', message: 'Message'
  };

  function detailPanel() { return inqForm.querySelector('.inq-panel[data-for="' + inqType + '"]'); }
  function currentPanel() { return inqForm.querySelector('.inq-panel.active'); }

  function selectType(type) {
    if (!TYPE_LABELS[type]) return;
    inqType = type;
    document.querySelectorAll('.inq-type-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.type === type));
    });
    document.getElementById('inqTypeHidden').value = TYPE_LABELS[type];
    document.getElementById('inqSubject').value = 'New ' + TYPE_LABELS[type] + ' — Country Gardens';
    // Only the chosen detail step is enabled, so hidden required fields never block
    // submission and answers from other types are never sent.
    inqForm.querySelectorAll('.inq-panel[data-for]').forEach(function (p) { p.disabled = p.dataset.for !== type; });
    inqWrap.hidden = false;
    inqForm.hidden = false; inqSteps.hidden = false; inqSuccess.classList.remove('show');
    goTo(1, false);
  }

  function goTo(step, scroll) {
    inqForm.querySelectorAll('.inq-panel').forEach(function (p) {
      p.classList.toggle('active', p.dataset.panel === String(step) && (!p.dataset.for || p.dataset.for === inqType));
    });
    inqSteps.querySelectorAll('.inq-step').forEach(function (s) {
      var n = Number(s.dataset.step);
      s.classList.toggle('done', n < step);
      s.classList.toggle('active', n === step);
    });
    if (step === 3) buildSummary();
    if (scroll !== false) inqWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function validPanel(panel) {
    var fields = panel.querySelectorAll('input, select, textarea');
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].checkValidity()) { fields[i].reportValidity(); return false; }
    }
    return true;
  }

  function buildSummary() {
    var dl = document.getElementById('inqSummary');
    dl.innerHTML = '';
    new FormData(inqForm).forEach(function (v, k) {
      if (!FIELD_LABELS[k] || !String(v).trim()) return;
      var dt = document.createElement('dt'); dt.textContent = FIELD_LABELS[k];
      var dd = document.createElement('dd'); dd.textContent = v;
      dl.appendChild(dt); dl.appendChild(dd);
    });
  }

  document.querySelectorAll('.inq-type-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      history.replaceState(null, '', '#' + b.dataset.type);
      selectType(b.dataset.type);
      inqWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  inqForm.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-go]');
    if (!btn) return;
    var target = Number(btn.dataset.go);
    if (target > Number(currentPanel().dataset.panel) && !validPanel(currentPanel())) return;
    goTo(target);
  });

  inqForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var steps = [inqForm.querySelector('.inq-panel[data-panel="1"]'), detailPanel()];
    for (var i = 0; i < steps.length; i++) {
      var bad = steps[i] && steps[i].querySelector(':invalid');
      if (bad) { goTo(i + 1); setTimeout(function () { bad.reportValidity(); }, 300); return; }
    }
    submitToFormspree(inqForm, function () {
      inqForm.hidden = true; inqSteps.hidden = true;
      inqSuccess.classList.add('show'); inqSuccess.focus();
    }, currentPanel().querySelector('.form-error'), document.getElementById('inqSubmitBtn'));
  });

  document.getElementById('inqReset').addEventListener('click', function () {
    inqForm.reset();
    selectType(inqType);
  });

  function typeFromHash() { selectType(location.hash.slice(1)); }
  window.addEventListener('hashchange', typeFromHash);
  typeFromHash();
})();

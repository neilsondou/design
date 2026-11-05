(() => {
  'use strict';

  const root = document.documentElement;
  const data = window.DOU_ICON_DATA;
  const grid = document.querySelector('#icon-grid');
  const searchInput = document.querySelector('#icon-search');
  const clearButton = document.querySelector('#clear-search');
  const resultCount = document.querySelector('#result-count');
  const categoryRow = document.querySelector('#category-chips');
  const emptyState = document.querySelector('#empty-state');
  const loadStatus = document.querySelector('#load-status');
  const toast = document.querySelector('#icons-toast');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  if (!data || !Array.isArray(data.icons)) {
    resultCount.textContent = 'Icon data could not be loaded';
    loadStatus.textContent = 'Run a local server from the project root and open /site/icons/.';
    emptyState.hidden = false;
    emptyState.textContent = 'The icon index is unavailable.';
    return;
  }

  const icons = data.icons.map(([name, display, category, keywords]) => ({
    name,
    display,
    category,
    terms: `${name} ${display} ${category} ${keywords}`.toLocaleLowerCase('en')
  }));
  const iconsByName = new Map(icons.map((icon) => [icon.name, icon]));
  const symbolBodies = new Map();
  let externalSprite = false;
  let activeCategory = 'All';
  let activeQuery = '';
  let toastTimer;
  let renderToken = 0;

  const spriteHost = document.createElement('div');
  spriteHost.className = 'sprite-host';
  spriteHost.setAttribute('aria-hidden', 'true');
  document.body.prepend(spriteHost);

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.querySelector('span').textContent = message;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2000);
  }

  function updateThemeControl() {
    const isDark = root.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeColor.content = isDark ? '#000000' : '#F4EFE5';
  }

  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('dou-theme', root.dataset.theme); } catch (error) { /* Storage may be unavailable. */ }
    updateThemeControl();
  });
  updateThemeControl();

  async function loadSprite() {
    try {
      const response = await fetch('icons-sprite.svg');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markup = await response.text();
      spriteHost.innerHTML = markup;
      spriteHost.querySelectorAll('symbol').forEach((symbol) => {
        symbolBodies.set(symbol.id.replace(/^di-/, ''), symbol.innerHTML);
      });
      if (!symbolBodies.size) throw new Error('No symbols found');
    } catch (error) {
      externalSprite = true;
    }
  }

  function iconHref(name) {
    return externalSprite ? `icons-sprite.svg#di-${name}` : `#di-${name}`;
  }

  function buildCategories() {
    const counts = new Map();
    icons.forEach((icon) => counts.set(icon.category, (counts.get(icon.category) || 0) + 1));
    const categories = ['All', ...data.categories.filter((category) => counts.has(category))];
    const fragment = document.createDocumentFragment();
    categories.forEach((category) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'category-chip';
      chip.dataset.category = category;
      chip.textContent = category === 'All' ? `All ${icons.length.toLocaleString('en-US')}` : category;
      chip.title = category === 'All' ? 'All icons' : `${counts.get(category)} icons`;
      chip.setAttribute('aria-pressed', String(category === activeCategory));
      chip.classList.toggle('selected', category === activeCategory);
      fragment.appendChild(chip);
    });
    categoryRow.replaceChildren(fragment);
  }

  function matches(icon) {
    if (activeCategory !== 'All' && icon.category !== activeCategory) return false;
    if (!activeQuery) return true;
    const tokens = activeQuery.split(/\s+/).filter(Boolean);
    return tokens.every((token) => icon.terms.includes(token));
  }

  function createCard(icon) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'icon-card';
    card.dataset.name = icon.name;
    card.title = `${icon.display} · ${icon.category}`;
    card.setAttribute('aria-label', `Copy ${icon.display} SVG to clipboard`);

    const glyph = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    glyph.setAttribute('class', 'glyph');
    glyph.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', iconHref(icon.name));
    glyph.appendChild(use);

    const label = document.createElement('span');
    label.className = 'icon-name';
    label.textContent = icon.display;

    card.append(glyph, label);
    return card;
  }

  function updateCount(shown) {
    const total = icons.length.toLocaleString('en-US');
    resultCount.textContent = shown === icons.length && !activeQuery && activeCategory === 'All'
      ? `${total} results`
      : `${shown.toLocaleString('en-US')} of ${total} results`;
  }

  function render() {
    const token = ++renderToken;
    const filtered = icons.filter(matches);
    grid.replaceChildren();
    emptyState.hidden = filtered.length > 0;
    updateCount(filtered.length);
    loadStatus.hidden = filtered.length === 0;

    if (!filtered.length) return;

    let index = 0;
    const chunkSize = 120;
    const step = () => {
      if (token !== renderToken) return;
      const fragment = document.createDocumentFragment();
      const end = Math.min(index + chunkSize, filtered.length);
      for (; index < end; index += 1) fragment.appendChild(createCard(filtered[index]));
      grid.appendChild(fragment);
      if (index < filtered.length) {
        requestAnimationFrame(step);
      } else {
        loadStatus.hidden = true;
      }
    };
    requestAnimationFrame(step);
  }

  function applySearch(value) {
    activeQuery = value.trim().toLocaleLowerCase('en');
    clearButton.hidden = value.length === 0;
    render();
  }

  let searchTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => applySearch(searchInput.value), 70);
  });

  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    applySearch('');
    searchInput.focus();
  });

  categoryRow.addEventListener('click', (event) => {
    const chip = event.target.closest('.category-chip');
    if (!chip) return;
    activeCategory = chip.dataset.category;
    categoryRow.querySelectorAll('.category-chip').forEach((item) => {
      const selected = item === chip;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    render();
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable;
    if (event.key === '/' && !isTyping) {
      event.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    if (event.key === 'Escape' && target === searchInput) {
      if (searchInput.value) {
        searchInput.value = '';
        applySearch('');
      }
      searchInput.blur();
    }
  });

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    if (!copied) throw new Error('Copy unavailable');
  }

  function svgMarkup(icon) {
    const header = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">';
    const body = symbolBodies.get(icon.name);
    return body ? `${header}${body}</svg>` : `${header}<use href="icons-sprite.svg#di-${icon.name}"/></svg>`;
  }

  grid.addEventListener('click', async (event) => {
    const card = event.target.closest('.icon-card');
    if (!card) return;
    const icon = iconsByName.get(card.dataset.name);
    if (!icon) return;
    try {
      await copyText(svgMarkup(icon));
      card.classList.add('copied');
      setTimeout(() => card.classList.remove('copied'), 900);
      showToast(`Copied ${icon.display} SVG`);
    } catch (error) {
      showToast('Copy is unavailable in this browser');
    }
  });

  buildCategories();

  loadSprite().then(render);
})();

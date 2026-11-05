(() => {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.querySelector('#theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const toast = document.querySelector('#toast');
  let toastTimer;

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.querySelector('span').textContent = message;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2200);
  }

  function updateThemeControl() {
    const isDark = root.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeColor.content = isDark ? '#000000' : '#F4EFE5';
  }

  const accentThemes = {
    sage: { dark: ['#a8bfa8', '#c2d6c1'], light: ['#728e71', '#4d6b50'], rgb: '168, 191, 168' },
    blue: { dark: ['#a9b7c9', '#c6d2e0'], light: ['#607e99', '#415f78'], rgb: '169, 183, 201' },
    apricot: { dark: ['#d9a77a', '#e8c3a3'], light: ['#a56f3e', '#81532d'], rgb: '217, 167, 122' },
    violet: { dark: ['#b9add2', '#d0c7e2'], light: ['#807196', '#5f5075'], rgb: '185, 173, 210' },
    terracotta: { dark: ['#d39a8a', '#e5b8ac'], light: ['#a96250', '#824333'], rgb: '211, 154, 138' },
    rose: { dark: ['#d5a3b5', '#e7c1ce'], light: ['#a36579', '#7e485a'], rgb: '213, 163, 181' }
  };
  let activeAccent = 'sage';

  function applyAccent(name) {
    const palette = accentThemes[name] || accentThemes.sage;
    const colors = palette[root.dataset.theme] || palette.dark;
    activeAccent = name;
    root.style.setProperty('--accent', colors[0]);
    root.style.setProperty('--accent-deep', colors[1]);
    root.style.setProperty('--accent-soft', `rgba(${palette.rgb}, ${root.dataset.theme === 'light' ? '.12' : '.14'})`);
    document.querySelectorAll('[data-accent]').forEach((button) => {
      const selected = button.dataset.accent === name;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  document.querySelectorAll('[data-accent]').forEach((button) => {
    button.addEventListener('click', () => {
      applyAccent(button.dataset.accent);
      try { localStorage.setItem('dou-accent', activeAccent); } catch (error) { /* Storage may be unavailable on local files. */ }
    });
  });

  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('dou-theme', root.dataset.theme); } catch (error) { /* Storage may be unavailable on local files. */ }
    applyAccent(activeAccent);
    updateThemeControl();
  });
  try {
    const savedAccent = localStorage.getItem('dou-accent');
    if (savedAccent && accentThemes[savedAccent]) activeAccent = savedAccent;
  } catch (error) { /* Use the default accent. */ }
  applyAccent(activeAccent);
  updateThemeControl();

  async function copyText(text, message) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
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
      showToast(message);
    } catch (error) {
      showToast(`Copy manually: ${text}`);
    }
  }

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', () => copyText(button.dataset.copy, `Copied ${button.dataset.copy}`));
  });
  document.querySelector('#copy-code').addEventListener('click', () => {
    copyText(document.querySelector('#token-code').textContent.trim(), 'Token example copied');
  });
  document.querySelectorAll('[data-code-copy]').forEach((button) => {
    button.addEventListener('click', () => {
      const visibleCode = button.closest('.code-example-body').querySelector('pre:not([hidden]) code');
      copyText(visibleCode.textContent.trim(), 'Example code copied');
    });
  });

  const menuButton = document.querySelector('#menu-button');
  const sidebar = document.querySelector('#sidebar');
  const sidebarScrim = document.querySelector('#sidebar-scrim');

  function setMenu(open) {
    sidebar.classList.toggle('open', open);
    sidebarScrim.classList.toggle('visible', open);
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuButton.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  }

  menuButton.addEventListener('click', () => setMenu(!sidebar.classList.contains('open')));
  sidebarScrim.addEventListener('click', () => setMenu(false));
  sidebar.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    setMenu(false);
    markActive(link.hash.slice(1));
  }));

  const searchDialog = document.querySelector('#search-dialog');
  const searchInput = document.querySelector('#search-input');
  const searchResults = document.querySelector('#search-results');
  const searchEntries = [
    ['overview', 'Introduction', 'Start'], ['principles', 'Principles', 'Start'],
    ['color', 'Color', 'Foundations'], ['typography', 'Typography', 'Foundations'],
    ['layout', 'Layout and spacing', 'Foundations'], ['shape', 'Shape and depth', 'Foundations'], ['motion', 'Motion', 'Foundations'],
    ['buttons', 'Buttons', 'Components'], ['selection', 'Segmented controls', 'Components'], ['switches', 'Switches and checks', 'Components'],
    ['inputs', 'Inputs and energy conversion', 'Components'], ['search-slider', 'Search and sliders', 'Components'], ['cards', 'Cards and lists', 'Components'],
    ['badges', 'Badges and avatars', 'Components'], ['progress', 'Progress and loading', 'Components'], ['charts', 'Data visualization', 'Components'],
    ['tables', 'Data tables', 'Components'], ['feedback', 'Feedback and overlays', 'Components'],
    ['navigation', 'Navigation', 'Patterns'], ['accessibility', 'Accessibility', 'Patterns'], ['tokens', 'Design tokens', 'Resources']
  ];

  function renderSearchResults(query = '') {
    const normalized = query.trim().toLocaleLowerCase('en');
    const matches = searchEntries.filter(([, title, category]) => `${title} ${category}`.toLocaleLowerCase('en').includes(normalized));
    searchResults.replaceChildren();
    if (!matches.length) {
      const empty = document.createElement('p');
      empty.className = 'no-results';
      empty.textContent = 'No matching sections. Try another keyword.';
      searchResults.appendChild(empty);
      return;
    }
    matches.forEach(([id, title, category]) => {
      const link = document.createElement('a');
      link.href = `#${id}`;
      const label = document.createElement('span');
      label.textContent = title;
      const group = document.createElement('small');
      group.textContent = category;
      link.append(label, group);
      link.addEventListener('click', () => searchDialog.close());
      searchResults.appendChild(link);
    });
  }

  function openSearch() {
    renderSearchResults();
    searchDialog.showModal();
    searchInput.value = '';
    searchInput.focus();
  }

  document.querySelector('#search-button').addEventListener('click', openSearch);
  searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
  document.querySelectorAll('[data-close-dialog]').forEach((button) => {
    button.addEventListener('click', () => button.closest('dialog').close());
  });
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      const bounds = dialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (outside) dialog.close();
    });
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable;
    if ((event.key === '/' && !isTyping) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault();
      if (!searchDialog.open) openSearch();
    }
    if (event.key === 'Escape') setMenu(false);
  });

  const saveButton = document.querySelector('#save-button');
  saveButton.addEventListener('click', () => {
    saveButton.disabled = true;
    saveButton.querySelector('span').textContent = 'Saving…';
    setTimeout(() => {
      saveButton.disabled = false;
      saveButton.querySelector('span').textContent = 'Save changes';
      showToast('Changes saved');
    }, 650);
  });
  document.querySelector('#secondary-button').addEventListener('click', () => showToast('Added a sample item'));
  document.querySelectorAll('[data-demo-message]').forEach((button) => {
    button.addEventListener('click', () => showToast(`${button.dataset.demoMessage} · Demo action`));
  });

  const motionButton = document.querySelector('#motion-button');
  if (motionButton) {
    motionButton.addEventListener('click', () => {
      motionButton.classList.remove('is-pressing');
      void motionButton.offsetWidth;
      motionButton.classList.add('is-pressing');
      setTimeout(() => motionButton.classList.remove('is-pressing'), 170);
    });
  }

  const mealCalories = { Breakfast: 386, Lunch: 562, Dinner: 300, Snack: 128 };
  document.querySelectorAll('[data-segment]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-segment]').forEach((item) => {
        const selected = item === button;
        item.classList.toggle('selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      document.querySelector('#segment-value').textContent = button.dataset.segment;
      document.querySelector('#segment-calories').textContent = `${mealCalories[button.dataset.segment]} kcal`;
    });
  });

  document.querySelectorAll('[data-choice]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.classList.contains('selected')));
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-choice]').forEach((item) => {
        const selected = item === button;
        item.classList.toggle('selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
    });
  });

  const energyInput = document.querySelector('#energy-input');
  const energyResult = document.querySelector('#energy-result');
  const energyHelp = document.querySelector('#energy-help');

  function convertEnergy() {
    const value = Number(energyInput.value);
    if (energyInput.value === '' || !Number.isFinite(value) || value < 0) {
      energyResult.textContent = '—';
      const unit = document.createElement('small');
      unit.textContent = 'kcal';
      energyResult.appendChild(unit);
      energyInput.setAttribute('aria-invalid', 'true');
      energyHelp.textContent = 'Enter a valid number greater than or equal to 0.';
      return;
    }
    energyInput.removeAttribute('aria-invalid');
    energyHelp.textContent = 'Enter the kilojoule value per serving. The result updates automatically.';
    energyResult.textContent = Math.round(value / 4.184).toLocaleString('en-US');
    const unit = document.createElement('small');
    unit.textContent = 'kcal';
    energyResult.appendChild(unit);
  }

  energyInput.addEventListener('input', convertEnergy);
  document.querySelectorAll('[data-kj]').forEach((button) => {
    button.addEventListener('click', () => {
      energyInput.value = button.dataset.kj;
      convertEnergy();
      energyInput.focus();
    });
  });

  const demoSearch = document.querySelector('#demo-search');
  document.querySelector('#clear-demo-search').addEventListener('click', () => {
    demoSearch.value = '';
    demoSearch.focus();
  });
  document.querySelectorAll('[data-search-term]').forEach((button) => {
    button.addEventListener('click', () => {
      demoSearch.value = button.dataset.searchTerm;
      demoSearch.focus();
    });
  });
  const portionSlider = document.querySelector('#portion-slider');
  const portionOutput = document.querySelector('#portion-output');
  portionSlider.addEventListener('input', () => { portionOutput.value = `${portionSlider.value} g`; });
  const volumeSlider = document.querySelector('#volume-slider');
  const volumeOutput = document.querySelector('#volume-output');
  volumeSlider.addEventListener('input', () => { volumeOutput.value = `${volumeSlider.value}%`; });

  document.querySelectorAll('[data-record]').forEach((button) => {
    button.addEventListener('click', () => showToast(`${button.dataset.record} · Sample detail`));
  });
  document.querySelector('#toast-button').addEventListener('click', () => showToast('Changes saved'));

  const confirmDialog = document.querySelector('#confirm-dialog');
  document.querySelectorAll('#dialog-button, [data-open-confirm]').forEach((button) => {
    button.addEventListener('click', () => confirmDialog.showModal());
  });
  document.querySelector('#confirm-delete').addEventListener('click', () => {
    confirmDialog.close();
    showToast('Sample record deleted');
  });
  const sheetDialog = document.querySelector('#sheet-dialog');
  document.querySelector('#sheet-button').addEventListener('click', () => sheetDialog.showModal());
  document.querySelectorAll('[data-sheet-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      sheetDialog.close();
      showToast(`Selected ${button.dataset.sheetChoice}`);
    });
  });
  document.querySelectorAll('[data-dismiss-alert]').forEach((button) => {
    button.addEventListener('click', () => button.closest('.dd-alert').remove());
  });
  document.querySelectorAll('[data-page-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-page-tab]').forEach((item) => {
        const selected = item === button;
        item.classList.toggle('selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
    });
  });
  let tableAscending = false;
  const tableBody = document.querySelector('#food-table-body');
  document.querySelector('#table-sort').addEventListener('click', (event) => {
    tableAscending = !tableAscending;
    [...tableBody.rows].sort((a, b) => {
      const difference = Number(a.dataset.calories) - Number(b.dataset.calories);
      return tableAscending ? difference : -difference;
    }).forEach((row) => tableBody.appendChild(row));
    event.currentTarget.textContent = tableAscending ? 'Calories: low to high' : 'Calories: high to low';
  });

  document.querySelectorAll('[data-nav]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-nav]').forEach((item) => {
        const selected = item === button;
        item.classList.toggle('selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      document.querySelector('#nav-demo-title').textContent = button.dataset.nav;
      document.querySelector('#nav-demo-description').textContent = button.dataset.description;
    });
  });

  document.querySelector('#focus-demo').addEventListener('click', () => showToast('Keep pressing Tab to move focus between controls'));

  const frameworkExamples = {
    buttons: {
      react: `import { useState } from 'react';
import './dou.css';

export function SaveButton() {
  const [busy, setBusy] = useState(false);
  return <button className="dd-button primary" disabled={busy}
    onClick={() => { setBusy(true); setTimeout(() => setBusy(false), 650); }}>
    {busy ? 'Saving…' : 'Save changes'}
  </button>;
}`,
      vue: `<script setup>
import { ref } from 'vue';
const busy = ref(false);
function save() { busy.value = true; setTimeout(() => busy.value = false, 650); }
</script>
<template>
  <button class="dd-button primary" :disabled="busy" @click="save">
    {{ busy ? 'Saving…' : 'Save changes' }}
  </button>
  <button class="dd-button glass">Glass button</button>
</template>`,
      flutter: `import 'package:flutter/material.dart';

class DouButton extends StatelessWidget {
  const DouButton({super.key, required this.label, this.onPressed});
  final String label;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 56,
      child: FilledButton(
        onPressed: onPressed,
        style: FilledButton.styleFrom(
          backgroundColor: const Color(0xFFF5F5F7),
          foregroundColor: Colors.black,
          shape: const StadiumBorder(),
          textStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
        ),
        child: Text(label),
      ),
    );
  }
}`
    },
    selection: {
      react: `import { useState } from 'react';
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
export function MealSegment() {
  const [meal, setMeal] = useState('Breakfast');
  return <div className="dd-segment" role="group" aria-label="Meal">
    {meals.map(item => <button key={item} aria-pressed={meal === item}
      onClick={() => setMeal(item)}>{item}</button>)}
  </div>;
}`,
      vue: `<script setup>
import { ref } from 'vue';
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const meal = ref('Breakfast');
</script>
<template>
  <div class="dd-segment" role="group" aria-label="Meal">
    <button v-for="item in meals" :key="item" :aria-pressed="meal === item"
      @click="meal = item">{{ item }}</button>
  </div>
</template>`,
      flutter: `SegmentedButton<String>(
  segments: const [
    ButtonSegment(value: 'Breakfast', label: Text('Breakfast')),
    ButtonSegment(value: 'Lunch', label: Text('Lunch')),
    ButtonSegment(value: 'Dinner', label: Text('Dinner')),
    ButtonSegment(value: 'Snack', label: Text('Snack')),
  ],
  selected: const {'Breakfast'},
  onSelectionChanged: (value) {},
  style: ButtonStyle(
    backgroundColor: WidgetStateProperty.resolveWith((states) =>
      states.contains(WidgetState.selected)
        ? const Color(0xFFF5F5F7) : const Color(0x0FFFFFFF)),
    foregroundColor: WidgetStateProperty.resolveWith((states) =>
      states.contains(WidgetState.selected) ? Colors.black : const Color(0xFFA8A8AD)),
    shape: WidgetStateProperty.all(RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))),
  ),
)`
    },
    switches: {
      react: `import { useState } from 'react';
export function SyncSetting() {
  const [enabled, setEnabled] = useState(true);
  return <label className="dd-switch">Automatic sync
    <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} />
    <i aria-hidden="true" />
  </label>;
}`,
      vue: `<script setup>
import { ref } from 'vue';
const enabled = ref(true);
const meals = ref(['Breakfast']);
</script>
<template>
  <label class="dd-switch">Automatic sync
    <input v-model="enabled" type="checkbox"><i aria-hidden="true"></i>
  </label>
  <label class="dd-check"><input v-model="meals" value="Breakfast" type="checkbox">Breakfast</label>
</template>`,
      flutter: `class SyncSetting extends StatelessWidget {
  const SyncSetting({super.key, required this.value, required this.onChanged});
  final bool value;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: const Text('Automatic sync'),
      subtitle: const Text('Sync changes to other devices after saving'),
      contentPadding: EdgeInsets.zero,
      trailing: Switch(
        value: value,
        onChanged: onChanged,
        activeTrackColor: const Color(0xFFA8BFA8),
        inactiveTrackColor: const Color(0xFF3A3A3C),
        thumbColor: const WidgetStatePropertyAll(Colors.white),
      ),
    );
  }
}`
    },
    inputs: {
      react: `import { useState } from 'react';
export function EnergyField() {
  const [value, setValue] = useState('1000');
  return <>
    <label htmlFor="energy">Energy from the nutrition label</label>
    <div className="dd-field"><input id="energy" type="number" value={value}
      onChange={e => setValue(e.target.value)} /><span>kJ</span></div>
    <output>{Math.round(Number(value || 0) / 4.184)} kcal</output>
  </>;
}`,
      vue: `<script setup>
import { computed, ref } from 'vue';
const energy = ref(1000);
const kcal = computed(() => Math.round(energy.value / 4.184));
</script>
<template>
  <label for="energy">Energy from the nutrition label</label>
  <div class="dd-field"><input id="energy" v-model.number="energy" type="number"><span>kJ</span></div>
  <output>{{ kcal }} kcal</output>
</template>`,
      flutter: `TextField(
  keyboardType: TextInputType.number,
  style: const TextStyle(color: Color(0xFFF5F5F7), fontSize: 18),
  decoration: InputDecoration(
    labelText: 'Energy from the nutrition label',
    suffixText: 'kJ',
    filled: true,
    fillColor: const Color(0x0DFFFFFF),
    labelStyle: const TextStyle(color: Color(0xFFA8A8AD)),
    border: OutlineInputBorder(borderRadius: BorderRadius.circular(17)),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(17),
      borderSide: const BorderSide(color: Color(0x1FFFFFFF)),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(17),
      borderSide: const BorderSide(color: Color(0xFFC2D6C1), width: 1.2),
    ),
  ),
)`
    },
    'search-slider': {
      react: `import { useState } from 'react';
export function PortionControls() {
  const [query, setQuery] = useState('');
  const [grams, setGrams] = useState(150);
  return <><div className="dd-search"><input type="search" value={query}
    onChange={e => setQuery(e.target.value)} placeholder="Search foods" /></div>
    <label>Portion <output>{grams} g</output></label>
    <input type="range" min="0" max="500" step="10" value={grams}
      onChange={e => setGrams(Number(e.target.value))} /></>;
}`,
      vue: `<script setup>
import { ref } from 'vue';
const query = ref('');
const grams = ref(150);
</script>
<template>
  <div class="dd-search"><input v-model="query" type="search" placeholder="Search foods"></div>
  <label>Portion <output>{{ grams }} g</output></label>
  <input v-model.number="grams" type="range" min="0" max="500" step="10">
</template>`,
      flutter: `Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    TextField(
      decoration: InputDecoration(
        hintText: 'Search foods', prefixIcon: const Icon(Icons.search),
        filled: true, fillColor: const Color(0x0DFFFFFF),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(17)),
      ),
    ),
    const SizedBox(height: 20),
    const Text('Portion 150 g'),
    Slider(
      value: 150, min: 0, max: 500, divisions: 50,
      activeColor: const Color(0xFFA8BFA8),
      onChanged: (value) {},
    ),
  ],
)`
    },
    cards: {
      react: `const records = [{ name: 'Breakfast', detail: '08:20 · 3 foods', kcal: 386 },
  { name: 'Lunch', detail: '12:35 · 4 foods', kcal: 562 }];
export function RecordList() {
  return <section className="dd-card">{records.map(item =>
    <button className="dd-row" key={item.name}>
      <span>{item.name}<small>{item.detail}</small></span>
      <strong>{item.kcal} kcal</strong>
    </button>)}</section>;
}`,
      vue: `<script setup>
const records = [{ name: 'Breakfast', detail: '08:20 · 3 foods', kcal: 386 },
  { name: 'Lunch', detail: '12:35 · 4 foods', kcal: 562 }];
</script>
<template><section class="dd-card">
  <button v-for="item in records" class="dd-row" :key="item.name">
    <span>{{ item.name }}<small>{{ item.detail }}</small></span>
    <strong>{{ item.kcal }} kcal</strong>
  </button>
</section></template>`,
      flutter: `Container(
  decoration: BoxDecoration(
    color: const Color(0xFF141416),
    border: Border.all(color: const Color(0x1FFFFFFF)),
    borderRadius: BorderRadius.circular(24),
  ),
  child: const Column(children: [
    ListTile(title: Text('Breakfast'), subtitle: Text('08:20 · 3 foods'),
      trailing: Text('386 kcal')),
    Divider(height: 1, indent: 16, endIndent: 16),
    ListTile(title: Text('Lunch'), subtitle: Text('12:35 · 4 foods'),
      trailing: Text('562 kcal')),
  ]),
)`
    },
    badges: {
      react: `export function StatusBadge({ status = 'Complete' }) {
  return <span className={\`dd-badge \${status === 'Complete' ? 'success' : ''}\`}>{status}</span>;
}
export function Avatar({ name }) {
  return <span className="dd-avatar" aria-label={name}>{name.slice(0, 1)}</span>;
}`,
      vue: `<script setup>
defineProps({ status: { type: String, default: 'Complete' }, name: String });
</script>
<template>
  <span class="dd-badge" :class="{ success: status === 'Complete' }">{{ status }}</span>
  <span class="dd-avatar" :aria-label="name">{{ name?.slice(0, 1) }}</span>
</template>`,
      flutter: `Row(children: [
  Container(
    padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 5),
    decoration: BoxDecoration(
      color: const Color(0x24A8BFA8), borderRadius: BorderRadius.circular(9)),
    child: const Text('Complete', style: TextStyle(color: Color(0xFFC2D6C1), fontSize: 11)),
  ),
  const SizedBox(width: 12),
  const CircleAvatar(
    radius: 20, backgroundColor: Color(0x24A8BFA8),
    child: Text('D', style: TextStyle(color: Color(0xFFC2D6C1))),
  ),
])`
    },
    progress: {
      react: `export function GoalProgress({ value, target }) {
  const percent = Math.round(value / target * 100);
  return <><span>{value} / {target} kcal</span>
    <div className="dd-progress" role="progressbar" aria-valuenow={percent}
      aria-valuemin="0" aria-valuemax="100"><i style={{ width: \`\${Math.min(percent, 100)}%\` }} /></div>
  </>;
}`,
      vue: `<script setup>
import { computed } from 'vue';
const props = defineProps({ value: Number, target: Number });
const percent = computed(() => Math.round(props.value / props.target * 100));
</script>
<template><div class="dd-progress" role="progressbar" :aria-valuenow="percent"
  aria-valuemin="0" aria-valuemax="100">
  <i :style="{ width: Math.min(percent, 100) + '%' }"></i>
</div></template>`,
      flutter: `Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
  const Text('1,248 / 1,800 kcal'),
  const SizedBox(height: 8),
  ClipRRect(
    borderRadius: BorderRadius.circular(3),
    child: const LinearProgressIndicator(
      value: 1248 / 1800, minHeight: 6,
      backgroundColor: Color(0x14FFFFFF),
      valueColor: AlwaysStoppedAnimation(Color(0xFFA8BFA8)),
    ),
  ),
])`
    },
    charts: {
      react: `export function WeightChart({ values }) {
  const points = values.map((v, i) => \`\${i * 50},\${100 - v}\`).join(' ');
  return <figure><figcaption>Down 0.4 kg over 7 days</figcaption>
    <svg viewBox="0 0 300 110" role="img" aria-label="Weight trend">
      <polyline points={points} fill="none" stroke="#a8bfa8" strokeWidth="2.4" />
    </svg></figure>;
}`,
      vue: `<script setup>
defineProps({ values: { type: Array, required: true } });
const toPoints = values => values.map((v, i) => (i * 50) + ',' + (100 - v)).join(' ');
</script>
<template><svg viewBox="0 0 300 110" role="img" aria-label="Weight trend">
  <polyline :points="toPoints(values)" fill="none" stroke="#a8bfa8" stroke-width="2.4" />
</svg></template>`,
      flutter: `class TrendPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFFA8BFA8)
      ..strokeWidth = 2.4
      ..style = PaintingStyle.stroke;
    final path = Path()
      ..moveTo(0, size.height * .3)
      ..cubicTo(size.width * .25, size.height * .2,
        size.width * .55, size.height * .7, size.width, size.height * .65);
    canvas.drawPath(path, paint);
    canvas.drawCircle(Offset(size.width, size.height * .65), 4, paint);
  }
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
// Usage: CustomPaint(size: const Size(320, 136), painter: TrendPainter())`
    },
    tables: {
      react: `const rows = [{ name: 'Rice', grams: 150, kcal: 232 }, { name: 'Chicken breast', grams: 300, kcal: 495 }];
export function FoodTable() {
  return <table><thead><tr><th>Food</th><th>Amount</th><th>Calories</th></tr></thead>
    <tbody>{rows.map(row => <tr key={row.name}><th scope="row">{row.name}</th>
      <td>{row.grams} g</td><td>{row.kcal} kcal</td></tr>)}</tbody></table>;
}`,
      vue: `<script setup>
const rows = [{ name: 'Rice', grams: 150, kcal: 232 }, { name: 'Chicken breast', grams: 300, kcal: 495 }];
</script>
<template><table><thead><tr><th>Food</th><th>Amount</th><th>Calories</th></tr></thead>
  <tbody><tr v-for="row in rows" :key="row.name"><th scope="row">{{ row.name }}</th>
    <td>{{ row.grams }} g</td><td>{{ row.kcal }} kcal</td></tr></tbody>
</table></template>`,
      flutter: `DataTable(
  columnSpacing: 28,
  headingTextStyle: const TextStyle(color: Color(0xFFA8A8AD)),
  columns: const [
    DataColumn(label: Text('Food')), DataColumn(label: Text('Amount')),
    DataColumn(label: Text('Calories'), numeric: true),
  ],
  rows: const [
    DataRow(cells: [DataCell(Text('Rice')), DataCell(Text('150 g')), DataCell(Text('232 kcal'))]),
    DataRow(cells: [DataCell(Text('Chicken breast')), DataCell(Text('300 g')), DataCell(Text('495 kcal'))]),
  ],
)`
    },
    feedback: {
      react: `import { useState } from 'react';
export function DeleteConfirmation() {
  const [open, setOpen] = useState(false);
  return <><button onClick={() => setOpen(true)}>Delete</button>
    {open && <div className="dd-alert" role="alertdialog" aria-modal="true">
      <h2>Delete this record?</h2><p>This cannot be undone.</p>
      <button onClick={() => setOpen(false)}>Cancel</button><button>Delete</button>
    </div>}</>;
}`,
      vue: `<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>
<template><button @click="open = true">Delete</button>
  <dialog :open="open"><h2>Delete this record?</h2><p>This cannot be undone.</p>
    <button @click="open = false">Cancel</button><button>Delete</button>
  </dialog>
</template>`,
      flutter: `Future<void> showDeleteConfirmation(BuildContext context) {
  return showDialog<void>(
    context: context,
    builder: (context) => AlertDialog(
      backgroundColor: const Color(0xFF141416),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(32)),
      title: const Text('Delete this record?'),
      content: const Text('This cannot be undone.'),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
        FilledButton(onPressed: () {}, child: const Text('Delete')),
      ],
    ),
  );
}`
    },
    navigation: {
      react: `const items = ['Today', 'Records', 'Trends', 'Me'];
export function MainTabs({ current, onChange }) {
  return <nav className="dd-tabs" aria-label="Primary">{items.map(item =>
    <button key={item} aria-current={current === item ? 'page' : undefined}
      onClick={() => onChange(item)}>{item}</button>)}</nav>;
}`,
      vue: `<script setup>
defineProps({ current: String });
defineEmits(['change']);
const items = ['Today', 'Records', 'Trends', 'Me'];
</script>
<template><nav class="dd-tabs" aria-label="Primary">
  <button v-for="item in items" :key="item" :aria-current="current === item ? 'page' : undefined"
    @click="$emit('change', item)">{{ item }}</button>
</nav></template>`,
      flutter: `NavigationBar(
  selectedIndex: 0,
  backgroundColor: Colors.black,
  indicatorColor: const Color(0xFF1C1C1E),
  destinations: const [
    NavigationDestination(icon: Icon(Icons.home_outlined), label: 'Today'),
    NavigationDestination(icon: Icon(Icons.calendar_month_outlined), label: 'Records'),
    NavigationDestination(icon: Icon(Icons.show_chart), label: 'Trends'),
    NavigationDestination(icon: Icon(Icons.person_outline), label: 'Me'),
  ],
)`
    }
  };

  document.querySelectorAll('.code-example').forEach((details) => {
    const originalCode = details.querySelector('code');
    const key = originalCode.id.replace('code-', '');
    const examples = frameworkExamples[key];
    if (!examples) return;
    const body = details.querySelector('.code-example-body');
    const originalPre = body.querySelector('pre');
    const tabs = document.createElement('div');
    tabs.className = 'code-tabs';
    tabs.setAttribute('role', 'group');
    tabs.setAttribute('aria-label', 'Choose implementation');
    const languages = [['html', 'HTML / CSS'], ['react', 'React'], ['vue', 'Vue'], ['flutter', 'Flutter']];
    languages.forEach(([language, label], index) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.textContent = label;
      tab.classList.toggle('selected', index === 0);
      tab.setAttribute('aria-pressed', String(index === 0));
      tab.addEventListener('click', () => {
        tabs.querySelectorAll('button').forEach((item) => {
          const selected = item === tab;
          item.classList.toggle('selected', selected);
          item.setAttribute('aria-pressed', String(selected));
        });
        body.querySelectorAll('pre').forEach((pre) => { pre.hidden = pre.dataset.language !== language; });
      });
      tabs.appendChild(tab);
      if (language !== 'html') {
        const pre = document.createElement('pre');
        pre.dataset.language = language;
        pre.hidden = true;
        const code = document.createElement('code');
        code.textContent = examples[language];
        pre.appendChild(code);
        body.appendChild(pre);
      }
    });
    originalPre.dataset.language = 'html';
    body.insertBefore(tabs, originalPre);
  });

  const trackedSections = [...document.querySelectorAll('.observed-section[id]')];
  const sidebarLinks = [...document.querySelectorAll('.side-nav a')];
  const topLinks = [...document.querySelectorAll('.top-nav a')];
  const groupFirstSection = { foundations: 'color', components: 'buttons', patterns: 'navigation' };
  const topGroups = {
    overview: 'overview', principles: 'overview', foundations: 'foundations',
    color: 'foundations', typography: 'foundations', layout: 'foundations', shape: 'foundations', motion: 'foundations',
    components: 'components',
    buttons: 'components', selection: 'components', switches: 'components', inputs: 'components', 'search-slider': 'components',
    cards: 'components', badges: 'components', progress: 'components', charts: 'components', tables: 'components', feedback: 'components',
    patterns: 'patterns',
    navigation: 'patterns', accessibility: 'patterns', tokens: 'patterns'
  };
  let scrollQueued = false;
  let activeId = '';

  function markActive(id) {
    if (!id) return;
    activeId = id;
    sidebarLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${activeId}`));
    topLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${topGroups[activeId]}`));
  }

  function updateActiveSection() {
    scrollQueued = false;
    let current = trackedSections[0];
    const readingLine = Math.min(360, window.innerHeight * .42);
    trackedSections.forEach((section) => {
      if (section.getBoundingClientRect().top <= readingLine) current = section;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = trackedSections[trackedSections.length - 1];
    if (current) {
      const id = groupFirstSection[current.id] || current.id;
      if (id !== activeId) markActive(id);
    }
  }

  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateActiveSection);
    }
  }, { passive: true });
  window.addEventListener('resize', updateActiveSection, { passive: true });
  updateActiveSection();
})();

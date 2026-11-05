import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = process.env.TABLER_ICONS_PATH
  || path.join(root, 'node_modules', '@iconify-json', 'tabler', 'icons.json');
const TARGET = 2200;

const categoryRules = [
  ['Arrows & Navigation', /(^|-)(arrow|arrows|chevron|chevrons|caret|corner|direction|directions|compass|route|navigation|sitemap|transfer|exchange)(-|$)/],
  ['Communication', /(^|-)(mail|mailbox|message|messages|bell|notification|phone|send|inbox|broadcast|headset|megaphone)(-|$)/],
  ['People', /(^|-)(user|users|mood|face|friends|gender|accessible|accessibility|wheelchair|baby|walk|run|stretching|hand|fingerprint)(-|$)/],
  ['Files', /^(file|files|folder|folders|archive|clipboard|notebook|notes|note|page|paper|license|receipt|report|book|books|library|article|music|photo|picture|script|markdown|template|versions|schema|table|adjustments|list|text|heading|typography)/],
  ['Devices', /^(device|devices|keyboard|mouse|screen|smart|remote|router|server|cpu|gpu|battery|charging|plug|cast|airpods|bluetooth|wifi|antenna|nfc|phone|mobiledata|signal|circuit|network|aerial|radio|disc|satellite|webcam)/],
  ['Media', /(^|-)(camera|photo|image|video|movie|music|play|player|microphone|headphone|headphones|volume|speaker|album|radio|movie|guitar|piano|clef|wave|headset|cast|aperture|focus|exposure|panorama|carousel)(-|$)/],
  ['Health & Fitness', /(^|-)(heart|hearts|health|medical|medicine|stethoscope|activity|exercise|barbell|scale|body|dna|virus|vaccine|pill|capsule|hospital|smoking|lungs|dental|crutches|bandage|first|emergency|thermometer|weight|pulse|checkup|stretching|run|walk|bike|yoga|sport)(-|$)/],
  ['Food & Drink', /(^|-)(food|meat|milk|bread|chef|cake|candy|pizza|egg|carrot|pepper|lemon|fish|soup|salad|fruit|bowl|cup|mug|coffee|beer|bottle|basket|grill|microwave|fridge|cookie|ice|wheat|mushroom|pumpkin|dinner|breakfast|lunch)(-|$)/],
  ['Home', /(^|-)(home|house|door|window|sofa|bed|bath|wash|ironing|lamp|chair|garden|tools|hammer|ladder|bucket|vacuum|toilet|shower|stairs|elevator|fence|wall|key|armchair|plant|flower|lawn|potted)(-|$)/],
  ['Nature & Weather', /(^|-)(sun|moon|star|stars|cloud|rain|snow|snowflake|wind|storm|umbrella|temperature|weather|leaf|leaves|tree|plant|seedling|flower|mountain|wave|waves|fire|flame|droplet|rainbow|tornado|mist|haze|meteor|planet|space|eco|recycle)(-|$)/],
  ['Transport', /(^|-)(car|cars|bus|train|tram|bike|scooter|plane|flight|ship|boat|sailboat|truck|van|rv|road|traffic|parking|helicopter|rocket|wheelchair|engine|steering|seat|gas|charging)(-|$)/],
  ['Shopping', /(^|-)(shopping|basket|cart|bag|tag|tags|discount|gift|store|shop|cash|receipt|package|box|boxes|delivery|truck|barcode|qrcode)(-|$)/],
  ['Money & Finance', /^(currency|cash|coin|coins|wallet|receipt|invoice|credit|discount|moneybag|transaction|tax|bank|finance|businessplan|percentage)/],
  ['Charts', /(^|-)(chart|charts|graph|graphs|trending|trend|gauge|progress|dashboard|analytics|report|timeline|histogram|infographic|presentation)(-|$)/],
  ['Development', /(^|-)(code|coding|git|github|gitlab|terminal|api|database|bug|branch|binary|math|function|variable|braces|brackets|regex|webhook|topology|json|xml|css|html|javascript|typescript|react|vue|angular|svelte|php|python|lambda|container|docker|server|source|version|versions)(-|$)/],
  ['Design Tools', /(^|-)(color|palette|brush|pen|pencil|vector|crop|layers|artboard|ruler|blur|contrast|typography|font|bold|italic|underline|highlight|paint|shape|grid|layout|columns|row|border|radius|frame|aspect|transform|rotate|flip|skew|zoom|focus|aperture)(-|$)/],
  ['Security', /(^|-)(lock|shield|key|password|fingerprint|auth|certificate|firewall|secret|privacy|private|scan|id|badge|access|permission|encryption|safe|alert|warning|error|info|help|question)(-|$)/],
  ['Time', /(^|-)(clock|hourglass|calendar|time|history|alarm|stopwatch|timer|sandglass|hours)(-|$)/],
  ['Places', /(^|-)(map|maps|pin|location|building|world|globe|compass|route|directions|hotel|school|hospital|stadium|bank|church|factory|warehouse|city|country|flag)(-|$)/],
  ['Shapes', /^(circle|square|rectangle|rectangular|hexagon|hexagonal|hexagons|triangle|pentagon|octagon|oval|polygon|cube|sphere|cone|cylinder|pyramid|diamond|shape|shapes|blob|line|lines|separator|point|dots|infinity)/],
  ['Interface', /(^|-)(settings|adjustments|plus|minus|x|check|search|filter|menu|dots|grid|layout|list|sort|copy|edit|pencil|trash|refresh|share|download|upload|external|link|eye|view|zoom|select|cursor|drag|grip|pointer|click|toggle|switch|slider|input|select|button|checkbox|radio|text|typography|align|indent|bold|italic|underline|highlight|replace|repeat|maximize|minimize|expand|collapse|fullscreen|fullscreen-exit|arrow|chevron)(-|$)/]
];

const synonyms = {
  add: 'create new insert plus', plus: 'add create new', remove: 'delete minus bin', trash: 'delete remove bin garbage',
  delete: 'trash remove bin', search: 'find lookup magnify', settings: 'gear preferences config', user: 'person account profile',
  users: 'people group team', home: 'house dashboard', heart: 'love like favorite', star: 'favorite rate rating',
  bell: 'notification alert', mail: 'email message inbox', message: 'chat comment conversation', phone: 'call contact',
  camera: 'photo picture capture', image: 'photo picture', photo: 'image picture', edit: 'pencil write modify',
  upload: 'send import', download: 'save export', share: 'send export', calendar: 'date schedule event',
  clock: 'time history recent', lock: 'secure private', unlock: 'access open', eye: 'view visible preview',
  check: 'done success confirm', x: 'close cancel dismiss', arrow: 'direction navigate', chevron: 'expand collapse direction',
  menu: 'navigation hamburger', filter: 'sort refine', chart: 'graph analytics stats', code: 'development developer',
  wifi: 'network internet signal', battery: 'power charge', food: 'meal eat nutrition', heart: 'health love',
  scale: 'weight measure', run: 'exercise fitness', bike: 'cycling transport', sun: 'weather light',
  moon: 'night dark', cloud: 'weather storage', music: 'audio song', video: 'movie film', location: 'map pin place'
};

const blocked = /(porn|nsfw|xxx|explicit|bong|drug|joint|smoking)/;
const acronyms = { ai: 'AI', api: 'API', cpu: 'CPU', css: 'CSS', gpu: 'GPU', html: 'HTML', http: 'HTTP', id: 'ID', qr: 'QR', sdk: 'SDK', tv: 'TV', ui: 'UI', url: 'URL', usb: 'USB', ux: 'UX', vr: 'VR' };

function categoryFor(name) {
  for (const [category, pattern] of categoryRules) {
    if (pattern.test(name)) return category;
  }
  return 'General';
}

function displayName(name) {
  return name.split('-').map((part) => acronyms[part] || (part ? part[0].toUpperCase() + part.slice(1) : part)).join(' ');
}

function keywordsFor(name, category) {
  const tokens = name.split('-');
  const terms = new Set([name, category.toLowerCase(), ...tokens]);
  tokens.forEach((token) => {
    if (synonyms[token]) synonyms[token].split(' ').forEach((word) => terms.add(word));
  });
  if (name.includes('off') || name.includes('slash')) terms.add('disabled off');
  if (name.includes('filled')) terms.add('solid');
  return [...terms].join(' ').toLowerCase();
}

const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const names = Object.keys(source.icons)
  .filter((name) => !name.endsWith('-filled'))
  .filter((name) => !/^(brand|letter|number|circle-number|circle-letter|square-letter|square-number|hexagon-letter|hexagon-number)-/.test(name))
  .filter((name) => !blocked.test(name))
  .sort();

const groups = new Map();
for (const name of names) {
  const category = categoryFor(name);
  if (!groups.has(category)) groups.set(category, []);
  groups.get(category).push(name);
}

const categoryOrder = categoryRules.map(([category]) => category).filter((category) => groups.has(category));
if (groups.has('General')) categoryOrder.push('General');
const selected = new Set();
for (const category of categoryOrder) {
  groups.get(category).slice(0, 50).forEach((name) => selected.add(name));
}
let index = 0;
const cursors = Object.fromEntries(categoryOrder.map((category) => [category, 50]));
while (selected.size < TARGET) {
  const category = categoryOrder[index % categoryOrder.length];
  const cursor = cursors[category];
  const group = groups.get(category);
  if (cursor < group.length) {
    selected.add(group[cursor]);
    cursors[category] = cursor + 1;
  }
  index += 1;
  if (index > 200000) break;
}

const chosen = [...selected].sort();
const icons = chosen.map((name) => {
  const category = categoryFor(name);
  return [name, displayName(name), category, keywordsFor(name, category)];
});
const symbols = chosen.map((name) => {
  const body = source.icons[name].body.replace(/stroke-width="[\d.]+"/g, 'stroke-width="1.7"');
  return `<symbol id="di-${name}" viewBox="0 0 24 24">${body}</symbol>`;
}).join('');

const payload = {
  name: 'Dou Icons',
  version: '1.0.2',
  license: 'MIT',
  source: 'Tabler Icons',
  count: icons.length,
  categories: categoryOrder,
  icons
};

await writeFile(path.join(root, 'icons-data.js'), `window.DOU_ICON_DATA = ${JSON.stringify(payload)};\n`, 'utf8');
await writeFile(path.join(root, 'icons-sprite.svg'), `<svg xmlns="http://www.w3.org/2000/svg"><defs>${symbols}</defs></svg>\n`, 'utf8');
console.log(`Built ${icons.length} icons across ${categoryOrder.length} categories.`);

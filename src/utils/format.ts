const NBSP = ' ';

const priceFormat = new Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
  maximumFractionDigits: 0,
});

/** 227000 → „227 000 Kč“ (nezlomitelné mezery). Měna se pro EN přepne tady. */
export function formatPrice(value: number): string {
  return priceFormat.format(value);
}

const units = ['Hz', 'kHz', 'dB', 'Ω', 'kg', 'mm', 'cm²', 'cm', 'W', 'V', 'm', 'Kč', '%', '″'];
const unitPattern = new RegExp(String.raw`(\d) (?=(${units.join('|')})(?![\p{L}]))`, 'gu');

/**
 * Česká typografie pro texty z obsahu: nezlomitelná mezera mezi číslem a jednotkou,
 * za jednopísmennými předložkami a spojkami a v zápisech typu „š 240 × v 1000“.
 */
export function typo(text: string): string {
  return text
    .replace(unitPattern, `$1${NBSP}`)
    .replace(/(^|[\s(])([kvszouaiKVSZOUAI]) /g, `$1$2${NBSP}`)
    .replace(/(\d) × /g, `$1${NBSP}× `) // za „×“ smí řádek zalomit
    .replace(/(^|\s)([švh]) (\d)/g, `$1$2${NBSP}$3`) // š 240, v 1000, h 383 (\b nezná „š“)
    .replace(/F−(\d) dB/g, `F−$1${NBSP}dB`);
}

/** Text s odstavci oddělenými prázdným řádkem → pole odstavců. */
export function paragraphs(text = ''): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

/**
 * Markdown s bloky „### Nadpis“ → [{ title, paragraphs }]. HTML komentáře (TODO) se vynechají.
 * Používá se pro bloky Konstrukce u produktů, aby šly skládat do mřížky.
 */
export function headedBlocks(markdown = ''): { title: string; paragraphs: string[] }[] {
  return markdown
    .replace(/<!--[\s\S]*?-->/g, '')
    .split(/^###\s+/m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [title, ...rest] = chunk.split('\n');
      return { title: title.trim(), paragraphs: paragraphs(rest.join('\n')) };
    });
}

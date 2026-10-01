import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Product = CollectionEntry<'products'>;
export type HomeSection = CollectionEntry<'home'>['data']['sections'][number];

export async function getSettings() {
  const entry = await getEntry('settings', 'settings');
  if (!entry) throw new Error('Chybí src/content/settings.yaml (klíč „settings“).');
  return entry.data;
}

export async function getHomeSections(): Promise<HomeSection[]> {
  const entry = await getEntry('home', 'home');
  if (!entry) throw new Error('Chybí src/content/home.yaml (klíč „home“).');
  return entry.data.sections.filter((s) => s.visible);
}

export async function getProducts(): Promise<Product[]> {
  const items = await getCollection('products');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getPage(id: string) {
  const entry = await getEntry('pages', id);
  if (!entry) throw new Error(`Chybí stránka src/content/pages/${id}.md`);
  return entry;
}

/** Popisky specifikací v pořadí, v jakém se zobrazují v tabulkách. */
export const specLabels = {
  concept: 'Koncept',
  ways: 'Počet pásem',
  woofer: 'Středobasový reproduktor',
  tweeter: 'Výškový reproduktor',
  lowFrequency: 'Spodní kmitočet',
  impedance: 'Impedance',
  crossover: 'Frekvenční výhybka',
  sensitivity: 'Citlivost',
  dimensions: 'Rozměry',
  weight: 'Hmotnost',
  amplifier: 'Doporučený zesilovač',
  trebleControl: 'Regulace výšek',
} as const;

export type SpecKey = keyof typeof specLabels;

/** Krátká hodnota pro kartu (bez dlouhých popisů za čárkou). */
export function shortSpec(product: Product, key: SpecKey): string {
  const value = String(product.data.specs[key] ?? '');
  if (key === 'lowFrequency') return value.split(',')[0];
  if (key === 'impedance') return value.split(',')[0].replace('nominální ', '');
  if (key === 'woofer' || key === 'tweeter') return value.split(',')[0];
  return value;
}

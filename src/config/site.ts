// Centrální konfigurace webu. Kontakty se ve fázi F2 přesunou do src/content/settings.yaml
// (kvůli adminu, viz SUPERPROMPT kap. 9A) a tento soubor je bude jen načítat.

export const features = {
  journal: false, // Deník / novinky – stránky se negenerují, nejsou v menu ani sitemapě
  references: false, // Sekce referencí na úvodu a u produktů
  english: false, // /en/ verze + přepínač jazyka
};

// Indexace vyhledávači (false = testovací provoz, noindex + robots.txt Disallow)
export const indexing = import.meta.env.PUBLIC_INDEXING === 'true';

export const site = {
  name: 'ideTone',
  claim: 'Reprosoustavy s citem pro hudbu',
  contact: {
    person: 'Petr Kocourek',
    email: 'pkocourek@idetone.cz',
    phone: '', // TODO(klient): telefon
  },
  studio: {
    label: 'Poslechové studio',
    street: 'Filipínského 59',
    city: 'Brno',
    parking: 'parkování v areálu Kaláb nebo na ulici',
  },
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61573306168822',
  },
};

export const formspree = {
  order: '', // TODO(lukas): Formspree ID
  listening: '', // TODO(lukas): Formspree ID
  custom: '', // TODO(lukas): Formspree ID
};

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/** Hlavní navigace. Cesty bez base – převádí je funkce url(). */
export const nav: NavItem[] = [
  {
    label: 'Reprosoustavy',
    href: '/reprosoustavy/',
    children: [
      { label: 'Sara', href: '/reprosoustavy/sara/' },
      { label: 'Reva', href: '/reprosoustavy/reva/' },
      { label: 'Zakázkové projekty', href: '/zakazkove-projekty/' },
    ],
  },
  { label: 'Technologie', href: '/technologie/' },
  { label: 'Poslech', href: '/poslech/' },
  { label: 'O ideTone', href: '/o-idetone/' },
  { label: 'Kontakt', href: '/kontakt/' },
];

export const orderLink = '/kontakt/#objednavka';

export const legalNav: NavItem[] = [
  { label: 'Obchodní podmínky', href: '/obchodni-podminky/' },
  { label: 'Ochrana osobních údajů', href: '/ochrana-osobnich-udaju/' },
];

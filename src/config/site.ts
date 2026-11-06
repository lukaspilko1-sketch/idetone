// Technická konfigurace webu (mění jen webmaster): feature flagy, navigace, Formspree.
// Obsah, který mění klient, je v src/content/ (kvůli adminu, viz SUPERPROMPT kap. 9A).

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
};
// Kontakty, adresa studia a sociální sítě: src/content/settings.yaml (getSettings() v utils/content.ts)

// Jedno ID může být u všech tří (stránky se rozliší předmětem e-mailu)
export const formspree = {
  contact: '', // TODO(lukas): Formspree ID
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

/** Odkaz „Objednat“ z detailu modelu: Kontakt s ?model=… (předvyplní zprávu) */
export const orderLink = '/kontakt/#formular';

/**
 * Tlačítko v hlavičce (dávka 3.1): desktop vpravo, na mobilu první položka menu.
 * null = bez tlačítka. Dřív „Objednat“ → orderLink.
 */
export const headerCta: { label: string; href: string } | null = {
  label: 'Domluvit poslech',
  href: '/poslech/#formular',
};

export const legalNav: NavItem[] = [
  { label: 'Obchodní podmínky', href: '/obchodni-podminky/' },
  { label: 'Ochrana osobních údajů', href: '/ochrana-osobnich-udaju/' },
];

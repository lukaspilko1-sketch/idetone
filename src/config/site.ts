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

/**
 * Strukturovaná data (Schema.org JSON-LD). Hodnoty jen z obsahu webu, nic se nedomýšlí.
 */
import { url } from './url';

type Settings = Awaited<ReturnType<typeof import('./content').getSettings>>;

export interface Crumb {
  name: string;
  href: string;
}

/** Absolutní URL z cesty bez base (např. „/kontakt/“). */
export function absolute(path: string, site: URL | undefined): string {
  return new URL(url(path), site).href;
}

export function organization(settings: Settings, site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absolute('/#organizace', site),
    name: 'ideTone',
    url: absolute('/', site),
    logo: absolute('/icon-192.png', site),
    email: settings.contact.email,
    ...(settings.contact.phone && { telephone: settings.contact.phone }),
    ...(settings.company.name && { legalName: settings.company.name }),
    ...(settings.company.ico && { taxID: settings.company.ico }),
    founder: { '@type': 'Person', name: settings.contact.person },
    ...(settings.social.facebook && { sameAs: [settings.social.facebook] }),
  };
}

export function localBusiness(settings: Settings, site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': absolute('/poslech/#studio', site),
    name: 'ideTone – poslechové studio',
    url: absolute('/poslech/', site),
    image: absolute('/og/default.png', site),
    parentOrganization: { '@id': absolute('/#organizace', site) },
    email: settings.contact.email,
    ...(settings.contact.phone && { telephone: settings.contact.phone }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.studio.street,
      addressLocality: settings.studio.city,
      addressCountry: 'CZ',
    },
  };
}

export function breadcrumbs(crumbs: Crumb[], site: URL | undefined) {
  const items = [{ name: 'Úvod', href: '/' }, ...crumbs];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absolute(c.href, site),
    })),
  };
}

export function product(
  p: { id: string; name: string; description: string; price: number; image?: string },
  site: URL | undefined,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `ideTone ${p.name}`,
    description: p.description,
    ...(p.image && { image: [p.image] }),
    brand: { '@type': 'Brand', name: 'ideTone' },
    manufacturer: { '@id': absolute('/#organizace', site) },
    offers: {
      '@type': 'Offer',
      url: absolute(`/reprosoustavy/${p.id}/`, site),
      price: p.price,
      priceCurrency: 'CZK',
      // TODO(klient): ověřit dostupnost / dodací lhůtu (PreOrder = na objednávku)
      availability: 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': absolute('/#organizace', site) },
    },
  };
}

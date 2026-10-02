/**
 * Content Collections – schémata obsahu. Pole odpovídají budoucímu adminu (SUPERPROMPT kap. 9A):
 * nepovinná pole jsou nepovinná, aby build nespadl kvůli prázdné hodnotě.
 */
import { defineCollection, reference, type SchemaContext } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Fotka s alt textem (alt je povinný, kvůli přístupnosti).
 * placeholder: true = dočasná ilustrace (AI), před spuštěním nahradit – vypíše ji npm run todo.
 */
const photo = (image: SchemaContext['image']) =>
  z.object({
    src: image(),
    alt: z.string().min(1, 'Doplňte popis fotky (alt).'),
    placeholder: z.boolean().default(false),
    source: z.string().optional(),
  });

/** Místo pro fotku, která zatím chybí (ImageSlot). */
const slotRatio = z.enum(['4/5', '16/9', '1/1', '3/2']);

const link = z.object({ label: z.string(), href: z.string() });

// Produkty ---------------------------------------------------------------
const products = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      order: z.number().default(0),
      /** typ do titulku stránky („Sara – sloupová reprosoustava“) */
      type: z.string(),
      /** jedna věta o zvukovém charakteru (karta na úvodu) */
      tagline: z.string(),
      /** úvodní odstavec na detailu */
      intro: z.string(),
      /** závěrečná věta „Výsledkem je reprosoustava, která…“ */
      closing: z.string().optional(),
      price: z.number().int().positive(),
      seo: z
        .object({ title: z.string().optional(), description: z.string().max(155).optional() })
        .prefault({}),
      specs: z.object({
        concept: z.string(),
        ways: z.number().int(),
        woofer: z.string(),
        tweeter: z.string(),
        lowFrequency: z.string(),
        impedance: z.string(),
        crossover: z.string(),
        sensitivity: z.string(),
        dimensions: z.string(),
        weight: z.string(),
        amplifier: z.string(),
        trebleControl: z.string().optional(),
      }),
      /** 3 klíčové parametry na kartě (klíče ze specs) */
      highlights: z
        .array(
          z.enum([
            'lowFrequency',
            'sensitivity',
            'impedance',
            'dimensions',
            'weight',
            'woofer',
            'tweeter',
          ]),
        )
        .max(3)
        .default(['lowFrequency', 'sensitivity', 'weight']),
      /** hlavní (vyříznutá) fotka; když chybí, zobrazí se ImageSlot */
      image: photo(image).optional(),
      imageSlotLabel: z.string().optional(),
      gallery: z.array(photo(image)).default([]),
      /** popisky chybějících fotek v galerii */
      gallerySlots: z.array(z.object({ label: z.string(), ratio: slotRatio })).default([]),
      impedanceChart: photo(image).optional(),
      accessories: z
        .array(
          z.object({
            name: z.string(),
            price: z.number().int().positive(),
            text: z.string().optional(),
          }),
        )
        .default([]),
    }),
});

// Delší stránky ----------------------------------------------------------
const pageSection = (image: SchemaContext['image']) =>
  z.object({
    id: z.string().optional(),
    eyebrow: z.string().optional(),
    title: z.string(),
    /** odstavce oddělené prázdným řádkem */
    text: z.string().optional(),
    list: z.array(z.string()).default([]),
    subsections: z
      .array(
        z.object({
          title: z.string(),
          text: z.string().optional(),
          list: z.array(z.string()).default([]),
        }),
      )
      .default([]),
    image: photo(image).optional(),
    imageSlot: z.object({ label: z.string(), ratio: slotRatio.default('3/2') }).optional(),
    /** vložené schéma (komponenta), např. „waveguide“ */
    figure: z.enum(['waveguide']).optional(),
  });

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** titulek do <title>, když se liší od nadpisu */
      seoTitle: z.string().optional(),
      description: z.string().max(155),
      eyebrow: z.string().optional(),
      lead: z.string().optional(),
      sections: z.array(pageSection(image)).default([]),
      steps: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      /** fotky stránky (ilustrační i skutečné), rozmístění řeší šablona stránky */
      photos: z.array(photo(image)).default([]),
      /** podpis pod textem (O ideTone) */
      signature: z.object({ greeting: z.string(), name: z.string() }).optional(),
    }),
});

// Úvodní stránka – seznam sekcí (pořadí = pořadí v souboru) -------------------
const base = { visible: z.boolean().default(true) };

const homeSection = (image: SchemaContext['image']) =>
  z.discriminatedUnion('type', [
    z.object({
      ...base,
      type: z.literal('hero'),
      eyebrow: z.string(),
      title: z.string(),
      text: z.string(),
      primary: link,
      secondary: link.optional(),
      product: reference('products'),
      /** vyříznutá fotka produktu */
      image: photo(image),
      /** pozadí za sklem: fotka (rozostřená) nebo krátké video z public/ (webm/mp4) s fotkou jako posterem */
      background: z
        .object({
          image: photo(image),
          video: z.string().optional(),
          videoMp4: z.string().optional(),
        })
        .optional(),
    }),
    z.object({
      ...base,
      type: z.literal('models'),
      eyebrow: z.string().optional(),
      title: z.string(),
      products: z.array(reference('products')).min(1),
      compareLink: link.optional(),
    }),
    z.object({
      ...base,
      type: z.literal('quote'),
      text: z.string(),
      author: z.string(),
      link: link.optional(),
      image: photo(image).optional(),
    }),
    z.object({
      ...base,
      type: z.literal('technology'),
      eyebrow: z.string().optional(),
      title: z.string(),
      /** jedna fotka sekce */
      image: photo(image).optional(),
      items: z.array(
        z.object({
          title: z.string(),
          text: z.string(),
          /** odkaz „víc“ u sloupce */
          href: z.string().optional(),
          image: photo(image).optional(),
          imageSlot: z.object({ label: z.string(), ratio: slotRatio.default('4/5') }).optional(),
        }),
      ),
      link: link.optional(),
    }),
    z.object({
      ...base,
      type: z.literal('listening'),
      eyebrow: z.string().optional(),
      title: z.string(),
      text: z.string().optional(),
      button: link,
      /** fotka prosvítající za sklem (rozostřená) */
      background: photo(image).optional(),
    }),
    z.object({
      ...base,
      type: z.literal('references'),
      title: z.string(),
    }),
  ]);

const home = defineCollection({
  loader: file('src/content/home.yaml'),
  schema: ({ image }) =>
    z.object({
      /** ceny na úvodní stránce (sekce Modely a štítek v hero) */
      showPrices: z.boolean().default(true),
      sections: z.array(homeSection(image)),
    }),
});

// Nastavení (kontakty, adresa, sociální sítě) ----------------------------------
const settings = defineCollection({
  loader: file('src/content/settings.yaml'),
  schema: z.object({
    contact: z.object({
      person: z.string(),
      email: z.email(),
      phone: z.string().default(''),
    }),
    company: z
      .object({
        name: z.string().default(''),
        ico: z.string().default(''),
        dic: z.string().default(''),
        address: z.string().default(''),
      })
      .prefault({}),
    studio: z.object({
      street: z.string(),
      city: z.string(),
      parking: z.string().default(''),
      hours: z.string().default(''),
      mapyCz: z.url(),
      googleMaps: z.url(),
    }),
    social: z.object({ facebook: z.url().optional() }).prefault({}),
  }),
});

// Skryté kolekce (feature flagy) -------------------------------------------------
const references = defineCollection({
  loader: glob({ pattern: '*.{md,yaml}', base: './src/content/references' }),
  schema: z.object({
    name: z.string(),
    city: z.string().optional(),
    model: reference('products').optional(),
    quote: z.string(),
    source: z.string().optional(),
    url: z.url().optional(),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/journal' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      excerpt: z.string().max(220),
      cover: photo(image).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { products, pages, home, settings, references, journal };

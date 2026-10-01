import type { APIRoute } from 'astro';
import { indexing } from '../config/site';

// Testovací provoz (PUBLIC_INDEXING != true): zákaz indexace celého webu.
export const GET: APIRoute = ({ site }) => {
  const body = indexing
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`, site)}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

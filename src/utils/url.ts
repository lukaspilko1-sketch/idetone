/** Vrátí cestu s ohledem na base (testovací podsložka na github.io). Použij pro všechny odkazy. */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/**
 * Spuštění skriptu na každé stránce i po přechodu přes View Transitions (ClientRouter).
 * Posluchače registrujte se `{ signal }` – před další stránkou se samy odregistrují.
 */
export function onPage(init: (signal: AbortSignal) => void) {
  let controller: AbortController | undefined;
  document.addEventListener('astro:page-load', () => {
    controller?.abort();
    controller = new AbortController();
    init(controller.signal);
  });
}

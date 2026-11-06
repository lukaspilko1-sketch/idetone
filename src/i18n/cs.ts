export const cs = {
  skipLink: 'Přeskočit na obsah',
  nav: {
    label: 'Hlavní navigace',
    menu: 'Menu',
    close: 'Zavřít',
    order: 'Objednat',
    home: 'ideTone – úvodní stránka',
  },
  footer: {
    contact: 'Kontakt',
    studio: 'Poslechové studio',
    nav: 'Stránky',
    legal: 'Právní informace',
    facebook: 'Facebook',
    map: 'Mapa (Mapy.cz)',
  },
  form: {
    required: 'povinné',
    optional: 'nepovinné',
    submit: {
      contact: 'Odeslat zprávu',
      listening: 'Domluvit poslech',
      custom: 'Odeslat poptávku',
    },
    sending: 'Odesílám…',
    subject: {
      contact: 'ideTone – dotaz',
      listening: 'ideTone – poslech',
      custom: 'ideTone – zakázka',
    },
    /** Předvyplněná zpráva z odkazu ?model= ({model} = název modelu) */
    modelMessage: 'Mám zájem o reprosoustavy {model}.',
    fields: {
      name: 'Jméno a příjmení',
      email: 'E-mail',
      phone: 'Telefon',
      message: 'Zpráva',
      messageHint: {
        contact: '',
        listening: 'Napište, kdy by se vám poslech hodil a co rádi posloucháte.',
        custom: 'Popište místnost, současnou sestavu a vaši představu.',
      },
      consent: 'Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky.',
      consentLink: 'Zásady ochrany osobních údajů',
    },
    errors: {
      summary: 'Formulář nejde odeslat. Opravte prosím zvýrazněná pole.',
      required: 'Vyplňte prosím pole „{label}“.',
      email: 'Zadejte e-mail ve tvaru jmeno@domena.cz.',
      phone: 'Zadejte telefon jen číslicemi, mezerami a případně předvolbou +420.',
      consent: 'Bez souhlasu se zpracováním údajů nemohu poptávku vyřídit.',
      inactive:
        'Odesílání formuláře zatím není aktivní. Napište mi prosím e-mail na {email}, zprávu níže si můžete zkopírovat.',
      network:
        'Zprávu se nepodařilo odeslat, nejspíš kvůli výpadku připojení. Zkuste to prosím znovu za chvíli, nebo napište e-mail na {email}.',
      server:
        'Zprávu se nepodařilo odeslat (chyba na straně služby pro odesílání formulářů). Zkuste to prosím znovu, nebo napište e-mail na {email}.',
    },
    // NÁVRH: ke schválení
    success: 'Děkuji, ozvu se do 2 pracovních dnů.',
    devInactive:
      'Vývoj: chybí Formspree ID pro tento formulář (src/config/site.ts), odesílání je vypnuté.',
  },
};

import type { cs } from './cs';

// TODO(lukas): EN překlad UI zkontrolovat před zapnutím features.english
export const en: typeof cs = {
  skipLink: 'Skip to content',
  nav: {
    label: 'Main navigation',
    menu: 'Menu',
    close: 'Close',
    order: 'Order',
    home: 'ideTone – home page',
  },
  footer: {
    contact: 'Contact',
    studio: 'Listening studio',
    nav: 'Pages',
    legal: 'Legal',
    facebook: 'Facebook',
    map: 'Map (Mapy.cz)',
  },
  form: {
    required: 'required',
    optional: 'optional',
    submit: {
      contact: 'Send message',
      listening: 'Book a listening session',
      custom: 'Send enquiry',
    },
    sending: 'Sending…',
    subject: {
      contact: 'ideTone – enquiry',
      listening: 'ideTone – listening',
      custom: 'ideTone – custom project',
    },
    modelMessage: 'I am interested in the {model} loudspeakers.',
    fields: {
      name: 'Full name',
      email: 'E-mail',
      phone: 'Phone',
      message: 'Message',
      messageHint: {
        contact: '',
        listening: 'Let me know when a listening session would suit you and what music you like.',
        custom: 'Describe your room, your current system and what you have in mind.',
      },
      consent:
        'I agree to the processing of my personal data for the purpose of handling my enquiry.',
      consentLink: 'Privacy policy',
    },
    errors: {
      summary: 'The form cannot be sent. Please correct the highlighted fields.',
      required: 'Please fill in “{label}”.',
      email: 'Enter an e-mail address like name@domain.com.',
      phone: 'Enter the phone number using digits, spaces and an optional + prefix.',
      consent: 'I cannot handle your enquiry without your consent.',
      inactive: 'The form is not active yet. Please e-mail me at {email}.',
      network:
        'The message could not be sent, probably due to a connection problem. Please try again or e-mail {email}.',
      server:
        'The message could not be sent (form service error). Please try again or e-mail {email}.',
    },
    success: 'Thank you, I will get back to you within 2 working days.',
    devInactive: 'Dev: Formspree ID missing for this form (src/config/site.ts), sending disabled.',
  },
};

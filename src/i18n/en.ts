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
  },
  form: {
    required: 'required',
    optional: 'optional',
    submit: {
      order: 'Send order',
      listening: 'Book a listening session',
      custom: 'Send enquiry',
    },
    sending: 'Sending…',
    subject: {
      order: 'ideTone – order',
      listening: 'ideTone – listening',
      custom: 'ideTone – custom project',
    },
    fields: {
      model: 'Model',
      stands: 'Stands for Reva',
      standsYes: 'Yes, include stands',
      standsNo: 'Without stands',
      standsNote: 'Stands are sold with Reva only.',
      finish: 'Finish / veneer',
      finishHint: 'If you have a finish in mind, let me know.',
      name: 'Full name',
      email: 'E-mail',
      phone: 'Phone',
      note: 'Note',
      modelBoth: 'Both models',
      where: 'Where',
      whereStudio: 'In the studio in Brno',
      whereHome: 'At my place',
      date: 'Preferred date',
      dateHint: 'For example “Wednesday afternoon”',
      message: 'Message',
      room: 'Room description',
      roomHint: 'Dimensions, floor area, speaker placement',
      system: 'Current system',
      systemHint: 'Amplifier, source, current speakers',
      budget: 'Ideas and budget',
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

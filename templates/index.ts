export type Field = {
  name: string;
  label: string;
  type: 'text' | 'date' | 'time' | 'textarea';
};

export type Template = {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  background: string;
  font: string;
  colors: { primary: string; secondary: string };
  fields: Field[];
};

export const templates: Template[] = [
  {
    id: 'royal-wedding',
    name: 'Royal Wedding',
    category: 'Wedding',
    thumbnail: '/templates/thumb-royal-wedding.svg',
    background: '/templates/bg-royal-wedding.svg',
    font: 'Playfair Display',
    colors: { primary: '#0f172a', secondary: '#f8fafc' },
    fields: [
      { name: 'bride', label: 'Bride', type: 'text' },
      { name: 'groom', label: 'Groom', type: 'text' },
      { name: 'date', label: 'Date', type: 'date' },
    ],
  },
  {
    id: 'sunny-birthday',
    name: 'Sunny Birthday',
    category: 'Birthday',
    thumbnail: '/templates/thumb-sunny-birthday.svg',
    background: '/templates/bg-sunny-birthday.svg',
    font: 'Poppins',
    colors: { primary: '#0ea5e9', secondary: '#fef3c7' },
    fields: [
      { name: 'name', label: "Guest's Name", type: 'text' },
      { name: 'age', label: 'Age', type: 'text' },
      { name: 'date', label: 'Date', type: 'date' },
    ],
  },
  {
    id: 'garden-party',
    name: 'Garden Party',
    category: 'Event',
    thumbnail: '/templates/thumb-garden-party.svg',
    background: '/templates/bg-garden-party.svg',
    font: 'Montserrat',
    colors: { primary: '#15803d', secondary: '#ecfccb' },
    fields: [
      { name: 'host', label: 'Host', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
    ],
  },
  {
    id: 'minimal-save-the-date',
    name: 'Minimal Save-the-Date',
    category: 'Wedding',
    thumbnail: '/templates/thumb-minimal-save-date.svg',
    background: '/templates/bg-minimal-save-date.svg',
    font: 'Lora',
    colors: { primary: '#111827', secondary: '#e6e6e6' },
    fields: [
      { name: 'couple', label: 'Couple', type: 'text' },
      { name: 'date', label: 'Date', type: 'date' },
    ],
  },
  {
    id: 'festive-invite',
    name: 'Festive Invite',
    category: 'Birthday',
    thumbnail: '/templates/thumb-festive-invite.svg',
    background: '/templates/bg-festive-invite.svg',
    font: 'Rubik',
    colors: { primary: '#7c3aed', secondary: '#fff7ed' },
    fields: [
      { name: 'celebrant', label: 'Celebrant', type: 'text' },
      { name: 'time', label: 'Time', type: 'time' },
    ],
  },
];

export default templates;

import { ProgramItem, ColorSwatch } from './types';

export const WEDDING_DATE = new Date('2026-12-04T09:00:00+03:00'); // East Africa Time (04.12.2026, 9:00 AM)

export const MPESA_DETAILS = {
  method: 'Lipa na M-PESA · Buy Goods & Services',
  tillNumber: '4663439',
  tillName: 'George and Obat',
};

export const WEDDING_DETAILS = {
  dateDisplay: 'Friday, December 4, 2026',
  dateShort: '04.12.2026',
  couple: {
    bride: 'Sharon',
    groom: 'Collins',
    brideFull: 'Sharon Kinanga Ogari',
    groomFull: 'Collins Omondi Obat',
  },
  parents: {
    brideParents: 'The Ogari Family',
    groomParents: 'The Obat Family',
  },
  ceremony: {
    time: '9:00 AM',
    venue: 'Monarch Gardens, Mosocho',
    address: 'Mosocho, Kisii County, Kenya',
    coordinates: { lat: -0.618, lng: 34.735 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=Monarch%20Gardens%20Mosocho%20Kisii%20County&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  reception: {
    time: '2:00 PM',
    venue: 'Monarch Gardens, Mosocho',
    address: 'Mosocho, Kisii County, Kenya (Same venue as ceremony)',
    coordinates: { lat: -0.618, lng: 34.735 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=Monarch%20Gardens%20Mosocho%20Kisii%20County&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  registry: {
    tillNumber: '4663439',
    tillName: 'George and Obat',
  },
  bibleVerses: [
    {
      text: 'I have found the one whom my soul loves.',
      reference: 'Song of Solomon 3:4',
    },
    {
      text: 'Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.',
      reference: '1 Corinthians 13:4,7',
    },
    {
      text: 'When the time is right, I, the Lord will make it happen.',
      reference: 'Isaiah 60:22',
    },
  ],
};

export const PROGRAM_ITEMS: ProgramItem[] = [
  {
    time: '8:30 AM – 9:00 AM',
    duration: '30 mins',
    title: 'Guest Arrival & Garden Seating',
    description: 'Warm welcome and ushering of family and friends at Monarch Gardens, Mosocho.',
    bullets: ['Ushering & Seating', 'Prelude Instrumental Music'],
    isChurch: true,
  },
  {
    time: '9:00 AM – 12:00 PM',
    duration: '3 hours',
    title: 'Wedding Ceremony & Exchange of Vows',
    description: 'Sacred solemnization of marriage in the garden sanctuary at Monarch Gardens, Mosocho.',
    bullets: [
      'Bridal Processional & Opening Prayer',
      'Scripture Reading & Homily',
      'Exchange of Vows & Wedding Rings',
      'Nuptial Blessing & Signing of Register',
    ],
    isChurch: true,
  },
  {
    time: '12:00 PM – 2:00 PM',
    duration: '2 hours',
    title: 'Portraits & Garden Interlude',
    description: 'Couple and family photography session while guests enjoy light refreshments in the gardens.',
    bullets: ['Bridal Party & Family Portraits', 'Garden Refreshments & Mingling'],
    isChurch: false,
  },
  {
    time: '2:00 PM – 3:15 PM',
    duration: '1 hr 15 mins',
    title: 'Reception Grand Entrance & Luncheon',
    description: 'Joyful reception celebration begins at Monarch Gardens, Mosocho with dining and fellowship.',
    bullets: [
      'Grand Entrance of the Newlyweds',
      'Opening Prayer & Blessing of the Meal',
      'Wedding Luncheon Service',
    ],
    isChurch: false,
  },
  {
    time: '3:15 PM – 4:15 PM',
    duration: '1 hour',
    title: 'Speeches, Toasts & Blessings',
    description: 'Heartfelt words of love, wisdom, and blessings from parents, family, and close friends.',
    bullets: ["Bride's Family Remarks", "Groom's Family Remarks", 'Best Man & Maid of Honor Toasts'],
    isChurch: false,
  },
  {
    time: '4:15 PM – 5:00 PM',
    duration: '45 mins',
    title: 'Cake Cutting & First Dance',
    description: 'Sharing of the wedding cake, ceremonial toast, and the couple’s first dance.',
    bullets: ['Cake Cutting Ceremony', 'Honoring Parents', 'Couple’s First Dance'],
    isChurch: false,
  },
  {
    time: '5:00 PM onwards',
    duration: 'Evening',
    title: 'Vote of Thanks, Bouquet Toss & Celebration',
    description: 'Closing blessings, bouquet toss, music, and evening celebration with all guests.',
    bullets: ['Vote of Thanks & Closing Prayer', 'Bouquet Toss', 'Music & Dancing'],
    isChurch: false,
  },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Champagne Gold',
    hex: '#D4B475',
    textColor: '#2C251D',
    description: 'Luminous champagne gold embodying warmth, celebration, and understated luxury.',
  },
  {
    name: 'Pure White',
    hex: '#FFFFFF',
    textColor: '#2C251D',
    description: 'Crisp pure white symbolizing timeless grace, purity, and bright new beginnings.',
  },
  {
    name: 'Warm Ivory Silk',
    hex: '#F4EDE0',
    textColor: '#2C251D',
    description: 'Soft pearl ivory pairing effortlessly with metallic gold accents for daytime elegance.',
  },
  {
    name: 'Antique Gold',
    hex: '#B58E43',
    textColor: '#FFFFFF',
    description: 'Brushed antique gold ideal for tailored details, accessories, and evening sophistication.',
  },
];

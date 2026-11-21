import { ProgramItem, ColorSwatch, GalleryPhoto } from './types';

export const WEDDING_DATE = new Date('2026-12-04T09:00:00+03:00'); // East Africa Time: 4th December 2026

export const WEDDING_DETAILS = {
  couple: {
    bride: 'Kinanga',
    groom: 'Omondi',
    brideShort: 'Kinanga',
    groomShort: 'Omondi',
    brideFull: 'Sharon Kinanga Ogari',
    groomFull: 'Collins Omondi Obat',
    nickname: 'Kinanga&Omondi2026',
    hashtag: '#KinangaAndOmondi2026',
    featureHeadline: 'Celebration of Holy Matrimony',
    loveStory:
      'Some of life’s most beautiful moments are the ones we never planned. What began as a journey of two people has grown into a love filled with friendship, laughter, memories and countless reasons to be grateful. Through every season, we have found our way to each other, and now we are excited to take the next step together. From this day forward, we choose each other — every day, for the rest of our lives. And we would love for you to be there as we say: “I do.”',
  },
  families: {
    brideFamily: 'The Ogari Family',
    groomFamily: 'The Obat Family',
    invitationMessage:
      'With grateful hearts and the blessings of the Ogari and Obat families, we joyfully invite you to celebrate the wedding of Sharon Kinanga Ogari & Collins Omondi Obat.',
  },
  complimentsNote: {
    title: 'With Our Compliments',
    line1: 'This is a private invitation, personally prepared for you.',
    line2Prefix: 'We would be grateful if you would kindly ',
    line2Bold: 'keep the invitation link confidential and refrain from sharing or forwarding it',
    line2Suffix: '.',
    line3: 'With appreciation for helping us preserve the intimacy of our celebration.',
    signature: 'Kinanga & Omondi',
  },
  parents: {
    bride: {
      label: 'Ogari Family',
      names: 'Family of Sharon Kinanga Ogari',
    },
    groom: {
      label: 'Obat Family',
      names: 'Family of Collins Omondi Obat',
    },
  },
  ceremony: {
    time: '9:00 AM',
    venue: 'Monarch Gardens, Mosocho',
    address: 'Monarch Gardens, Mosocho, Kisii County, Kenya',
    coordinates: { lat: -0.6197, lng: 34.7381 },
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Monarch+Gardens,+Mosocho,+Kisii+County,+Kenya&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  reception: {
    time: '2:00 PM onwards',
    venue: 'Monarch Gardens, Mosocho',
    address: 'Monarch Gardens, Mosocho, Kisii County, Kenya (Same Venue as Ceremony)',
    coordinates: { lat: -0.6197, lng: 34.7381 },
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Monarch+Gardens,+Mosocho,+Kisii+County,+Kenya&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  contacts: [],
  registry: {
    message:
      'Having you share in our special day is a gift in itself. Should you wish to bless us further, we warmly welcome physical gifts, gift envelopes, or contributions via M-Pesa Till Number.',
    tillNumber: '4663439',
    accountName: 'George and Obat',
    physicalGiftNote: 'Physical gifts and gift envelopes are warmly accepted and may be presented in person at the reception gift table at Monarch Gardens, Mosocho.',
    envelopeNote: 'Gift envelopes can be presented at the wedding reception during the gift session.',
  },
  dressCode: {
    formalTheme: 'Formal Elegance',
    ladies: 'Elegant Dresses and gowns',
    gentlemen: 'Suits or formal traditional wear',
    guideline: 'Formal Elegance',
    kidsNote: 'With love for all our little ones, we invite you to join us for a day of celebration in formal elegance.',
  },
  bibleVerses: [
    {
      text: 'When the time is right, I, the Lord, will make it happen.',
      reference: 'Isaiah 60:22',
    },
    {
      text: 'What therefore God hath joined together, let not man put asunder.',
      reference: 'Mark 10:9',
    },
    {
      text: 'Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up.',
      reference: 'Ecclesiastes 4:9-10',
    },
    {
      text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It always protects, always trusts, always hopes, always perseveres.',
      reference: '1 Corinthians 13:4,7',
    },
  ],
};

export const PROGRAM_ITEMS: ProgramItem[] = [
  {
    time: '9:00 AM - 12:00 PM',
    duration: '3 hours',
    title: 'Wedding Ceremony & Exchange of Vows',
    description:
      'Guest seating, bridal procession, and Sacrament of Holy Matrimony at Monarch Gardens, Mosocho, Kisii County.',
    isChurch: true,
  },
  {
    time: '12:00 PM - 2:00 PM',
    duration: '2 hours',
    title: 'Garden Photography & Light Refreshments',
    description:
      'Bridal party & family portrait session across the gardens while guests mingle and enjoy welcome refreshments.',
    isChurch: true,
  },
  {
    time: '2:00 PM - 2:30 PM',
    duration: '30 mins',
    title: 'Grand Reception Arrival & Welcome',
    description:
      'Official opening of the afternoon reception at Monarch Gardens, Mosocho, followed by the grand entrance of the newlyweds.',
    isChurch: false,
  },
  {
    time: '2:30 PM - 3:30 PM',
    duration: '1 hour',
    title: 'Wedding Feast & Dining',
    description: 'Celebratory wedding banquet and fellowship.',
    isChurch: false,
  },
  {
    time: '3:30 PM - 4:30 PM',
    duration: '1 hour',
    title: 'Entertainment, Speeches & Gifts',
    description:
      'Joyful music, cultural performances, family tributes, and presentation of wedding gifts & envelopes.',
    isChurch: false,
  },
  {
    time: '4:30 PM - 5:15 PM',
    duration: '45 mins',
    title: 'Cake Cutting & Toast',
    description: 'Ceremonial cutting of the wedding cake and champagne toast.',
    isChurch: false,
  },
  {
    time: '5:15 PM - 6:00 PM',
    duration: '45 mins',
    title: 'Vote of Thanks & Closing Prayer',
    description:
      'Expressions of gratitude from Kinanga & Omondi, final benediction, and celebratory send-off.',
    isChurch: false,
  },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Champagne Gold',
    hex: '#D4AF37',
    textColor: '#231D16',
    description: 'Radiant champagne gold symbolizing warmth, timeless grace, and celebratory joy.',
  },
  {
    name: 'Soft Champagne Linen',
    hex: '#E8D8B5',
    textColor: '#231D16',
    description: 'Luminous pale champagne tones bringing refined softness and understated luxury.',
  },
  {
    name: 'Pure Ivory White',
    hex: '#FFFFFF',
    textColor: '#231D16',
    description: 'Crisp pure white representing purity, new beginnings, and classic bridal elegance.',
  },
  {
    name: 'Antique Gold Bronze',
    hex: '#8A6621',
    textColor: '#FFFFFF',
    description: 'Deep burnished gold accents adding depth, richness, and tailored sophistication.',
  },
];

export const INITIAL_GALLERY: GalleryPhoto[] = [];

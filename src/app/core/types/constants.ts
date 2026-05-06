import {Bid} from '../models/bid.model';
import {Sale} from '../models/sale.model';

export const PARAGRAPH_CONTENT = " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
export const ONE_DAY = 24 * 60 * 60 * 1000 * 2;

// TODO : placeholder for bidPreview
export const BIDS: Bid[] = [
  { amount: 156, slug: '', time: new Date(), user: { firstname: '', lastname: '', slug: '', image: 'pexels-eyupcan-timur-424989336-33831668.jpg', createAt: new Date()}},
  { amount: 142, slug: '', time: new Date(), user: { firstname: '', lastname: '', slug: '', image: 'pexels-jona-meza-20715718-33832556.jpg', createAt: new Date()}},
  { amount: 130, slug: '', time: new Date(), user: { firstname: '', lastname: '', slug: '', image: 'pexels-olly-5416841.JPG', createAt: new Date()}},
]

// TODO placeholder for saleCard.item.image
export const ITEM_IMG_LIST = [
  'ca2600-ui-orange.jpg',
  'eight-voice-ui.png',
  'moog-mavis_1_SYN0008306-000.png',
  'behringer-td-3-silver-_1_SYN0007292-000.png',
  'BEHRINGER+MONOPOLY.png',
  'moog-subharmonicon.jpg',
  'PROPHET-10-1.jpg',
  '2ROLAND+JUPITER+XM.jpg',
  'ju-06a_front_gal.png'
]

// TODO placeholder for featuredSale
export const FEATURED_SALE: Sale = {
  slug: 'modal-juno-1970',
  startingPrice: 120,
  currentPrice: 186,
  startAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  endAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  likes: 401,
  item: {
    name: 'Mavis Moog 1970',
    description: 'One of only 12 units ever produced, this prototype hybrid synthesizer combines a custom-wound analog filter with early digital oscillators. Never commercially released — this is a piece of synthesis history.',
    image: 'moog-mavis_1_SYN0008306-000.png',
    category: {
      slug: 'modular-semi-modular',
      label: 'Modular / Semi-modular',
    },
    isGem: true
  },
  seller: {
    firstname: 'Maeva',
    lastname: 'Sanders',
    slug: 'maeva-sanders',
    image: 'pexels-emilygarland-1499327.jpg',
    createAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  },
}

// TODO placeholder for liveBids
export const ITEMS_DB = [
  {id: 0, firstname: 'Mason', lastname: 'Ledner', image: 'pexels-ahmet-i-hsan-tezcan-2284826-19683225.jpg', bid: 'sequential-jupiter-4', amount: Math.floor(Math.random() * 80) + 100},
  {id: 1, firstname: 'Tambra', lastname: 'Ondricka', image: 'pexels-cottonbro-7760234.jpg', bid: 'e-mu-juno-60', amount: Math.floor(Math.random() * 80) + 100},
  {id: 2, firstname: 'Sharla', lastname: 'Erdman', image: 'pexels-andreza-abras-2155351373-33785316.jpg', bid: 'cherry-audio-prophet-6', amount: Math.floor(Math.random() * 80) + 100},
  {id: 3, firstname: 'Sung', lastname: 'Hartmann', image: 'pexels-caner-kokcu-636242728-19420351.jpg', bid: 'sequential-jupiter-4', amount: Math.floor(Math.random() * 80) + 100},
  {id: 4, firstname: 'Oren', lastname: 'Reilly', image: 'pexels-eyupcan-timur-424989336-33831668.jpg', bid: 'yamaha-jupiter-8', amount: Math.floor(Math.random() * 80) + 100},
  {id: 5, firstname: 'Eleonore', lastname: 'Morar', image: 'pexels-tatia-chkhartishvili-2155692957-33857219.jpg', bid: 'polyend-ob-xa', amount: Math.floor(Math.random() * 80) + 100},
]

export const SIZE_CLASSES: Record<string, string> = {
  sm: 'size-7',
  md: 'size-10',
  lg: 'size-13',
  xl: 'size-18'
};

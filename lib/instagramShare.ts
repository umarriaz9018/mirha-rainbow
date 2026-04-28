import { Product } from '@/types';

export interface InstagramShareContent {
  caption:      string;
  hashtags:     string;
  fullCaption:  string;
  storyText:    string;
  websiteLink:  string;
  whatsappLink: string;
}

const CATEGORY_HASHTAGS: Record<string, string[]> = {
  'Ceramics':     ['#ceramics','#handmadeCeramics','#ceramicArt','#pottery','#handmadePakistan','#ceramicsPakistan','#clayArt'],
  'Aviation Art': ['#aviationArt','#aviationLovers','#pilotLife','#aircraftArt','#aviationGifts','#planeArt','#aviationPakistan'],
  'Trinkets':     ['#handmadeTrinkets','#miniatureArt','#handmadeGifts','#decorativeItems','#uniqueGifts','#handcrafted'],
  'Sketching':    ['#sketching','#pencilArt','#sketchArt','#drawingArt','#portraitSketch','#handDrawn','#sketchPakistan'],
  'Painting':     ['#painting','#acrylicPainting','#watercolor','#oilPainting','#paintingArt','#artPakistan'],
  'Pottery':      ['#pottery','#handmadePottery','#wheelThrown','#potterylove','#potteryPakistan','#claywork'],
  'Plants':       ['#plants','#plantLover','#indoorPlants','#plantDecor','#handmadePlanter','#plantMom'],
  'Calligraphy':  ['#calligraphy','#arabicCalligraphy','#islamicArt','#calligraphyArt','#handlettering','#calligraphyPakistan'],
};

const UNIVERSAL_HASHTAGS = [
  '#MirhaRainbowInteriors','#handmade','#handmadePakistan','#supportLocal',
  '#pakistaniArt','#shopLocal','#artisanPakistan','#madeInPakistan',
  '#uniqueGifts','#customOrder','#giftIdeas','#homedecor','#interiordesign',
];

export function generateInstagramShare(
  product:        Product,
  siteUrl:        string,
  whatsappNumber: string
): InstagramShareContent {
  const productUrl   = `${siteUrl}/product/${product.id}`;
  const waText       = encodeURIComponent(`Hi! I saw your ${product.name} on your website and I would like to order!`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${waText}`;

  const categoryTags = CATEGORY_HASHTAGS[product.category] ?? [];
  const hashtags     = [...categoryTags, ...UNIVERSAL_HASHTAGS].slice(0, 30).join(' ');

  const orderLine =
    product.orderType === 'ready-made'    ? 'Ready to ship!'                    :
    product.orderType === 'made-to-order' ? 'Custom made just for you!'         :
    'Ready-made and custom orders available!';

  const caption = [
    product.name,
    '',
    product.description,
    '',
    orderLine,
    `Price: ${product.priceDisplay || 'DM for price'}`,
    product.deliveryTime ? `Delivery: ${product.deliveryTime}` : 'Nationwide delivery across Pakistan',
    '',
    'View and order on our website (link in bio!)',
    'WhatsApp us to order directly',
    '',
    'Delivering nationwide across Pakistan',
  ].join('\n');

  const storyText = [
    product.name,
    product.priceDisplay || 'DM for price',
    'Link in bio to order!',
    'WhatsApp for custom orders',
  ].join('\n');

  return {
    caption,
    hashtags,
    fullCaption:  `${caption}\n\n${hashtags}`,
    storyText,
    websiteLink:  productUrl,
    whatsappLink,
  };
}

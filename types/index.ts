// ================================================================
// SHARED TYPESCRIPT TYPES
// ================================================================

export type ProductCategory =
  | 'Ceramics'
  | 'Aviation Art'
  | 'Trinkets'
  | 'Sketching'
  | 'Painting'
  | 'Pottery'
  | 'Plants'
  | 'Calligraphy'
  | 'All';

export type OrderType     = 'ready-made' | 'made-to-order' | 'both';
export type ContactMethod = 'whatsapp' | 'email' | 'call';
export type OrderStatus   = 'new' | 'confirmed' | 'in-progress' | 'ready' | 'delivered' | 'cancelled';

export interface Product {
  id:                string;
  name:              string;
  category:          ProductCategory;
  price:             number | null;
  priceDisplay:      string;
  description:       string;
  shortDescription:  string;
  images:            string[];
  orderType:         OrderType;
  isAvailable:       boolean;
  isFeatured:        boolean;
  tags:              string[];
  materials?:        string;
  dimensions?:       string;
  deliveryTime?:     string;
  instagramPostUrl?: string;
}

export interface OrderFormData {
  customerName:       string;
  phone:              string;
  email:              string;
  city:               string;
  address?:           string;
  productId?:         string;
  productName?:       string;
  category:           ProductCategory | '';
  orderType:          OrderType | '';
  quantity:           string;
  customRequirements: string;
  preferredContact:   ContactMethod;
  urgency:            'flexible' | 'within-1-week' | 'within-2-weeks' | 'within-1-month';
  heardFrom:          string;
}

export interface CategoryConfig {
  name:        ProductCategory;
  emoji:       string;
  description: string;
  color:       string;
  bgColor:     string;
}

export const CATEGORIES: CategoryConfig[] = [
  { name: 'Ceramics',     emoji: '\u{1F3FA}', description: 'Handcrafted ceramic art pieces',        color: 'text-orange-700', bgColor: 'bg-orange-50'  },
  { name: 'Aviation Art', emoji: '\u2708\uFE0F',  description: 'Unique aviation-themed artwork',   color: 'text-blue-700',   bgColor: 'bg-blue-50'    },
  { name: 'Trinkets',     emoji: '\u2728',    description: 'Handmade decorative trinkets',          color: 'text-purple-700', bgColor: 'bg-purple-50'  },
  { name: 'Sketching',    emoji: '\u270F\uFE0F',  description: 'Original pencil & ink sketches',   color: 'text-gray-700',   bgColor: 'bg-gray-50'    },
  { name: 'Painting',     emoji: '\u{1F3A8}', description: 'Acrylic, watercolor & oil paintings',   color: 'text-red-700',    bgColor: 'bg-red-50'     },
  { name: 'Pottery',      emoji: '\u{1FAD9}', description: 'Wheel-thrown & hand-built pottery',     color: 'text-amber-700',  bgColor: 'bg-amber-50'   },
  { name: 'Plants',       emoji: '\u{1F33F}', description: 'Planters, terrariums & plant decor',    color: 'text-green-700',  bgColor: 'bg-green-50'   },
  { name: 'Calligraphy',  emoji: '\u{1F58B}\uFE0F', description: 'Arabic & English calligraphy',  color: 'text-indigo-700', bgColor: 'bg-indigo-50'  },
];

export const PAKISTAN_CITIES: string[] = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan',  'Peshawar', 'Quetta',  'Sialkot',   'Gujranwala',
  'Hyderabad', 'Abbottabad', 'Murree', 'Other',
];

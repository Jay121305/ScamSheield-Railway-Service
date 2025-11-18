import { IRCTC_MENU_PRICES, TRAIN_SCHEDULES } from '../constants.js';

const CATEGORY_PATTERNS = [
  {
    category: 'Overpricing',
    patterns: [
      /overcharg/i,
      /charged?\s+(?:rs|inr|₹)?\s*\d+\s*(?:extra|more)/i,
      /price\s+(?:was\s+)?(?:too|very|extremely)\s+high/i,
      /mrp/i,
    ],
  },
  {
    category: 'Quality Issue',
    patterns: [
      /stale|spoiled|sour|soggy|cold|uncooked|burnt|raw/i,
      /poor\s+quality/i,
      /tast(?:e|ed)\s+(?:bad|awful|strange)/i,
    ],
  },
  {
    category: 'Hygiene Concern',
    patterns: [
      /dirty|unclean|smelly|smell/i,
      /flies|cockroach|insect|worm/i,
      /hygiene/i,
      /contaminat/i,
    ],
  },
];

const KNOWN_ITEMS = [
  'water bottle',
  'veg thali',
  'non veg thali',
  'biryani',
  'fried rice',
  'paneer curry',
  'chicken curry',
  'samosa',
  'puff',
  'tea',
  'coffee',
  'sandwich',
  'burger',
  'cutlet',
  'poha',
  'idli',
  'dosa',
  'vada',
  'upma',
  'noodles',
  'juice',
  'lassi',
];

const CATEGORY_DESCRIPTIONS = {
  Overpricing: 'an overpricing issue',
  'Quality Issue': 'a quality problem',
  'Hygiene Concern': 'a hygiene concern',
  Other: 'an onboard issue',
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const titleCase = (value) => value.replace(/\w+/g, (segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase());

const detectCategory = (text) => {
  for (const { category, patterns } of CATEGORY_PATTERNS) {
    if (patterns.some((pattern) => pattern.test(text))) {
      return category;
    }
  }
  return 'Other';
};

const extractPrice = (text) => {
  const pricePattern = /(?:₹|rs\.?|inr)\s*(\d+(?:\.\d+)?)/i;
  const fallbackPattern = /(\d+(?:\.\d+)?)\s*(?:rupees|bucks)/i;
  const match = text.match(pricePattern) || text.match(fallbackPattern);
  if (!match) return undefined;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const extractItem = (text) => {
  const lower = text.toLowerCase();
  const match = KNOWN_ITEMS.find((item) => lower.includes(item));
  return match ? titleCase(match) : undefined;
};

const cleanEntity = (value) => value.replace(/[.,!?:;]+$/g, '').trim();

const extractVendor = (text) => {
  const vendorPatterns = [
    /(?:vendor|stall|kiosk|seller|shop|counter|pantry\s+car)\s+(?:named|called)?\s*([A-Z][A-Za-z&'\- ]{2,})/,
    /from\s+([A-Z][A-Za-z&'\- ]{2,})\s+(?:vendor|stall|kiosk|counter)/,
    /at\s+([A-Z][A-Za-z&'\- ]{2,})\s+(?:stall|counter|kiosk|canteen)/,
  ];

  for (const pattern of vendorPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return cleanEntity(match[1]);
    }
  }
  return undefined;
};

const buildSummary = (description, category, itemName, vendorName, price) => {
  const subjectParts = [];
  if (vendorName) subjectParts.push(vendorName);
  if (itemName) subjectParts.push(itemName.toLowerCase().includes('thali') ? itemName : itemName.toLowerCase());
  const subject = subjectParts.length ? ` with ${subjectParts.join(' serving ')}` : '';
  const priceSuffix = typeof price === 'number' ? `, charged ₹${price}` : '';
  const detail = description.length > 160 ? `${description.slice(0, 157).trim()}...` : description;
  return `Passenger reports ${CATEGORY_DESCRIPTIONS[category]}${subject}${priceSuffix}. ${detail}`;
};

// Validate train number and get train info
const validateTrain = (trainNumber) => {
  if (!trainNumber) return null;
  
  const trainNum = trainNumber.toString().trim();
  const trainInfo = TRAIN_SCHEDULES[trainNum];
  
  if (trainInfo) {
    return {
      valid: true,
      ...trainInfo,
      number: trainNum
    };
  }
  
  return {
    valid: false,
    number: trainNum,
    name: 'Unknown Train',
    pantryAvailable: null
  };
};

// Lookup official IRCTC price for item
const lookupIRCTCPrice = (itemName) => {
  if (!itemName) return null;
  
  const lowerItem = itemName.toLowerCase();
  
  // Search through all categories
  for (const category in IRCTC_MENU_PRICES) {
    if (IRCTC_MENU_PRICES[category][lowerItem]) {
      return IRCTC_MENU_PRICES[category][lowerItem];
    }
  }
  
  // Try partial match
  for (const category in IRCTC_MENU_PRICES) {
    for (const key in IRCTC_MENU_PRICES[category]) {
      if (lowerItem.includes(key) || key.includes(lowerItem)) {
        return IRCTC_MENU_PRICES[category][key];
      }
    }
  }
  
  return null;
};

export const analyzeComplaintDescription = async (description, trainNumber = null, suggestedItem = null) => {
  const trimmed = description.trim();
  if (!trimmed) {
    return {
      summary: 'Passenger reports an onboard issue.',
      entities: {},
      category: 'Other',
    };
  }

  const category = detectCategory(trimmed.toLowerCase());
  const itemName = extractItem(trimmed) || suggestedItem;
  const vendorName = extractVendor(trimmed);
  const price = extractPrice(trimmed);

  const entities = {};
  if (itemName) entities.itemName = itemName;
  if (vendorName) entities.vendorName = vendorName;
  if (typeof price === 'number') entities.price = price;

  // Validate train if provided
  let trainInfo = null;
  if (trainNumber) {
    trainInfo = validateTrain(trainNumber);
    entities.trainInfo = trainInfo;
  }
  
  // Lookup official IRCTC price
  let irctcPrice = null;
  if (itemName) {
    irctcPrice = lookupIRCTCPrice(itemName);
    if (irctcPrice) {
      entities.irctcPrice = irctcPrice.price;
      entities.irctcPriceDetails = irctcPrice;
    }
  }

  const summary = buildSummary(trimmed, category, itemName, vendorName, price);

  await delay(400 + Math.random() * 200);

  return {
    summary,
    entities,
    category,
    trainInfo,
    irctcPrice: irctcPrice ? irctcPrice.price : null,
    irctcPriceDetails: irctcPrice
  };
};

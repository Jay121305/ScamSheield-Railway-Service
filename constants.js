// IRCTC Official Menu Pricing (2024-2025)
export const IRCTC_MENU_PRICES = {
  beverages: {
    tea: { price: 10, item: 'Tea', category: 'Beverage' },
    coffee: { price: 15, item: 'Coffee', category: 'Beverage' },
    'cold drink': { price: 20, item: 'Cold Drink', category: 'Beverage' },
    water: { price: 15, item: 'Water Bottle (1L)', category: 'Beverage' },
    'mineral water': { price: 15, item: 'Mineral Water', category: 'Beverage' },
    'water bottle': { price: 15, item: 'Water Bottle', category: 'Beverage' },
    juice: { price: 30, item: 'Packaged Juice', category: 'Beverage' }
  },
  snacks: {
    samosa: { price: 15, item: 'Samosa (2 pcs)', category: 'Snack' },
    'vada pav': { price: 20, item: 'Vada Pav', category: 'Snack' },
    pakora: { price: 25, item: 'Pakora', category: 'Snack' },
    sandwich: { price: 40, item: 'Veg Sandwich', category: 'Snack' },
    'veg sandwich': { price: 40, item: 'Veg Sandwich', category: 'Snack' },
    burger: { price: 50, item: 'Veg Burger', category: 'Snack' },
    chips: { price: 10, item: 'Chips', category: 'Snack' },
    biscuits: { price: 10, item: 'Biscuits', category: 'Snack' }
  },
  meals: {
    thali: { price: 120, item: 'Veg Thali', category: 'Meal' },
    'veg thali': { price: 120, item: 'Veg Thali', category: 'Meal' },
    'non-veg thali': { price: 150, item: 'Non-Veg Thali', category: 'Meal' },
    'non veg thali': { price: 150, item: 'Non-Veg Thali', category: 'Meal' },
    biryani: { price: 100, item: 'Veg Biryani', category: 'Meal' },
    'chicken biryani': { price: 140, item: 'Chicken Biryani', category: 'Meal' },
    'veg biryani': { price: 100, item: 'Veg Biryani', category: 'Meal' },
    'fried rice': { price: 80, item: 'Fried Rice', category: 'Meal' },
    paratha: { price: 30, item: 'Paratha (2 pcs)', category: 'Meal' }
  },
  breakfast: {
    idli: { price: 40, item: 'Idli (4 pcs)', category: 'Breakfast' },
    dosa: { price: 50, item: 'Dosa', category: 'Breakfast' },
    upma: { price: 35, item: 'Upma', category: 'Breakfast' },
    poha: { price: 30, item: 'Poha', category: 'Breakfast' }
  }
};

// Major Indian Railway Train Schedules
export const TRAIN_SCHEDULES = {
  '12951': {
    name: 'Mumbai Rajdhani',
    route: 'Mumbai Central - New Delhi',
    type: 'Rajdhani',
    pantryAvailable: true,
    mealIncluded: true,
    stops: ['Mumbai Central', 'Vadodara', 'Ratlam', 'Kota', 'New Delhi']
  },
  '12301': {
    name: 'Kolkata Rajdhani',
    route: 'Howrah - New Delhi',
    type: 'Rajdhani',
    pantryAvailable: true,
    mealIncluded: true,
    stops: ['Howrah', 'Patna', 'Mughalsarai', 'Kanpur', 'New Delhi']
  },
  '22439': {
    name: 'Vande Bharat Express',
    route: 'New Delhi - Varanasi',
    type: 'Vande Bharat',
    pantryAvailable: true,
    mealIncluded: true,
    stops: ['New Delhi', 'Kanpur', 'Prayagraj', 'Varanasi']
  },
  '12138': {
    name: 'Punjab Mail',
    route: 'Mumbai CST - Firozpur',
    type: 'Mail/Express',
    pantryAvailable: true,
    mealIncluded: false,
    stops: ['Mumbai CST', 'Surat', 'Vadodara', 'Ahmedabad', 'Firozpur']
  },
  '12002': {
    name: 'Bhopal Shatabdi',
    route: 'New Delhi - Bhopal',
    type: 'Shatabdi',
    pantryAvailable: true,
    mealIncluded: true,
    stops: ['New Delhi', 'Agra', 'Gwalior', 'Bhopal']
  },
  '12009': {
    name: 'Shatabdi Express',
    route: 'Mumbai Central - Ahmedabad',
    type: 'Shatabdi',
    pantryAvailable: true,
    mealIncluded: true,
    stops: ['Mumbai Central', 'Surat', 'Vadodara', 'Ahmedabad']
  },
  '12626': {
    name: 'Kerala Express',
    route: 'New Delhi - Trivandrum',
    type: 'Mail/Express',
    pantryAvailable: true,
    mealIncluded: false,
    stops: ['New Delhi', 'Vadodara', 'Mumbai', 'Goa', 'Mangalore', 'Trivandrum']
  },
  '12430': {
    name: 'Lucknow AC SF',
    route: 'New Delhi - Lucknow',
    type: 'Superfast',
    pantryAvailable: true,
    mealIncluded: false,
    stops: ['New Delhi', 'Ghaziabad', 'Moradabad', 'Bareilly', 'Lucknow']
  }
};

// Community Validation Thresholds
export const VALIDATION_THRESHOLDS = {
  VERIFIED: 10, // 10+ net upvotes = Verified complaint
  ESCALATED: 25, // 25+ net upvotes = Auto-escalated
  DISPUTED: -5, // -5 net votes = Disputed/questionable
  TRUSTED_USER: 50, // Users with 50+ validated reports get trusted status
  MODERATOR_REVIEW: 100 // 100+ upvotes trigger moderator review
};

// Validation Badges
export const VALIDATION_BADGES = {
  VERIFIED: { label: 'Community Verified', icon: '✓', color: 'green' },
  DISPUTED: { label: 'Disputed', icon: '?', color: 'orange' },
  TRENDING: { label: 'Trending', icon: '🔥', color: 'red' },
  TRUSTED_REPORTER: { label: 'Trusted Reporter', icon: '⭐', color: 'blue' }
};

export const sampleUsers = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'passenger' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', role: 'passenger' },
  { id: 3, name: 'Amit Singh', email: 'amit@example.com', role: 'passenger' },
  { id: 100, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
];

export const sampleComplaints = [
  {
    id: 1,
    ticketId: 'SCAM-2024-000001',
    user: { id: 1, name: 'Rajesh Kumar' },
    trainNo: '12138',
    vendorName: 'Punjab Mail Pantry',
    itemName: 'Water Bottle',
    reportedPrice: 20,
    mrp: 15,
    description:
      'Charged Rs. 20 for a water bottle with an MRP of Rs. 15. The vendor refused to provide a bill.',
    evidenceUrl: 'https://picsum.photos/seed/rail1/400/300',
    status: 'Resolved',
    timestamp: '2024-07-20T10:30:00Z',
    geolocation: { lat: 28.6139, lng: 77.209 },
    upvotes: 15,
    downvotes: 1,
    history: [
      { status: 'Filed', timestamp: '2024-07-20T10:30:00Z' },
      { status: 'Validated', timestamp: '2024-07-20T12:00:00Z', notes: 'Verified by admin.' },
      { status: 'Escalated', timestamp: '2024-07-20T12:05:00Z', notes: 'Sent to IRCTC.' },
      {
        status: 'Resolved',
        timestamp: '2024-07-21T09:00:00Z',
        notes: 'Refund processed. Vendor warned.',
      },
    ],
    comments: [
      {
        id: 1,
        user: { id: 2, name: 'Priya Sharma' },
        text: 'Same thing happened to me on this train!',
        timestamp: '2024-07-20T11:00:00Z',
      },
    ],
  },
  {
    id: 2,
    ticketId: 'SCAM-2024-000002',
    user: { id: 2, name: 'Priya Sharma' },
    trainNo: '22439',
    vendorName: 'Vande Bharat Express Catering',
    itemName: 'Veg Sandwich',
    reportedPrice: 150,
    mrp: 90,
    description: 'The sandwich was stale and cold. The price was exorbitant for the quality provided.',
    status: 'Escalated',
    timestamp: '2024-07-21T14:00:00Z',
    upvotes: 25,
    downvotes: 0,
    history: [
      { status: 'Filed', timestamp: '2024-07-21T14:00:00Z' },
      { status: 'Validated', timestamp: '2024-07-21T18:00:00Z', notes: 'Multiple similar reports.' },
      { status: 'Escalated', timestamp: '2024-07-21T18:05:00Z', notes: 'Forwarded to Zonal office.' },
    ],
    comments: [],
  },
  {
    id: 3,
    ticketId: 'SCAM-2024-000003',
    user: { id: 3, name: 'Amit Singh' },
    trainNo: '12951',
    vendorName: 'Rajdhani Express Pantry',
    itemName: 'Tea',
    reportedPrice: 20,
    mrp: 10,
    description: 'Overpriced tea, and the vendor was rude when I asked for the menu card.',
    status: 'Filed',
    timestamp: '2024-07-22T08:15:00Z',
    geolocation: { lat: 22.5726, lng: 88.3639 },
    upvotes: 5,
    downvotes: 2,
    history: [{ status: 'Filed', timestamp: '2024-07-22T08:15:00Z' }],
    comments: [],
  },
];

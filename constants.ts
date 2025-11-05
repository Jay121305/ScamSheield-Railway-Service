import type { Complaint, User } from './types';

export const sampleUsers: User[] = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'passenger' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', role: 'passenger' },
  { id: 3, name: 'Amit Singh', email: 'amit@example.com', role: 'passenger' },
  { id: 100, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
];


export const sampleComplaints: Complaint[] = [
  {
    id: 1,
    ticketId: 'SCAM-2024-000001',
    user: { id: 1, name: 'Rajesh Kumar' },
    trainNo: '12138',
    vendorName: 'Punjab Mail Pantry',
    itemName: 'Water Bottle',
    reportedPrice: 20,
    mrp: 15,
    description: 'Charged Rs. 20 for a water bottle with an MRP of Rs. 15. The vendor refused to provide a bill.',
    evidenceUrl: 'https://picsum.photos/seed/rail1/400/300',
    status: 'Resolved',
    timestamp: '2024-07-20T10:30:00Z',
    geolocation: { lat: 28.6139, lng: 77.2090 },
    upvotes: 15,
    downvotes: 1,
    history: [
      { status: 'Filed', timestamp: '2024-07-20T10:30:00Z' },
      { status: 'Validated', timestamp: '2024-07-20T12:00:00Z', notes: 'Verified by admin.' },
      { status: 'Escalated', timestamp: '2024-07-20T12:05:00Z', notes: 'Sent to IRCTC.' },
      { status: 'Resolved', timestamp: '2024-07-21T09:00:00Z', notes: 'Refund processed. Vendor warned.' },
    ],
    comments: [
      { id: 1, user: { id: 2, name: 'Priya Sharma'}, text: 'Same thing happened to me on this train!', timestamp: '2024-07-20T11:00:00Z'},
    ]
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
    comments: []
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
    history: [
      { status: 'Filed', timestamp: '2024-07-22T08:15:00Z' },
    ],
    comments: []
  },
];
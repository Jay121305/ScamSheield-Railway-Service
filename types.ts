export type ComplaintStatus = 'Filed' | 'Validated' | 'Escalated' | 'In Investigation' | 'Resolved' | 'Closed' | 'Rejected';

export type UserRole = 'passenger' | 'admin' | 'vendor' | 'railway_officer' | 'inspector';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface ComplaintHistory {
  status: ComplaintStatus;
  timestamp: string;
  notes?: string;
}

export interface Comment {
  id: number;
  user: {
    id: number;
    name:string;
  };
  text: string;
  timestamp: string;
}

export interface Complaint {
  id: number;
  ticketId: string;
  user: {
    id: number;
    name: string;
  };
  trainNo: string;
  vendorName: string;
  itemName: string;
  reportedPrice: number;
  mrp?: number;
  description: string;
  evidenceUrl?: string;
  status: ComplaintStatus;
  timestamp: string;
  geolocation?: {
    lat: number;
    lng: number;
  };
  upvotes: number;
  downvotes: number;
  history: ComplaintHistory[];
  comments: Comment[];
}

export type NewComplaint = Omit<Complaint, 'id' | 'ticketId' | 'status' | 'timestamp' | 'user' | 'upvotes' | 'downvotes' | 'history' | 'comments'>;


export interface AiAnalysis {
  summary: string;
  entities: {
    itemName?: string;
    vendorName?: string;
    price?: number;
  };
  category: 'Overpricing' | 'Quality Issue' | 'Hygiene Concern' | 'Other';
}

export type View = 'list' | 'form' | 'detail' | 'dashboard';

export type SortOption = 'date' | 'votes' | 'overcharge';
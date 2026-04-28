export type JobStatus =
  | "pending"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

export type JobPriority = "low" | "medium" | "high" | "urgent";

export interface Job {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  priority: JobPriority;
  customerId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  technicianId?: string;
  technicianName?: string;
  scheduledAt?: string;
  completedAt?: string;
  estimatedDuration: number; // minutes
  amount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "available" | "busy" | "offline";
  specializations: string[];
  activeJobs: number;
  completedJobs: number;
  rating: number;
  location?: { lat: number; lng: number };
  avatarUrl?: string;
}

export interface Invoice {
  id: string;
  jobId: string;
  customerId: string;
  customerName: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  amount: number;
  tax: number;
  total: number;
  dueDate: string;
  issuedDate: string;
  paidAt?: string;
  lineItems: LineItem[];
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  jobId?: string;
  customerId: string;
  customerName: string;
  status: "draft" | "sent" | "accepted" | "declined" | "expired";
  amount: number;
  tax: number;
  total: number;
  validUntil: string;
  createdAt: string;
  lineItems: LineItem[];
  notes?: string;
}

export interface Call {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  type: "inbound" | "outbound";
  status: "missed" | "answered" | "voicemail";
  duration?: number; // seconds
  jobId?: string;
  recordingUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  completedToday: number;
  revenue: number;
  revenueChange: number;
  technicianCount: number;
  availableTechnicians: number;
  pendingQuotes: number;
  overdueInvoices: number;
}

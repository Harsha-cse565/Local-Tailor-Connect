export type Role = 'guest' | 'customer' | 'tailor' | 'admin';

export type OrderStage = 
  | 'Request Submitted'
  | 'Measurement Confirmed'
  | 'Quote Sent'
  | 'Cutting'
  | 'Stitching'
  | 'Alteration'
  | 'Ready for Pickup'
  | 'Completed';

export interface ServiceItem {
  name: string;
  startingPrice: number;
  estimatedTime: string;
  description?: string;
  category: 'Women' | 'Men' | 'Kids' | 'Alteration' | 'Bridal';
}

export interface Review {
  id: string;
  customerName: string;
  customerLocation?: string;
  rating: number;
  categories: {
    stitchingQuality: number;
    fitting: number;
    deliveryTime: number;
    communication: number;
    valueForMoney: number;
  };
  comment: string;
  date: string;
  garment: string;
  tailorId: string;
}

export interface Tailor {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  city: string;
  state: string;
  pincode: string;
  address: string;
  yearsOfExperience: number;
  specializations: string[];
  startingPrice: number;
  availableToday: boolean;
  homePickupAvailable: boolean;
  deliveryAvailable: boolean;
  workingHours: string;
  about: string;
  avatarUrl: string;
  shopImageUrl: string;
  portfolioImages: {
    url: string;
    title: string;
    category: string;
  }[];
  services: ServiceItem[];
  verificationStatus: 'verified' | 'pending' | 'rejected';
  ordersCompleted: number;
  latitude?: number;
  longitude?: number;
}

export interface MeasurementProfile {
  id: string;
  title: string;
  category: 'Blouse' | 'Kurti' | 'Saree/Choli' | 'Men Shirt' | 'Men Pant' | 'General';
  bust?: number;
  waist?: number;
  hip?: number;
  shoulder?: number;
  sleeveLength?: number;
  blouseLength?: number;
  armhole?: number;
  frontNeckDepth?: number;
  backNeckDepth?: number;
  chest?: number;
  inseam?: number;
  shirtLength?: number;
  pantLength?: number;
  notes?: string;
  updatedAt: string;
}

export interface Quotation {
  id: string;
  orderId: string;
  baseStitching: number;
  designCharges: number;
  materialCharges: number;
  alterationCharges: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Accepted' | 'Declined';
  notes?: string;
  createdAt: string;
}

export interface Order {
  id: string; // e.g. LTC-10482
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  tailorId: string;
  tailorName: string;
  tailorPhone: string;
  tailorAddress: string;
  serviceType: 'New Clothing' | 'Alteration' | 'Repair' | 'Custom Design';
  garment: string; // Blouse, Saree, Shirt, Pant, Kurti, Salwar, Lehenga, Dress, Suit
  requirements: string;
  referenceImages: string[];
  measurementsSummary: string;
  deliveryOption: 'Pickup from tailor' | 'Home delivery' | 'Customer pickup';
  deliveryAddress?: string;
  status: OrderStage;
  currentStageIndex: number; // 0 to 7
  history: {
    stage: OrderStage;
    timestamp: string;
    note?: string;
  }[];
  estimatedCompletion: string;
  orderDate: string;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Deposit Paid';
  paymentMethod?: string;
  quotation?: Quotation;
  review?: Review;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  tailorId: string;
  tailorName: string;
  tailorAddress: string;
  type: 'Measurement' | 'Consultation' | 'Fitting' | 'Pickup';
  date: string;
  timeSlot: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface ChatMessage {
  id: string;
  orderId?: string;
  senderId: string;
  senderRole: 'customer' | 'tailor';
  senderName: string;
  text: string;
  timestamp: string;
  imageUrl?: string;
  read: boolean;
}

export interface NotificationItem {
  id: string;
  recipientRole: 'customer' | 'tailor' | 'admin';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'quote' | 'appointment' | 'payment' | 'verification';
  orderId?: string;
}

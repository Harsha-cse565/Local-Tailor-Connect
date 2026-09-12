import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  Tailor,
  Order,
  MeasurementProfile,
  Appointment,
  ChatMessage,
  NotificationItem,
  Review,
  OrderStage,
  Quotation
} from '../types';
import {
  INITIAL_TAILORS,
  INITIAL_ORDERS,
  INITIAL_MEASUREMENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_REVIEWS
} from '../data/mockData';

export type NavigationPage = 
  | 'landing'
  | 'find-tailors'
  | 'tailor-profile'
  | 'request-service'
  | 'smart-match'
  | 'track-order'
  | 'customer-dashboard'
  | 'tailor-dashboard'
  | 'admin-dashboard'
  | 'measurements'
  | 'appointments'
  | 'messages'
  | 'order-history'
  | 'payment'
  | 'login-customer'
  | 'login-tailor'
  | 'register-tailor'
  | 'register-customer'
  | 'how-it-works'
  | 'about';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  selectedTailorId: string | null;
  setSelectedTailorId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  
  // Data State
  tailors: Tailor[];
  orders: Order[];
  measurements: MeasurementProfile[];
  appointments: Appointment[];
  messages: ChatMessage[];
  notifications: NotificationItem[];
  reviews: Review[];

  // User & Location
  currentUser: {
    name: string;
    email: string;
    phone: string;
    city: string;
    pincode: string;
  };
  currentTailor: Tailor;
  userLocation: string;
  setUserLocation: (loc: string) => void;
  pincode: string;
  setPincode: (pin: string) => void;

  // Search/Filter State
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedServiceFilter: string;
  setSelectedServiceFilter: (s: string) => void;

  // Actions
  navigateToTailorProfile: (tailorId: string) => void;
  navigateToTrackOrder: (orderId: string) => void;
  navigateToRequestService: (tailorId?: string, garment?: string) => void;
  navigateToPayment: (orderId: string) => void;
  
  // Mutations
  createOrder: (orderData: Partial<Order>) => string;
  updateOrderStatus: (orderId: string, newStage: OrderStage, note?: string) => void;
  sendQuotation: (orderId: string, quote: Omit<Quotation, 'id' | 'orderId' | 'status' | 'createdAt'>) => void;
  respondToQuotation: (orderId: string, accept: boolean) => void;
  bookAppointment: (aptData: Omit<Appointment, 'id' | 'status'>) => void;
  sendMessage: (text: string, orderId?: string, imageUrl?: string) => void;
  saveMeasurement: (meas: Omit<MeasurementProfile, 'id' | 'updatedAt'>, existingId?: string) => void;
  deleteMeasurement: (id: string) => void;
  submitReview: (orderId: string, tailorId: string, reviewData: Omit<Review, 'id' | 'tailorId' | 'date'>) => void;
  processPayment: (orderId: string, method: string) => void;
  registerTailor: (tailorData: Partial<Tailor>) => void;
  verifyTailor: (tailorId: string, status: 'verified' | 'rejected') => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Feedback
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence state
  const [role, setRoleState] = useState<Role>(() => {
    return (localStorage.getItem('ltc_role') as Role) || 'customer';
  });

  const [currentPage, setCurrentPageState] = useState<NavigationPage>(() => {
    return (localStorage.getItem('ltc_page') as NavigationPage) || 'landing';
  });

  const [selectedTailorId, setSelectedTailorId] = useState<string | null>('tailor-1');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('LTC-10482');
  const [userLocation, setUserLocation] = useState<string>('Pudukkottai');
  const [pincode, setPincode] = useState<string>('622001');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>('All');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Core Data
  const [tailors, setTailors] = useState<Tailor[]>(() => {
    const saved = localStorage.getItem('ltc_tailors');
    return saved ? JSON.parse(saved) : INITIAL_TAILORS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ltc_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [measurements, setMeasurements] = useState<MeasurementProfile[]>(() => {
    const saved = localStorage.getItem('ltc_measurements');
    return saved ? JSON.parse(saved) : INITIAL_MEASUREMENTS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('ltc_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('ltc_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('ltc_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('ltc_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('ltc_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('ltc_page', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('ltc_tailors', JSON.stringify(tailors));
  }, [tailors]);

  useEffect(() => {
    localStorage.setItem('ltc_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ltc_measurements', JSON.stringify(measurements));
  }, [measurements]);

  useEffect(() => {
    localStorage.setItem('ltc_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('ltc_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('ltc_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ltc_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole === 'customer') {
      setCurrentPageState('customer-dashboard');
      showToast('Switched to Customer view (Priya Sharma)', 'info');
    } else if (newRole === 'tailor') {
      setCurrentPageState('tailor-dashboard');
      showToast('Switched to Tailor view (Lakshmi Stitching Studio)', 'info');
    } else if (newRole === 'admin') {
      setCurrentPageState('admin-dashboard');
      showToast('Switched to Platform Admin view', 'info');
    } else {
      setCurrentPageState('landing');
    }
  };

  const setCurrentPage = (page: NavigationPage) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTailorProfile = (tailorId: string) => {
    setSelectedTailorId(tailorId);
    setCurrentPage('tailor-profile');
  };

  const navigateToTrackOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentPage('track-order');
  };

  const navigateToRequestService = (tailorId?: string, garment?: string) => {
    if (tailorId) setSelectedTailorId(tailorId);
    if (garment) setSearchQuery(garment);
    setCurrentPage('request-service');
  };

  const navigateToPayment = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentPage('payment');
  };

  // Helper Users
  const currentUser = {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98401 23456',
    city: userLocation,
    pincode: pincode
  };

  const currentTailor = tailors.find(t => t.id === 'tailor-1') || tailors[0];

  // Actions
  const createOrder = (orderData: Partial<Order>): string => {
    const newId = `LTC-${Math.floor(10000 + Math.random() * 90000)}`;
    const targetTailor = tailors.find(t => t.id === (orderData.tailorId || 'tailor-1')) || tailors[0];

    const newOrder: Order = {
      id: newId,
      customerId: 'cust-1',
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      customerCity: currentUser.city,
      tailorId: targetTailor.id,
      tailorName: targetTailor.name,
      tailorPhone: targetTailor.phone,
      tailorAddress: targetTailor.address,
      serviceType: orderData.serviceType || 'New Clothing',
      garment: orderData.garment || 'Blouse',
      requirements: orderData.requirements || 'Custom stitching as discussed',
      referenceImages: orderData.referenceImages || [
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'
      ],
      measurementsSummary: orderData.measurementsSummary || 'Standard Measurements',
      deliveryOption: orderData.deliveryOption || 'Home delivery',
      deliveryAddress: orderData.deliveryAddress || 'Gandhi Nagar, Pudukkottai',
      status: 'Request Submitted',
      currentStageIndex: 0,
      history: [
        {
          stage: 'Request Submitted',
          timestamp: 'Just now',
          note: 'Request received and sent to tailor for review'
        }
      ],
      estimatedCompletion: orderData.estimatedCompletion || '18 September 2026',
      orderDate: 'Today',
      amount: orderData.amount || 650,
      paymentStatus: 'Pending'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Create notifications for both sides
    const tailorNotif: NotificationItem = {
      id: `notif-${Date.now()}-1`,
      recipientRole: 'tailor',
      title: 'New Service Request',
      message: `${currentUser.name} submitted a new request for ${newOrder.garment} Stitching (#${newId}).`,
      timestamp: 'Just now',
      read: false,
      type: 'order',
      orderId: newId
    };

    const custNotif: NotificationItem = {
      id: `notif-${Date.now()}-2`,
      recipientRole: 'customer',
      title: 'Order Submitted',
      message: `Your request #${newId} has been sent to ${targetTailor.name}.`,
      timestamp: 'Just now',
      read: false,
      type: 'order',
      orderId: newId
    };

    setNotifications(prev => [tailorNotif, custNotif, ...prev]);
    showToast(`Order #${newId} created successfully!`, 'success');
    setSelectedOrderId(newId);
    return newId;
  };

  const STAGES: OrderStage[] = [
    'Request Submitted',
    'Measurement Confirmed',
    'Quote Sent',
    'Cutting',
    'Stitching',
    'Alteration',
    'Ready for Pickup',
    'Completed'
  ];

  const updateOrderStatus = (orderId: string, newStage: OrderStage, note?: string) => {
    const stageIndex = STAGES.indexOf(newStage);
    const nowStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });

    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: newStage,
            currentStageIndex: stageIndex,
            history: [
              ...o.history,
              {
                stage: newStage,
                timestamp: nowStr,
                note: note || `Order moved to ${newStage}`
              }
            ]
          };
        }
        return o;
      })
    );

    // Push notification to customer
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientRole: 'customer',
      title: 'Order Update',
      message: `Your order #${orderId} has moved to ${newStage}.`,
      timestamp: 'Just now',
      read: false,
      type: 'order',
      orderId: orderId
    };

    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Order #${orderId} moved to ${newStage}`, 'info');
  };

  const sendQuotation = (
    orderId: string,
    quote: Omit<Quotation, 'id' | 'orderId' | 'status' | 'createdAt'>
  ) => {
    const quotationId = `QT-${Math.floor(2000 + Math.random() * 8000)}`;
    const fullQuote: Quotation = {
      ...quote,
      id: quotationId,
      orderId,
      status: 'Pending',
      createdAt: 'Today'
    };

    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            quotation: fullQuote,
            amount: quote.total,
            status: 'Quote Sent',
            currentStageIndex: 2,
            history: [
              ...o.history,
              {
                stage: 'Quote Sent',
                timestamp: 'Just now',
                note: `Quotation #${quotationId} sent for ₹${quote.total}`
              }
            ]
          };
        }
        return o;
      })
    );

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        recipientRole: 'customer',
        title: 'Quotation Received',
        message: `You received a digital quotation of ₹${quote.total} for Order #${orderId}.`,
        timestamp: 'Just now',
        read: false,
        type: 'quote',
        orderId
      },
      ...prev
    ]);

    showToast(`Quotation #${quotationId} sent to customer!`, 'success');
  };

  const respondToQuotation = (orderId: string, accept: boolean) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId && o.quotation) {
          const updatedQuote: Quotation = {
            ...o.quotation,
            status: accept ? 'Accepted' : 'Declined'
          };
          return {
            ...o,
            quotation: updatedQuote,
            status: accept ? 'Cutting' : 'Request Submitted',
            currentStageIndex: accept ? 3 : 0,
            history: [
              ...o.history,
              {
                stage: accept ? 'Cutting' : 'Request Submitted',
                timestamp: 'Just now',
                note: accept
                  ? `Customer accepted quotation for ₹${o.quotation.total}. Work starting.`
                  : 'Customer declined quotation.'
              }
            ]
          };
        }
        return o;
      })
    );

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        recipientRole: 'tailor',
        title: accept ? 'Quote Accepted!' : 'Quote Declined',
        message: `Customer ${accept ? 'accepted' : 'declined'} the quotation for order #${orderId}.`,
        timestamp: 'Just now',
        read: false,
        type: 'quote',
        orderId
      },
      ...prev
    ]);

    showToast(
      accept ? 'Quotation accepted! Proceeding to cutting.' : 'Quotation declined.',
      accept ? 'success' : 'info'
    );
  };

  const bookAppointment = (aptData: Omit<Appointment, 'id' | 'status'>) => {
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      status: 'Confirmed'
    };

    setAppointments(prev => [newApt, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        recipientRole: 'customer',
        title: 'Appointment Confirmed',
        message: `${newApt.type} appointment booked with ${newApt.tailorName} on ${newApt.date} at ${newApt.timeSlot}.`,
        timestamp: 'Just now',
        read: false,
        type: 'appointment'
      },
      ...prev
    ]);

    showToast(`Appointment confirmed for ${newApt.date} at ${newApt.timeSlot}!`, 'success');
  };

  const sendMessage = (text: string, orderId?: string, imageUrl?: string) => {
    const isCustomer = role === 'customer' || role === 'guest';
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      orderId: orderId || selectedOrderId || 'LTC-10482',
      senderId: isCustomer ? 'cust-1' : 'tailor-1',
      senderRole: isCustomer ? 'customer' : 'tailor',
      senderName: isCustomer ? currentUser.name : currentTailor.name,
      text,
      timestamp: 'Just now',
      imageUrl,
      read: true
    };

    setMessages(prev => [...prev, newMsg]);

    // Optional simulated reply after 1.5s if customer sends message
    if (isCustomer) {
      setTimeout(() => {
        const replyMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          orderId: newMsg.orderId,
          senderId: 'tailor-1',
          senderRole: 'tailor',
          senderName: currentTailor.name,
          text: `Thank you Priya! I have noted your update. We're on track for your perfect fit.`,
          timestamp: 'Just now',
          read: false
        };
        setMessages(prev => [...prev, replyMsg]);
      }, 1500);
    }
  };

  const saveMeasurement = (
    meas: Omit<MeasurementProfile, 'id' | 'updatedAt'>,
    existingId?: string
  ) => {
    const nowStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    if (existingId) {
      setMeasurements(prev =>
        prev.map(m => (m.id === existingId ? { ...meas, id: existingId, updatedAt: nowStr } : m))
      );
      showToast('Measurement profile updated successfully!', 'success');
    } else {
      const newProfile: MeasurementProfile = {
        ...meas,
        id: `meas-${Date.now()}`,
        updatedAt: nowStr
      };
      setMeasurements(prev => [newProfile, ...prev]);
      showToast('New measurement profile created!', 'success');
    }
  };

  const deleteMeasurement = (id: string) => {
    setMeasurements(prev => prev.filter(m => m.id !== id));
    showToast('Measurement profile removed', 'info');
  };

  const submitReview = (
    orderId: string,
    tailorId: string,
    reviewData: Omit<Review, 'id' | 'tailorId' | 'date'>
  ) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      tailorId,
      date: 'Today'
    };

    setReviews(prev => [newRev, ...prev]);

    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, review: newRev } : o))
    );

    // Update tailor rating
    setTailors(prev =>
      prev.map(t => {
        if (t.id === tailorId) {
          const newCount = t.reviewCount + 1;
          const newAvg = Number(((t.rating * t.reviewCount + newRev.rating) / newCount).toFixed(1));
          return {
            ...t,
            reviewCount: newCount,
            rating: newAvg
          };
        }
        return t;
      })
    );

    showToast('Thank you for rating your tailor!', 'success');
  };

  const processPayment = (orderId: string, method: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            paymentStatus: 'Paid',
            paymentMethod: method
          };
        }
        return o;
      })
    );

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        recipientRole: 'customer',
        title: 'Payment Successful',
        message: `Payment confirmed via ${method} for Order #${orderId}.`,
        timestamp: 'Just now',
        read: false,
        type: 'payment',
        orderId
      },
      ...prev
    ]);

    showToast(`Payment received via ${method}!`, 'success');
    navigateToTrackOrder(orderId);
  };

  const registerTailor = (tailorData: Partial<Tailor>) => {
    const newTailor: Tailor = {
      id: `tailor-${Date.now()}`,
      name: tailorData.name || 'New Boutique',
      ownerName: tailorData.ownerName || 'Master Tailor',
      phone: tailorData.phone || '+91 98400 00000',
      email: tailorData.email || 'tailor@example.com',
      rating: 5.0,
      reviewCount: 0,
      distanceKm: 2.5,
      city: tailorData.city || 'Pudukkottai',
      state: 'Tamil Nadu',
      pincode: tailorData.pincode || '622001',
      address: tailorData.address || 'Main Road, Pudukkottai',
      yearsOfExperience: tailorData.yearsOfExperience || 5,
      specializations: tailorData.specializations || ['Blouse Stitching', 'Alterations'],
      startingPrice: tailorData.startingPrice || 300,
      availableToday: true,
      homePickupAvailable: true,
      deliveryAvailable: true,
      workingHours: tailorData.workingHours || '10:00 AM – 8:00 PM',
      about: tailorData.about || 'Dedicated custom tailor providing perfect fittings.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      shopImageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
      portfolioImages: [],
      services: [
        { name: 'Blouse Stitching', startingPrice: 350, estimatedTime: '3–4 days', category: 'Women' },
        { name: 'Alterations', startingPrice: 150, estimatedTime: '1 day', category: 'Alteration' }
      ],
      verificationStatus: 'pending',
      ordersCompleted: 0
    };

    setTailors(prev => [newTailor, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        recipientRole: 'admin',
        title: 'New Tailor Registration',
        message: `${newTailor.name} (${newTailor.city}) registered and awaiting verification.`,
        timestamp: 'Just now',
        read: false,
        type: 'verification'
      },
      ...prev
    ]);

    showToast('Registration submitted! Your profile is under verification.', 'success');
  };

  const verifyTailor = (tailorId: string, status: 'verified' | 'rejected') => {
    setTailors(prev =>
      prev.map(t => (t.id === tailorId ? { ...t, verificationStatus: status } : t))
    );
    showToast(`Tailor status updated to ${status}`, 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentPage,
        setCurrentPage,
        selectedTailorId,
        setSelectedTailorId,
        selectedOrderId,
        setSelectedOrderId,
        tailors,
        orders,
        measurements,
        appointments,
        messages,
        notifications,
        reviews,
        currentUser,
        currentTailor,
        userLocation,
        setUserLocation,
        pincode,
        setPincode,
        searchQuery,
        setSearchQuery,
        selectedServiceFilter,
        setSelectedServiceFilter,
        navigateToTailorProfile,
        navigateToTrackOrder,
        navigateToRequestService,
        navigateToPayment,
        createOrder,
        updateOrderStatus,
        sendQuotation,
        respondToQuotation,
        bookAppointment,
        sendMessage,
        saveMeasurement,
        deleteMeasurement,
        submitReview,
        processPayment,
        registerTailor,
        verifyTailor,
        markNotificationAsRead,
        markAllNotificationsRead,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

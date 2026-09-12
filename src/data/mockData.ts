import { Tailor, MeasurementProfile, Order, Appointment, ChatMessage, NotificationItem, Review } from '../types';

export const INITIAL_TAILORS: Tailor[] = [
  {
    id: 'tailor-1',
    name: 'Lakshmi Stitching Studio',
    ownerName: 'Lakshmi Devi',
    phone: '+91 98421 77340',
    email: 'lakshmi.studio@localtailor.in',
    rating: 4.8,
    reviewCount: 126,
    distanceKm: 1.8,
    city: 'Pudukkottai',
    state: 'Tamil Nadu',
    pincode: '622001',
    address: '42, West Main Street, Near Old Bus Stand, Pudukkottai',
    yearsOfExperience: 12,
    specializations: ['Blouse Stitching', 'Saree Kuchu & Fall', 'Salwar Kameez', 'Bridal Wear', 'Alterations'],
    startingPrice: 250,
    availableToday: true,
    homePickupAvailable: true,
    deliveryAvailable: true,
    workingHours: '9:30 AM – 8:30 PM (Mon – Sat)',
    about: 'Lakshmi Stitching Studio has been crafting bespoke ethnic wear for over a decade. We specialize in precision-cut bridal blouses, customized hand embroidery, Aari work, and flawless fitting for all occasions.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    shopImageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        title: 'Intricate Silk Saree Blouse with Maggam Work',
        category: 'Bridal Blouse'
      },
      {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        title: 'Classic Princess Cut Blouse with Piping',
        category: 'Blouse Stitching'
      },
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        title: 'Anarkali Suit with Zari Border Stitching',
        category: 'Salwar Kameez'
      },
      {
        url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
        title: 'Boutique Measuring & Pattern Cutting Workshop',
        category: 'Studio Craft'
      }
    ],
    services: [
      { name: 'Blouse Stitching', startingPrice: 350, estimatedTime: '3–4 days', category: 'Women', description: 'Classic 4-dart or princess cut with custom lining and piping' },
      { name: 'Saree Alteration & Falls', startingPrice: 200, estimatedTime: '1–2 days', category: 'Alteration', description: 'Pico, falls stitching, border re-stitching and pleat pinning' },
      { name: 'Salwar Stitching', startingPrice: 500, estimatedTime: '4–5 days', category: 'Women', description: 'Straight pant, Patiala or Churidar bottom with custom top' },
      { name: 'Dress Alteration', startingPrice: 250, estimatedTime: '1–2 days', category: 'Alteration', description: 'Fitting, waist tapering, hem shortening and zipper replacement' },
      { name: 'Aari & Embroidery Blouse', startingPrice: 1200, estimatedTime: '6–8 days', category: 'Bridal', description: 'Handcrafted zari threadwork and bridal neck patterns' },
      { name: 'Lehenga Choli Custom Stitch', startingPrice: 1400, estimatedTime: '5–7 days', category: 'Bridal', description: 'Can-can net attachment, custom waistband and custom dori' }
    ],
    verificationStatus: 'verified',
    ordersCompleted: 342,
    latitude: 10.3833,
    longitude: 78.8001
  },
  {
    id: 'tailor-2',
    name: 'Sri Devi Tailors & Bridal Hub',
    ownerName: 'S. Shanmugam',
    phone: '+91 94432 19882',
    email: 'sridevi.tailors@localtailor.in',
    rating: 4.9,
    reviewCount: 184,
    distanceKm: 3.4,
    city: 'Madurai',
    state: 'Tamil Nadu',
    pincode: '625001',
    address: '15, Town Hall Road, Near Meenakshi Amman Temple, Madurai',
    yearsOfExperience: 18,
    specializations: ['Bridal Blouses', 'Silk Lehengas', 'Zardozi Work', 'Pattu Pavadai', 'Kurti Stitching'],
    startingPrice: 300,
    availableToday: true,
    homePickupAvailable: true,
    deliveryAvailable: true,
    workingHours: '10:00 AM – 9:00 PM (Mon – Sun)',
    about: 'Renowned in temple city Madurai for rich wedding trousseaus, traditional South Indian pattu pavadais, and royal silk blouses. We take pride in 100% first-time perfect fit guarantee.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    shopImageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=80',
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        title: 'Temple Border Wedding Blouse',
        category: 'Bridal'
      },
      {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        title: 'Contrast Piping Silk Blouse',
        category: 'Blouse'
      }
    ],
    services: [
      { name: 'Bridal Blouse Stitching', startingPrice: 750, estimatedTime: '4–6 days', category: 'Bridal', description: 'With custom neck cutouts, padded cups and double lining' },
      { name: 'Saree Alteration', startingPrice: 180, estimatedTime: '1 day', category: 'Alteration', description: 'Immediate fall and pico work' },
      { name: 'Pattu Pavadai (Kids & Teens)', startingPrice: 450, estimatedTime: '3 days', category: 'Kids', description: 'Traditional festive wear stitching' },
      { name: 'Designer Kurti Stitching', startingPrice: 400, estimatedTime: '3–4 days', category: 'Women', description: 'A-line, flared or straight cut with sleeve details' }
    ],
    verificationStatus: 'verified',
    ordersCompleted: 512,
    latitude: 9.9252,
    longitude: 78.1198
  },
  {
    id: 'tailor-3',
    name: 'Classic Men’s Tailors',
    ownerName: 'M. Khader Basha',
    phone: '+91 97890 44219',
    email: 'classic.mens@localtailor.in',
    rating: 4.7,
    reviewCount: 94,
    distanceKm: 2.2,
    city: 'Trichy',
    state: 'Tamil Nadu',
    pincode: '620002',
    address: '88, Salai Road, Thillai Nagar, Tiruchirappalli',
    yearsOfExperience: 22,
    specializations: ['Formal Shirts', 'Trousers', 'Safari Suits', 'Blazers & Bandhgalas', 'Jeans Alterations'],
    startingPrice: 300,
    availableToday: true,
    homePickupAvailable: false,
    deliveryAvailable: true,
    workingHours: '9:00 AM – 9:00 PM (Mon – Sat)',
    about: 'Master tailors for gentlemen since 2002. Offering bespoke formal shirts, custom pleated or flat-front trousers, blazers, and safari suits crafted with imported fusing and canvas collars.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    shopImageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
        title: 'Hand-tailored Egyptian Cotton Shirt',
        category: 'Men Tailoring'
      },
      {
        url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
        title: 'Formal Wool Blend Suit Jacket Fitting',
        category: 'Suits'
      }
    ],
    services: [
      { name: 'Formal Shirt Stitching', startingPrice: 350, estimatedTime: '2–3 days', category: 'Men', description: 'Fused collar, French placket, custom monogram option' },
      { name: 'Pant / Trouser Stitching', startingPrice: 400, estimatedTime: '3–4 days', category: 'Men', description: 'Flat front or pleated with non-slip waistband' },
      { name: 'Suit & Blazer Stitching', startingPrice: 2800, estimatedTime: '7–10 days', category: 'Men', description: 'Full canvassed 2-piece or 3-piece formal suit' },
      { name: 'Pant Alteration & Hemming', startingPrice: 100, estimatedTime: 'Same day', category: 'Alteration', description: 'Waist loosening/tightening and length adjustment' }
    ],
    verificationStatus: 'verified',
    ordersCompleted: 420,
    latitude: 10.7905,
    longitude: 78.7047
  },
  {
    id: 'tailor-4',
    name: 'Meera Designer Studio & Boutique',
    ownerName: 'Meera Krishnan',
    phone: '+91 98840 55120',
    email: 'meera.boutique@localtailor.in',
    rating: 4.9,
    reviewCount: 152,
    distanceKm: 4.1,
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017',
    address: '24, Usman Road, T. Nagar, Chennai',
    yearsOfExperience: 8,
    specializations: ['Indo-Western Gowns', 'Bridal Lehengas', 'Designer Blouses', 'Sharara Sets', 'Custom Patterning'],
    startingPrice: 450,
    availableToday: false,
    homePickupAvailable: true,
    deliveryAvailable: true,
    workingHours: '10:30 AM – 8:00 PM (Tue – Sun)',
    about: 'Contemporary boutique combining runway trends with classic South Indian craftsmanship. We cater to brides, bridesmaids, and working professionals looking for distinct, elegant couture.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    shopImageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        title: 'Pastel Organza Lehenga with Mirror Detailing',
        category: 'Bridal'
      },
      {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        title: 'Boat Neck Backless Designer Blouse',
        category: 'Blouse'
      }
    ],
    services: [
      { name: 'Designer Blouse Stitching', startingPrice: 650, estimatedTime: '4–5 days', category: 'Women', description: 'Corset style, cut-work or boat neck with handmade tassels' },
      { name: 'Lehenga Stitching', startingPrice: 1800, estimatedTime: '6–8 days', category: 'Bridal', description: 'Flared umbrella cut with inner lining and can-can' },
      { name: 'Indo-Western Jumpsuit / Dress', startingPrice: 1200, estimatedTime: '5 days', category: 'Women', description: 'Tailored drape gowns and party wear' },
      { name: 'Custom Alteration', startingPrice: 300, estimatedTime: '2 days', category: 'Alteration', description: 'Premium garment reshaping and resizing' }
    ],
    verificationStatus: 'verified',
    ordersCompleted: 285,
    latitude: 13.0418,
    longitude: 80.2341
  },
  {
    id: 'tailor-5',
    name: 'Fashion Fit Boutique & Alteration Works',
    ownerName: 'V. Rathinam',
    phone: '+91 99440 21980',
    email: 'fashionfit.cbe@localtailor.in',
    rating: 4.6,
    reviewCount: 78,
    distanceKm: 2.7,
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641002',
    address: '76, D.B. Road, R.S. Puram, Coimbatore',
    yearsOfExperience: 14,
    specializations: ['Daily Wear Blouse', 'Churidar & Salwar', 'Express Alterations', 'Kids Uniforms'],
    startingPrice: 200,
    availableToday: true,
    homePickupAvailable: true,
    deliveryAvailable: true,
    workingHours: '9:00 AM – 8:30 PM (Mon – Sat)',
    about: 'Reliable neighborhood tailoring studio known for quick turnaround, budget-friendly rates, and express 24-hour alteration service for students and working women.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    shopImageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=80',
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        title: 'Daily Cotton Blouse Set',
        category: 'Blouse'
      }
    ],
    services: [
      { name: 'Blouse Stitching', startingPrice: 280, estimatedTime: '2–3 days', category: 'Women', description: 'Simple cotton or synthetic blouse with standard piping' },
      { name: 'Salwar Kameez Stitching', startingPrice: 420, estimatedTime: '3–4 days', category: 'Women', description: 'Top with lining and salwar/churidar pant' },
      { name: 'Express Alteration', startingPrice: 150, estimatedTime: 'Same day', category: 'Alteration', description: 'Quick size reduction or hem fix within 4 hours' }
    ],
    verificationStatus: 'verified',
    ordersCompleted: 198,
    latitude: 11.0168,
    longitude: 76.9558
  },
  {
    id: 'tailor-6',
    name: 'Royal Heritage Tailors',
    ownerName: 'K. Balaji',
    phone: '+91 94420 88712',
    email: 'royalheritage@localtailor.in',
    rating: 4.8,
    reviewCount: 110,
    distanceKm: 5.0,
    city: 'Pudukkottai',
    state: 'Tamil Nadu',
    pincode: '622002',
    address: '112, East Palace Street, Pudukkottai',
    yearsOfExperience: 16,
    specializations: ['Pattu Pavadai', 'Temple Dhotis & Angavastram', 'Silk Shirts', 'Saree Kuchu'],
    startingPrice: 300,
    availableToday: true,
    homePickupAvailable: false,
    deliveryAvailable: true,
    workingHours: '9:30 AM – 8:00 PM (Mon – Sat)',
    about: 'Traditional master artisans skilled in heritage Chettinad and Pudukkottai silks, classic zari work, and royal silk shirts and dhotis.',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    shopImageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    portfolioImages: [
      {
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        title: 'Chettinad Pattu Blouse with Tassels',
        category: 'Traditional'
      }
    ],
    services: [
      { name: 'Chettinad Silk Blouse', startingPrice: 450, estimatedTime: '3–4 days', category: 'Women', description: 'Reinforced zari stitch with authentic temple neck' },
      { name: 'Silk Dhoti Border Stitching', startingPrice: 150, estimatedTime: '1 day', category: 'Men', description: 'Gold zari border finishing' }
    ],
    verificationStatus: 'pending',
    ordersCompleted: 145,
    latitude: 10.3800,
    longitude: 78.8200
  }
];

export const INITIAL_MEASUREMENTS: MeasurementProfile[] = [
  {
    id: 'meas-1',
    title: 'My Standard Measurements',
    category: 'Blouse',
    bust: 34,
    waist: 28,
    hip: 36,
    shoulder: 14,
    sleeveLength: 17,
    blouseLength: 14,
    armhole: 15.5,
    frontNeckDepth: 6.5,
    backNeckDepth: 8.5,
    notes: 'Comfortable fit, prefer slightly deep round back with dori tassels. Always add padded cups for silk blouses.',
    updatedAt: '12 Sep 2026'
  },
  {
    id: 'meas-2',
    title: 'Festive & Traditional Wear',
    category: 'Saree/Choli',
    bust: 34.5,
    waist: 28.5,
    hip: 37,
    shoulder: 14.5,
    sleeveLength: 18,
    blouseLength: 14.5,
    armhole: 16,
    frontNeckDepth: 7,
    backNeckDepth: 9,
    notes: 'For heavy Kanchipuram silk saree with Aari maggam work. Elbow-length sleeves.',
    updatedAt: '05 Sep 2026'
  },
  {
    id: 'meas-3',
    title: 'Office Kurti Fit',
    category: 'Kurti',
    bust: 35,
    waist: 29,
    hip: 38,
    shoulder: 14,
    sleeveLength: 16,
    chest: 35,
    shirtLength: 42,
    armhole: 16,
    notes: 'Relaxed cotton daily wear with 3/4 sleeves and slit pockets.',
    updatedAt: '28 Aug 2026'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'LTC-10482',
    customerId: 'cust-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98401 23456',
    customerCity: 'Pudukkottai',
    tailorId: 'tailor-1',
    tailorName: 'Lakshmi Stitching Studio',
    tailorPhone: '+91 98421 77340',
    tailorAddress: '42, West Main Street, Pudukkottai',
    serviceType: 'New Clothing',
    garment: 'Blouse',
    requirements: 'Need a boat-neck silk blouse with elbow-length sleeves, subtle golden piping, and built-in cup padding for sister’s wedding.',
    referenceImages: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'
    ],
    measurementsSummary: 'Bust: 34", Waist: 28", Shoulder: 14", Sleeve: 17", Blouse Length: 14"',
    deliveryOption: 'Home delivery',
    deliveryAddress: 'Flat 3B, Sri Krishna Apartments, Gandhi Nagar, Pudukkottai - 622001',
    status: 'Stitching',
    currentStageIndex: 4,
    history: [
      { stage: 'Request Submitted', timestamp: '12 Sep 2026, 10:30 AM', note: 'Customer submitted blouse stitching request with fabric specifications' },
      { stage: 'Measurement Confirmed', timestamp: '12 Sep 2026, 02:15 PM', note: 'Lakshmi verified digital measurement profile #My Standard Measurements' },
      { stage: 'Quote Sent', timestamp: '12 Sep 2026, 03:00 PM', note: 'Quotation #QT-2045 for ₹650 accepted by customer' },
      { stage: 'Cutting', timestamp: '13 Sep 2026, 11:00 AM', note: 'Fabric inspected and pattern cut to precision' },
      { stage: 'Stitching', timestamp: '14 Sep 2026, 03:20 PM', note: 'Currently on the sewing machine. Inner lining and piping completed' }
    ],
    estimatedCompletion: '18 September 2026',
    orderDate: '12 Sep 2026',
    amount: 650,
    paymentStatus: 'Paid',
    paymentMethod: 'UPI (GPay)',
    quotation: {
      id: 'QT-2045',
      orderId: 'LTC-10482',
      baseStitching: 350,
      designCharges: 100,
      materialCharges: 150,
      alterationCharges: 50,
      discount: 0,
      total: 650,
      status: 'Accepted',
      notes: 'Includes premium cotton lining, bra padding, and gold piping work.',
      createdAt: '12 Sep 2026'
    }
  },
  {
    id: 'LTC-10501',
    customerId: 'cust-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98401 23456',
    customerCity: 'Pudukkottai',
    tailorId: 'tailor-1',
    tailorName: 'Lakshmi Stitching Studio',
    tailorPhone: '+91 98421 77340',
    tailorAddress: '42, West Main Street, Pudukkottai',
    serviceType: 'New Clothing',
    garment: 'Salwar',
    requirements: 'Churidar set with collar neck and embroidered yoke. Fabric provided by customer.',
    referenceImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
    ],
    measurementsSummary: 'Using Office Kurti Fit profile',
    deliveryOption: 'Pickup from tailor',
    status: 'Request Submitted',
    currentStageIndex: 0,
    history: [
      { stage: 'Request Submitted', timestamp: '14 Sep 2026, 09:15 AM', note: 'New request pending tailor review' }
    ],
    estimatedCompletion: '22 September 2026',
    orderDate: '14 Sep 2026',
    amount: 500,
    paymentStatus: 'Pending'
  },
  {
    id: 'LTC-10310',
    customerId: 'cust-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98401 23456',
    customerCity: 'Pudukkottai',
    tailorId: 'tailor-1',
    tailorName: 'Lakshmi Stitching Studio',
    tailorPhone: '+91 98421 77340',
    tailorAddress: '42, West Main Street, Pudukkottai',
    serviceType: 'Alteration',
    garment: 'Saree',
    requirements: 'Fall and pico work with border reinforcement for Mysore silk saree.',
    referenceImages: [],
    measurementsSummary: 'Standard 5.5m saree falls',
    deliveryOption: 'Customer pickup',
    status: 'Completed',
    currentStageIndex: 7,
    history: [
      { stage: 'Request Submitted', timestamp: '01 Sep 2026, 11:00 AM' },
      { stage: 'Cutting', timestamp: '02 Sep 2026, 10:00 AM' },
      { stage: 'Completed', timestamp: '03 Sep 2026, 05:00 PM', note: 'Customer collected and approved the fitting' }
    ],
    estimatedCompletion: '03 September 2026',
    orderDate: '01 Sep 2026',
    amount: 200,
    paymentStatus: 'Paid',
    paymentMethod: 'Cash on Pickup',
    review: {
      id: 'rev-101',
      customerName: 'Priya Sharma',
      tailorId: 'tailor-1',
      rating: 5,
      categories: {
        stitchingQuality: 5,
        fitting: 5,
        deliveryTime: 5,
        communication: 5,
        valueForMoney: 5
      },
      comment: 'Superb finishing on the falls! The hem is so neat and invisible. Will definitely bring all my sarees here.',
      date: '04 Sep 2026',
      garment: 'Saree Alteration & Falls'
    }
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    customerId: 'cust-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98401 23456',
    tailorId: 'tailor-1',
    tailorName: 'Lakshmi Stitching Studio',
    tailorAddress: '42, West Main Street, Pudukkottai',
    type: 'Measurement',
    date: 'Tomorrow, 13 Sep 2026',
    timeSlot: '11:30 AM',
    status: 'Confirmed',
    notes: 'Bringing new handloom tussar silk fabric for Diwali blouse trial.'
  },
  {
    id: 'apt-2',
    customerId: 'cust-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98401 23456',
    tailorId: 'tailor-1',
    tailorName: 'Lakshmi Stitching Studio',
    tailorAddress: '42, West Main Street, Pudukkottai',
    type: 'Fitting',
    date: '17 Sep 2026',
    timeSlot: '04:30 PM',
    status: 'Confirmed',
    notes: 'Trial fitting for order #LTC-10482 blouse.'
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    orderId: 'LTC-10482',
    senderId: 'cust-1',
    senderRole: 'customer',
    senderName: 'Priya Sharma',
    text: 'Namaste Lakshmi akka, I submitted my order for the boat-neck blouse today.',
    timestamp: '12 Sep, 10:35 AM',
    read: true
  },
  {
    id: 'msg-2',
    orderId: 'LTC-10482',
    senderId: 'tailor-1',
    senderRole: 'tailor',
    senderName: 'Lakshmi Stitching Studio',
    text: 'Vanakkam Priya! Yes, I saw your measurements and design notes. The golden piping will match your saree border perfectly.',
    timestamp: '12 Sep, 10:48 AM',
    read: true
  },
  {
    id: 'msg-3',
    orderId: 'LTC-10482',
    senderId: 'cust-1',
    senderRole: 'customer',
    senderName: 'Priya Sharma',
    text: 'Can you make the sleeves slightly longer?',
    timestamp: '12 Sep, 11:15 AM',
    read: true
  },
  {
    id: 'msg-4',
    orderId: 'LTC-10482',
    senderId: 'tailor-1',
    senderRole: 'tailor',
    senderName: 'Lakshmi Stitching Studio',
    text: 'Yes, we can make them 17 inches. That will sit just above the elbow nicely with the zari border.',
    timestamp: '12 Sep, 11:22 AM',
    read: true
  },
  {
    id: 'msg-5',
    orderId: 'LTC-10482',
    senderId: 'tailor-1',
    senderRole: 'tailor',
    senderName: 'Lakshmi Stitching Studio',
    text: 'I have started the stitching today. Here is a quick snapshot of the cutting table.',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
    timestamp: '14 Sep, 03:25 PM',
    read: false
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    recipientRole: 'customer',
    title: 'Order Update',
    message: 'Your blouse order #LTC-10482 has moved to Stitching.',
    timestamp: '14 Sep, 03:20 PM',
    read: false,
    type: 'order',
    orderId: 'LTC-10482'
  },
  {
    id: 'notif-2',
    recipientRole: 'customer',
    title: 'Quotation Received',
    message: 'Lakshmi Stitching Studio sent you a quotation of ₹650 for Order #LTC-10482.',
    timestamp: '12 Sep, 03:00 PM',
    read: true,
    type: 'quote',
    orderId: 'LTC-10482'
  },
  {
    id: 'notif-3',
    recipientRole: 'customer',
    title: 'Appointment Reminder',
    message: 'Your measurement appointment is tomorrow at 11:30 AM with Lakshmi Stitching Studio.',
    timestamp: '12 Sep, 09:00 AM',
    read: false,
    type: 'appointment'
  },
  {
    id: 'notif-4',
    recipientRole: 'customer',
    title: 'Order Ready',
    message: 'Your saree alteration order #LTC-10310 was successfully completed.',
    timestamp: '03 Sep, 05:00 PM',
    read: true,
    type: 'order',
    orderId: 'LTC-10310'
  },
  {
    id: 'notif-5',
    recipientRole: 'tailor',
    title: 'New Service Request',
    message: 'Priya Sharma requested Salwar Stitching (Request #LTC-10501).',
    timestamp: '14 Sep, 09:15 AM',
    read: false,
    type: 'order',
    orderId: 'LTC-10501'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    tailorId: 'tailor-1',
    customerName: 'Ananya Raman',
    customerLocation: 'Pudukkottai',
    rating: 5,
    categories: {
      stitchingQuality: 5,
      fitting: 5,
      deliveryTime: 5,
      communication: 5,
      valueForMoney: 5
    },
    comment: 'Lakshmi akka stitched my wedding reception blouse. The boat neck cut and padding was so comfortable. Finished on time without any follow-ups!',
    date: '28 Aug 2026',
    garment: 'Bridal Blouse Stitching'
  },
  {
    id: 'rev-2',
    tailorId: 'tailor-1',
    customerName: 'Meenakshi Sundaram',
    customerLocation: 'Alangudi',
    rating: 4.8,
    categories: {
      stitchingQuality: 5,
      fitting: 5,
      deliveryTime: 4.5,
      communication: 5,
      valueForMoney: 5
    },
    comment: 'Very professional tailoring studio. Digital measurements stored in app make it so easy to order even when I cannot visit the shop in person.',
    date: '15 Aug 2026',
    garment: 'Salwar Kameez'
  },
  {
    id: 'rev-3',
    tailorId: 'tailor-1',
    customerName: 'Kavitha S.',
    customerLocation: 'Pudukkottai',
    rating: 4.7,
    categories: {
      stitchingQuality: 5,
      fitting: 4.5,
      deliveryTime: 5,
      communication: 4.5,
      valueForMoney: 4.5
    },
    comment: 'Great craftsmanship. Pricing is transparent and home delivery arrived safely wrapped in garment cover.',
    date: '02 Aug 2026',
    garment: 'Festive Blouse'
  }
];

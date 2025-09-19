import { faker } from '@faker-js/faker';

// --- Start of New Predefined Images ---
const PREDEFINED_IMAGES = {
  medicine: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800',
    'https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=800',
    'https://images.unsplash.com/photo-1550572017-536d563b724b?q=80&w=800',
  ],
  'skin-care': [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800',
    'https://images.unsplash.com/photo-1590358669439-2aa405b38f82?q=80&w=800',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800',
  ],
  'hair-care': [
    'https://images.unsplash.com/photo-1629198735660-e39ea93f5a87?q=80&w=800',
    'https://images.unsplash.com/photo-1599387822537-00f7a354b518?q=80&w=800',
  ],
  vitamins: [
    'https://images.unsplash.com/photo-1607619056574-7d8d3ee536b2?q=80&w=800',
    'https://images.unsplash.com/photo-1627384113710-424c9384f914?q=80&w=800',
  ],
  fitness: [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800',
    'https://images.unsplash.com/photo-1549060279-7e168f3282fd?q=80&w=800',
  ],
  'mom-baby': [
    'https://images.unsplash.com/photo-1525835363741-bf3dfb0f73f7?q=80&w=800',
    'https://images.unsplash.com/photo-1604432139413-2b9c65a12f6c?q=80&w=800',
  ],
  'women-health': [
    'https://images.unsplash.com/photo-1571019599539-a06a29855268?q=80&w=800',
  ],
  'men-health': [
    'https://images.unsplash.com/photo-1622254939237-b58e70d7ed92?q=80&w=800',
  ],
  'oral-care': [
    'https://images.unsplash.com/photo-1600170052213-2b2938871653?q=80&w=800',
  ],
  beauty: [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800',
  ],
  'health-devices': [
    'https://images.unsplash.com/photo-1615486517864-9f3275a45778?q=80&w=800',
  ],
  optics: [
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800',
  ],
  perfumes: [
    'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800',
  ],
  'skin-analysis': [
    'https://images.unsplash.com/photo-1587825023399-a46113647820?q=80&w=800',
  ],
  default: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800',
  ]
};
// --- End of New Predefined Images ---

const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  STORE_OWNER: 'store_owner',
  DELIVERY_STAFF: 'delivery_staff',
  PHARMACIST: 'pharmacist',
};

const LOYALTY_TIERS = {
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
};

export const PRODUCT_BADGES = {
  NEW: 'New',
  OFFER: 'Offer',
  PRESCRIPTION_REQUIRED: 'Prescription Required',
};

const CATEGORIES = [
  { id: 'medicine', name: 'Medicine', nameAr: 'أدوية', icon: 'Pill', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800' },
  { id: 'skin-care', name: 'Skin Care', nameAr: 'العناية بالبشرة', icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800' },
  { id: 'hair-care', name: 'Hair Care', nameAr: 'العناية بالشعر', icon: 'Wind', image: 'https://images.unsplash.com/photo-1629198735660-e39ea93f5a87?q=80&w=800' },
  { id: 'vitamins', name: 'Vitamins', nameAr: 'فيتامينات', icon: 'Activity', image: 'https://images.unsplash.com/photo-1607619056574-7d8d3ee536b2?q=80&w=800' },
  { id: 'fitness', name: 'Fitness', nameAr: 'اللياقة البدنية', icon: 'HeartPulse', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800' },
  { id: 'mom-baby', name: 'Mom & Baby', nameAr: 'الأم والطفل', icon: 'Baby', image: 'https://images.unsplash.com/photo-1525835363741-bf3dfb0f73f7?q=80&w=800' },
  { id: 'women-health', name: 'Women', nameAr: 'صحة المرأة', icon: 'PersonStanding', image: 'https://images.unsplash.com/photo-1571019599539-a06a29855268?q=80&w=800' },
  { id: 'men-health', name: 'Men', nameAr: 'صحة الرجل', icon: 'User', image: 'https://images.unsplash.com/photo-1622254939237-b58e70d7ed92?q=80&w=800' },
  { id: 'oral-care', name: 'Oral Care', nameAr: 'العناية بالفم', icon: 'Smile', image: 'https://images.unsplash.com/photo-1600170052213-2b2938871653?q=80&w=800' },
  { id: 'beauty', name: 'Beauty', nameAr: 'الجمال', icon: 'Paintbrush', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800' },
  { id: 'health-devices', name: 'Health Devices', nameAr: 'أجهزة صحية', icon: 'Thermometer', image: 'https://images.unsplash.com/photo-1615486517864-9f3275a45778?q=80&w=800' },
  { id: 'optics', name: 'Optics', nameAr: 'البصريات', icon: 'Glasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800' },
  { id: 'perfumes', name: 'Perfumes', nameAr: 'العطور', icon: 'SprayCan', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800' },
  { id: 'skin-analysis', name: 'Skin Analysis', nameAr: 'تحليل البشرة', icon: 'ScanFace', image: 'https://images.unsplash.com/photo-1587825023399-a46113647820?q=80&w=800' },
];


const generateProducts = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const price = parseFloat(faker.commerce.price({ min: 5, max: 200 }));
    const hasOffer = faker.datatype.boolean(0.3);
    const prescriptionRequired = faker.datatype.boolean(0.2);
    const category = faker.helpers.arrayElement(CATEGORIES);
    
    const imagePool = PREDEFINED_IMAGES[category.id] || PREDEFINED_IMAGES.default;

    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      nameAr: `منتج ${i + 1}`,
      description: faker.commerce.productDescription(),
      descriptionAr: `وصف المنتج ${i + 1}`,
      price: price,
      offerPrice: hasOffer ? parseFloat((price * faker.number.float({ min: 0.7, max: 0.9 })).toFixed(2)) : null,
      thumbnail: faker.helpers.arrayElement(imagePool),
      images: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => faker.helpers.arrayElement(imagePool)),
      category: category.id,
      categoryName: category.name,
      categoryNameAr: category.nameAr,
      brand: faker.company.name(),
      brandAr: `ماركة ${i + 1}`,
      availability: faker.datatype.boolean(0.8) ? 'In Stock' : 'Out of Stock',
      availabilityAr: faker.datatype.boolean(0.8) ? 'متوفر' : 'غير متوفر',
      rating: parseFloat(faker.number.float({ min: 3.5, max: 5, precision: 0.1 }).toFixed(1)),
      reviewsCount: faker.number.int({ min: 10, max: 500 }),
      badges: [
        ...(faker.datatype.boolean(0.15) ? [PRODUCT_BADGES.NEW] : []),
        ...(hasOffer ? [PRODUCT_BADGES.OFFER] : []),
        ...(prescriptionRequired ? [PRODUCT_BADGES.PRESCRIPTION_REQUIRED] : []),
      ],
      prescriptionRequired,
      sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
      loyaltyPointsEarned: Math.floor(price / 10) * 5,
    };
  });
};

export const mockUser = {
  id: faker.string.uuid(),
  name: faker.person.firstName() + ' ' + faker.person.lastName(),
  profilePictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=128',
  role: USER_ROLES.CUSTOMER,
  loyaltyTier: faker.helpers.arrayElement(Object.values(LOYALTY_TIERS)),
  loyaltyPoints: faker.number.int({ min: 0, max: 5000 }),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  memberSince: faker.date.past({ years: 2 }).toISOString(),
  addresses: [
    { id: 'addr1', recipientName: faker.person.fullName(), phone: faker.phone.number(), address: `${faker.location.streetAddress()}, ${faker.location.city()}`, pincode: faker.location.zipCode(), city: faker.location.city(), tag: 'Home', isDefault: true },
    { id: 'addr2', recipientName: faker.person.fullName(), phone: faker.phone.number(), address: `${faker.location.streetAddress()}, ${faker.location.city()}`, pincode: faker.location.zipCode(), city: faker.location.city(), tag: 'Work', isDefault: false },
  ]
};

export const mockProducts = generateProducts(50);
export const mockCategories = CATEGORIES;

export const mockPromotionalBanners = [
  { id: 'banner1', imageUrl: 'https://images.unsplash.com/photo-1576633587382-139b316aaceb?q=80&w=1200', altText: 'Summer Sale', altTextAr: 'تخفيضات الصيف! خصم يصل إلى 50٪', link: '/products?tag=summer-sale' },
  { id: 'banner2', imageUrl: 'https://images.unsplash.com/photo-1590358669439-2aa405b38f82?q=80&w=1200', altText: 'New Arrivals', altTextAr: 'وصل حديثاً هذا الأسبوع', link: '/products?sort=newest' },
  { id: 'banner3', imageUrl: 'https://images.unsplash.com/photo-1627384113710-424c9384f914?q=80&w=1200', altText: 'Bundle Deals', altTextAr: 'عروض الباقات للعائلات', link: '/products?category=bundles' },
];

export const mockQuickAccessItems = (language) => [
  { id: 'upload_prescription', name: language === 'ar' ? 'رفع الوصفة' : 'Upload Prescription', icon: 'UploadCloud', link: '/upload-prescription' },
  { id: 'my_orders', name: language === 'ar' ? 'طلباتي' : 'My Orders', icon: 'Package', link: '/orders' },
  { id: 'chat_support', name: language === 'ar' ? 'دعم الدردشة' : 'Chat Support', icon: 'MessageSquare', link: '/chat' },
  { id: 'loyalty_points', name: language === 'ar' ? 'نقاط الولاء' : 'Loyalty Points', icon: 'Award', link: '/loyalty' },
];

export const getProductById = (id) => mockProducts.find(p => p.id === id);
export const getProductsByCategory = (categoryId) => mockProducts.filter(p => p.category === categoryId);

export const mockBrands = [...new Set(mockProducts.map(p => p.brand))].slice(0,10);
export const mockBrandsAr = [...new Set(mockProducts.map(p => p.brandAr))].slice(0,10);

const ORDER_STATUSES = {
  PROCESSING: { en: 'Processing', ar: 'قيد المعالجة', icon: 'RefreshCw', color: 'text-blue-500', step: 1 },
  CONFIRMED: { en: 'Confirmed', ar: 'تم التأكيد', icon: 'PackageCheck', color: 'text-blue-600', step: 1 },
  PACKED: { en: 'Packed', ar: 'تم التجهيز', icon: 'Archive', color: 'text-sky-500', step: 2 },
  OUT_FOR_DELIVERY: { en: 'Out for Delivery', ar: 'قيد التوصيل', icon: 'Truck', color: 'text-orange-500', step: 3 },
  DELIVERED: { en: 'Delivered', ar: 'تم التوصيل', icon: 'CheckCircle', color: 'text-green-500', step: 4 },
  CANCELLED: { en: 'Cancelled', ar: 'ملغاة', icon: 'XCircle', color: 'text-red-500', step: 0 },
  REJECTED: { en: 'Rejected', ar: 'مرفوض', icon: 'ShieldX', color: 'text-red-600', step: 0 },
};
export { ORDER_STATUSES };

export const DELIVERY_STATUSES = {
  PENDING_ASSIGNMENT: { en: 'Pending Assignment', ar: 'بانتظار التعيين', icon: 'UserPlus', color: 'text-gray-500' },
  PENDING_PICKUP: { en: 'Pending Pickup', ar: 'بانتظار الاستلام', icon: 'Package', color: 'text-blue-500' },
  EN_ROUTE: { en: 'En Route', ar: 'في الطريق', icon: 'Navigation', color: 'text-orange-500' },
  DELIVERED: { en: 'Delivered', ar: 'تم التوصيل', icon: 'CheckCircle2', color: 'text-green-500' },
  ISSUE_REPORTED: { en: 'Issue Reported', ar: 'تم الإبلاغ عن مشكلة', icon: 'AlertTriangle', color: 'text-red-500' },
  CANCELLED: { en: 'Cancelled', ar: 'ملغى', icon: 'XCircle', color: 'text-red-600' },
};


export const generateMockOrders = (count, lang) => {
  return Array.from({ length: count }, (_, i) => {
    const itemCount = faker.number.int({ min: 1, max: 5 });
    const items = mockProducts.slice(i * 2, i * 2 + itemCount).map(p => ({
      ...p,
      quantity: faker.number.int({ min: 1, max: 3 }),
      priceAtPurchase: (p.offerPrice || p.price) * 0.95,
    }));
    const subtotal = items.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);
    const discount = faker.datatype.boolean(0.4) ? subtotal * faker.number.float({ min: 0.05, max: 0.15 }) : 0;
    const shipping = 15.00;
    const totalAmount = subtotal - discount + shipping;
    const statusKey = faker.helpers.arrayElement(Object.keys(ORDER_STATUSES));
    const statusInfo = ORDER_STATUSES[statusKey];
    const paymentMethods = ['Credit Card', 'Cash on Delivery', 'Apple Pay'];
    const deliveryAddress = {
        name: faker.person.fullName(),
        address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
        phone: faker.phone.number(),
    };

    const deliveryStatusKey = faker.helpers.arrayElement(Object.keys(DELIVERY_STATUSES));
    const deliveryStatusInfo = DELIVERY_STATUSES[deliveryStatusKey];

    return {
      id: `ORD-${faker.string.alphanumeric(8).toUpperCase()}`,
      date: faker.date.past({ years: 1 }).toISOString(),
      itemCount: items.length,
      totalAmount: totalAmount.toFixed(2),
      status: lang === 'ar' ? statusInfo.ar : statusInfo.en,
      statusKey: statusKey,
      statusIcon: statusInfo.icon,
      statusColor: statusInfo.color,
      items,
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      shipping: shipping.toFixed(2),
      paymentMethod: faker.helpers.arrayElement(paymentMethods),
      deliveryAddress,
      storeName: `${faker.company.name()} Pharmacy`,
      prescriptionUrl: items.some(it => it.prescriptionRequired) ? `https://example.com/rx/${faker.string.uuid()}.pdf` : null,
      itemsPreview: items.slice(0,3).map(it => it.thumbnail),
      deliveryStatus: lang === 'ar' ? deliveryStatusInfo.ar : deliveryStatusInfo.en,
      deliveryStatusKey: deliveryStatusKey, // Storing English key for logic
      deliveryStatusIcon: deliveryStatusInfo.icon,
      deliveryStatusColor: deliveryStatusInfo.color,
      eta: new Date(new Date().getTime() + faker.number.int({min: 15, max: 180}) * 60000).toISOString(),
      isNewAssignment: faker.datatype.boolean(0.3) && deliveryStatusKey === DELIVERY_STATUSES.PENDING_ASSIGNMENT.en,
    };
  });
};

export const mockOrders = generateMockOrders(10, 'en'); // Default to English for base mock data
export const getOrderById = (id) => mockOrders.find(order => order.id === id);

export const mockLiveTrackingData = (orderId) => {
    const order = getOrderById(orderId);
    if (!order || order.statusKey !== 'OUT_FOR_DELIVERY') return null;
    return {
        orderId,
        driverName: faker.person.fullName(),
        driverPhone: faker.phone.number(),
        driverImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128',
        eta: new Date(new Date().getTime() + faker.number.int({min: 15, max: 120}) * 60000).toISOString(),
        currentLocation: { lat: faker.location.latitude(), lng: faker.location.longitude() },
        deliveryAddress: order.deliveryAddress.address,
        mapImage: 'https://images.unsplash.com/photo-1593954366632-349034a24f6f?q=80&w=600',
    };
};

export const TICKET_STATUSES = {
  OPEN: { en: 'Open', ar: 'مفتوحة', color: 'text-red-500', bgColor: 'bg-red-100' },
  IN_PROGRESS: { en: 'In Progress', ar: 'قيد المعالجة', color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
  RESOLVED: { en: 'Resolved', ar: 'تم الحل', color: 'text-green-500', bgColor: 'bg-green-100' },
  CLOSED: { en: 'Closed', ar: 'مغلقة', color: 'text-gray-500', bgColor: 'bg-gray-100' },
};

export const mockSupportTickets = Array.from({ length: 5 }, (_, i) => {
  const statusKey = faker.helpers.arrayElement(Object.keys(TICKET_STATUSES));
  const statusInfo = TICKET_STATUSES[statusKey];
  return {
    id: `TKT-${faker.string.alphanumeric(6).toUpperCase()}`,
    subject: faker.lorem.sentence(5),
    subjectAr: `موضوع تذكرة ${i+1}`,
    status: statusInfo, // Store the whole object
    lastUpdated: faker.date.recent({ days: 30 }).toISOString(),
    messages: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      sender: faker.helpers.arrayElement(['user', 'agent']),
      text: faker.lorem.paragraph(),
      timestamp: faker.date.recent({ days: 1 }).toISOString(),
    })),
    category: faker.helpers.arrayElement(['Order Issue', 'Payment Query', 'Product Question', 'Technical Support']),
    files: faker.datatype.boolean(0.3) ? [faker.system.commonFileName('pdf')] : [],
  };
});

export const NOTIFICATION_TYPES = {
  OFFER: { icon: 'Percent', color: 'text-purple-500' },
  ORDER_UPDATE: { icon: 'Package', color: 'text-blue-500' },
  SUPPORT_UPDATE: { icon: 'MessageCircle', color: 'text-green-500' },
  LOYALTY_UPDATE: { icon: 'Award', color: 'text-yellow-500' },
  GENERAL_ALERT: { icon: 'AlertTriangle', color: 'text-red-500' },
};

export const mockNotifications = Array.from({ length: 10 }, (_, i) => {
  const typeKey = faker.helpers.arrayElement(Object.keys(NOTIFICATION_TYPES));
  const typeInfo = NOTIFICATION_TYPES[typeKey];
  return {
    id: faker.string.uuid(),
    type: typeKey,
    typeInfo,
    title: faker.lorem.words(faker.number.int({min:3, max:6})),
    titleAr: `إشعار ${i+1}`,
    message: faker.lorem.sentence(),
    messageAr: `رسالة إشعار ${i+1}`,
    date: faker.date.recent({ days: 7 }).toISOString(),
    isRead: faker.datatype.boolean(0.3),
    link: faker.helpers.arrayElement(['/orders', '/products', '/loyalty', null]),
  };
});

export const PRESCRIPTION_STATUS = {
  PENDING: { en: 'Pending', ar: 'قيد المراجعة', color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
  APPROVED: { en: 'Approved', ar: 'مقبولة', color: 'text-green-500', bgColor: 'bg-green-100' },
  REJECTED: { en: 'Rejected', ar: 'مرفوضة', color: 'text-red-500', bgColor: 'bg-red-100' },
  EXPIRED: { en: 'Expired', ar: 'منتهية الصلاحية', color: 'text-gray-500', bgColor: 'bg-gray-100' },
};

export const mockUserPrescriptions = Array.from({ length: 4 }, (_, i) => {
  const statusKey = faker.helpers.arrayElement(Object.keys(PRESCRIPTION_STATUS));
  const statusInfo = PRESCRIPTION_STATUS[statusKey];
  const uploadDate = faker.date.past({ years: 1 });
  return {
    id: `RX-${faker.string.alphanumeric(7).toUpperCase()}`,
    fileName: `prescription_${i + 1}.${faker.helpers.arrayElement(['pdf', 'jpg'])}`,
    title: (language) => language === 'ar' ? `وصفة طبية لـ ${faker.commerce.productName()}` : `Prescription for ${faker.commerce.productName()}`,
    uploadDate: uploadDate.toISOString(),
    validityDate: faker.date.future({ years: 1, refDate: uploadDate }).toISOString(),
    status: statusInfo, // Store the whole object
    orderId: statusInfo.en === 'Approved' ? `ORD-${faker.string.alphanumeric(8).toUpperCase()}` : null,
    fileUrl: '#mock-prescription-url',
    notes: faker.lorem.sentence(),
  };
});

export const mockCampaigns = [
  { id: 'promo1', code: 'SUMMER25', title: 'Summer Sale 25% Off', titleAr: 'تخفيضات الصيف 25%', description: 'Get 25% off on all summer essentials.', descriptionAr: 'احصل على خصم 25% على جميع مستلزمات الصيف.', expiryDate: faker.date.future({ months: 1 }).toISOString(), minValue: 100, type: 'discount', discountPercent: 25 },
  { id: 'promo2', code: 'FIRSTMED', title: 'First Order Discount', titleAr: 'خصم أول طلب', description: '15% off your first order on the platform.', descriptionAr: 'خصم 15% على أول طلب لك على المنصة.', expiryDate: faker.date.future({ months: 3 }).toISOString(), minValue: 50, type: 'discount', discountPercent: 15 },
  { id: 'bundle1', code: 'HEALTHPACK', title: 'Wellness Bundle', titleAr: 'باقة العافية', description: 'Get a curated pack of wellness products at a special price.', descriptionAr: 'احصل على باقة منسقة من منتجات العافية بسعر خاص.', expiryDate: faker.date.future({ months: 2 }).toISOString(), type: 'bundle', link: '/products?bundle=wellness' },
];

export const mockLoyaltyTransactions = [
  { id: 'lt1', date: faker.date.recent({ days: 5 }).toISOString(), description: 'Earned from Order #ORD123', descriptionAr: 'مكتسبة من طلب #ORD123', points: '+150' },
  { id: 'lt2', date: faker.date.recent({ days: 10 }).toISOString(), description: 'Redeemed for OMR 2 Voucher', descriptionAr: 'مستبدلة بقسيمة 2 ر.ع.', points: '-200' },
  { id: 'lt3', date: faker.date.recent({ days: 15 }).toISOString(), description: 'Birthday Bonus', descriptionAr: 'مكافأة عيد الميلاد', points: '+100' },
  { id: 'lt4', date: faker.date.recent({ days: 20 }).toISOString(), description: 'Earned from Product Review', descriptionAr: 'مكتسبة من مراجعة منتج', points: '+25' },
  { id: 'lt5', date: faker.date.past({ months: 13 }).toISOString(), description: 'Points Expired', descriptionAr: 'نقاط منتهية الصلاحية', points: '-50' },
];

export const mockDeliveryEarnings = {
  weekly: [
    { day: 'Mon', dayAr: 'إث', earnings: faker.number.int({ min: 50, max: 150 }) },
    { day: 'Tue', dayAr: 'ثلا', earnings: faker.number.int({ min: 70, max: 180 }) },
    { day: 'Wed', dayAr: 'أرب', earnings: faker.number.int({ min: 60, max: 160 }) },
    { day: 'Thu', dayAr: 'خم', earnings: faker.number.int({ min: 80, max: 200 }) },
    { day: 'Fri', dayAr: 'جم', earnings: faker.number.int({ min: 100, max: 250 }) },
    { day: 'Sat', dayAr: 'سب', earnings: faker.number.int({ min: 120, max: 280 }) },
    { day: 'Sun', dayAr: 'أح', earnings: faker.number.int({ min: 90, max: 220 }) },
  ],
  currentWeekTotal: faker.number.int({ min: 500, max: 1500 }),
  totalDeliveriesThisWeek: faker.number.int({ min: 30, max: 80 }),
  bonusThisWeek: faker.number.int({ min: 0, max: 200 }),
  loyaltyPointsEarned: faker.number.int({ min: 50, max: 300 }),
};

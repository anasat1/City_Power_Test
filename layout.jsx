// Static data for City Power site
const T = {
  ar: {
    nav: { home: "الرئيسية", shop: "المتجر", calculator: "حاسبة الطاقة", blog: "المدونة", about: "من نحن", contact: "تواصل معنا" },
    cta: { shop: "تصفح المتجر", calc: "احسب احتياجك", learn: "اعرف المزيد", add: "أضف للسلة", buy: "اطلب الآن", read: "اقرأ المقال", contact: "تواصل معنا" },
    common: {
      sdg: "ج.س", currency: "جنيه سوداني", from: "ابتداءً من", inStock: "متوفر",
      featured: "منتجات مختارة", categories: "الفئات",
    }
  },
  en: {
    nav: { home: "Home", shop: "Shop", calculator: "Calculator", blog: "Blog", about: "About", contact: "Contact" },
    cta: { shop: "Browse store", calc: "Size my system", learn: "Learn more", add: "Add to cart", buy: "Order now", read: "Read article", contact: "Get in touch" },
    common: {
      sdg: "SDG", currency: "Sudanese Pound", from: "Starting at", inStock: "In stock",
      featured: "Featured products", categories: "Categories",
    }
  }
};

const CATEGORIES = [
  { id: "inverters", num: "01", ar: "محوّلات (إنفرتر)", en: "Inverters", count: 12 },
  { id: "panels",    num: "02", ar: "ألواح شمسية", en: "Solar panels", count: 8 },
  { id: "batteries", num: "03", ar: "بطاريات تخزين", en: "Storage batteries", count: 9 },
  { id: "kits",      num: "04", ar: "أنظمة جاهزة", en: "Complete kits", count: 6 },
];

const PRODUCTS = [
  {
    id: "deye-6kw",
    cat: "inverters",
    ar: { name: "محوّل Deye 6kW هايبرد", spec: "إنفرتر هجين، يدعم البطاريات والشبكة، شاشة LCD ذكية." },
    en: { name: "Deye 6kW Hybrid Inverter", spec: "Hybrid inverter, battery + grid, smart LCD." },
    price: 850000, tag: "الأكثر طلباً", tagEn: "BESTSELLER", brand: "Deye", img: "assets/product-deye-6kw.jpg"
  },
  {
    id: "felicity-5kw",
    cat: "inverters",
    ar: { name: "محوّل Felicity 5kW", spec: "إنفرتر MPPT بكفاءة 98%، حماية شاملة." },
    en: { name: "Felicity 5kW Inverter", spec: "98% efficient MPPT inverter, full protection." },
    price: 720000, tag: null, brand: "Felicity", img: "assets/product-felicity-inverter.jpg"
  },
  {
    id: "invt-3kw",
    cat: "inverters",
    ar: { name: "محوّل INVT 3kW", spec: "مناسب للاستخدام المنزلي الخفيف، صامت وقوي." },
    en: { name: "INVT 3kW Inverter", spec: "Quiet, reliable for light home use." },
    price: 540000, tag: "جديد", tagEn: "NEW", isNew: true, brand: "INVT", img: "assets/product-deye-inverter.jpg"
  },
  {
    id: "ja-550w",
    cat: "panels",
    ar: { name: "لوح JA Solar 550W", spec: "لوح أحادي بكفاءة عالية، ضمان أداء 25 سنة." },
    en: { name: "JA Solar 550W Panel", spec: "Mono PERC panel, 25-year output warranty." },
    price: 95000, tag: null, brand: "JA Solar", img: "assets/product-ja-panel.jpg"
  },
  {
    id: "ja-450w",
    cat: "panels",
    ar: { name: "لوح JA Solar 450W", spec: "اقتصادي وموثوق، مثالي للمنازل." },
    en: { name: "JA Solar 450W Panel", spec: "Economical and reliable for homes." },
    price: 78000, tag: null, brand: "JA Solar", img: "assets/product-ja-panel.jpg"
  },
  {
    id: "deye-lithium-5",
    cat: "batteries",
    ar: { name: "بطارية ليثيوم Deye 5.12kWh", spec: "عمر 6000 دورة، ضمان 5 سنوات، LiFePO4." },
    en: { name: "Deye Lithium 5.12kWh", spec: "6000-cycle LiFePO4, 5-year warranty." },
    price: 1100000, tag: "موصى به", tagEn: "RECOMMENDED", brand: "Deye", img: "assets/product-deye-battery.jpg"
  },
  {
    id: "npp-200ah",
    cat: "batteries",
    ar: { name: "بطارية NPP 200Ah جل", spec: "بطارية فيتنامية بدون صيانة، مقاومة للحرارة." },
    en: { name: "NPP 200Ah Gel Battery", spec: "Maintenance-free, heat-resistant Vietnamese battery." },
    price: 320000, tag: null, brand: "NPP", img: "assets/product-npp-battery.jpg"
  },
  {
    id: "npp-150ah",
    cat: "batteries",
    ar: { name: "بطارية NPP 150Ah", spec: "خيار اقتصادي للأنظمة المتوسطة." },
    en: { name: "NPP 150Ah Battery", spec: "Economical option for mid-size systems." },
    price: 240000, tag: null, brand: "NPP", img: "assets/product-npp-battery.jpg"
  },
  {
    id: "kit-home-3kw",
    cat: "kits",
    ar: { name: "نظام منزلي 3kW جاهز", spec: "إنفرتر + 6 ألواح + بطاريتان + كابلات." },
    en: { name: "3kW Home Kit", spec: "Inverter + 6 panels + 2 batteries + cables." },
    price: 1850000, tag: "وفر 12%", tagEn: "SAVE 12%", brand: "City Power", img: "assets/product-ja-panel.jpg"
  },
];

const APPLIANCES = [
  { id: "led",     ar: "إنارة LED",       en: "LED lights",   watts: 12,   icon: "bulb" },
  { id: "fan",     ar: "مروحة سقف",       en: "Ceiling fan",  watts: 75,   icon: "fan" },
  { id: "tv",      ar: "تلفاز",           en: "TV",           watts: 120,  icon: "tv" },
  { id: "fridge",  ar: "ثلاجة",           en: "Refrigerator", watts: 200,  icon: "fridge" },
  { id: "ac",      ar: "مكيّف 1.5 طن",     en: "AC 1.5 ton",   watts: 1500, icon: "ac" },
  { id: "washer",  ar: "غسالة",           en: "Washing machine", watts: 500, icon: "washer" },
  { id: "iron",    ar: "مكواة",           en: "Iron",         watts: 1000, icon: "iron" },
  { id: "pump",    ar: "مضخة ماء",        en: "Water pump",   watts: 750,  icon: "pump" },
  { id: "laptop",  ar: "حاسوب محمول",      en: "Laptop",       watts: 65,   icon: "laptop" },
  { id: "router",  ar: "راوتر / شاحن",    en: "Router/charger", watts: 20, icon: "router" },
];

const POSTS = [
  {
    id: "ja-solar-features",
    ar: { title: "ألواح JA Solar — لماذا هي الخيار الأول للسودانيين؟", excerpt: "نظرة معمّقة على تقنية PERC ومعدلات الكفاءة في الطقس الحار." },
    en: { title: "JA Solar — why it's the first pick in Sudan", excerpt: "A deep look at PERC tech and efficiency in hot climates." },
    cat: { ar: "تقنية", en: "Tech" }, date: "12 مايو 2026", read: "8 دقائق", readEn: "8 min"
  },
  {
    id: "solar-benefits",
    ar: { title: "10 مميزات تجعلك تتحوّل للطاقة الشمسية اليوم", excerpt: "من توفير التكاليف إلى استقلالية الكهرباء وحماية البيئة." },
    en: { title: "10 reasons to switch to solar today", excerpt: "From savings to grid independence to a cleaner planet." },
    cat: { ar: "إرشادات", en: "Guides" }, date: "5 مايو 2026", read: "6 دقائق", readEn: "6 min"
  },
  {
    id: "battery-guide",
    ar: { title: "ليثيوم أم جل؟ كيف تختار البطارية المناسبة لمنزلك", excerpt: "مقارنة شاملة بين أنواع البطاريات الشمسية وحالات استخدامها." },
    en: { title: "Lithium or gel? Picking the right home battery", excerpt: "A complete comparison of battery types for homes." },
    cat: { ar: "مقارنات", en: "Compare" }, date: "28 أبريل 2026", read: "10 دقائق", readEn: "10 min"
  },
  {
    id: "sizing-101",
    ar: { title: "كيف تحسب احتياج منزلك من الطاقة الشمسية؟", excerpt: "دليل خطوة بخطوة لحساب الأحمال واختيار حجم النظام." },
    en: { title: "How to size your home solar system", excerpt: "A step-by-step guide to load calculation and sizing." },
    cat: { ar: "تعليم", en: "Education" }, date: "20 أبريل 2026", read: "12 دقيقة", readEn: "12 min"
  },
  {
    id: "deye-vs-felicity",
    ar: { title: "Deye مقابل Felicity — أيهما أنسب لك؟", excerpt: "تحليل تقني وعملي لأبرز فروقات الإنفرترين الأكثر شعبية." },
    en: { title: "Deye vs Felicity — which fits you?", excerpt: "Technical and practical breakdown of the two top inverters." },
    cat: { ar: "مقارنات", en: "Compare" }, date: "10 أبريل 2026", read: "9 دقائق", readEn: "9 min"
  },
  {
    id: "maintenance",
    ar: { title: "صيانة الألواح الشمسية في موسم الغبار", excerpt: "نصائح عملية للحفاظ على كفاءة نظامك خلال موسم الهبوب." },
    en: { title: "Solar panel maintenance in dust season", excerpt: "Practical tips to keep your system efficient during haboob season." },
    cat: { ar: "صيانة", en: "Maintenance" }, date: "1 أبريل 2026", read: "5 دقائق", readEn: "5 min"
  },
];

window.CP_DATA = { T, CATEGORIES, PRODUCTS, APPLIANCES, POSTS };

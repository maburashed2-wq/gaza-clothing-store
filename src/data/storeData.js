export const C = {
  olive: "#4d5a1e",
  dark: "#3b4616",
  cream: "#f3efe8",
  paper: "#faf8f4",
  sand: "#e9e2d3",
  gold: "#c9b98a",
  red: "#a8262b",
  ink: "#1f1d18",
  line: "#ddd5c4",
};

const U = (id, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  cloth: U("photo-1673551727871-951292d16bef", 900),
  dress: U("photo-1756483510820-4b9302a27556"),
  shirts: U("photo-1584747144270-fd1549a9f6e8"),
  pillow: U("photo-1616735553951-5aec605cfad0"),
};

export const HERO = ["/baner.jfif"];

export const PRODUCTS = [
  { id: 1, en: "Embroidered Thobe", ar: "ثوب مطرز", price: 120, cat: "thobes", imgs: ["/Sthop.jfif"],
    de: "A black cotton thobe with a hand-stitched cross-stitch panel in red, green and gold along the chest and sleeves.", da: "ثوب قطني أسود بلوحة تطريز متصالب يدوية بالأحمر والأخضر والذهبي على الصدر والأكمام." },
  { id: 2, en: "Tatreez Embroidered Jacket", ar: "جاكيت مطرز", price: 95, cat: "jackets", imgs: ["/Jacket.jfif"],
    de: "A deep red jacket with tatreez motifs climbing both sides of the front, lined for cooler evenings.", da: "جاكيت أحمر داكن بزخارف تطريز تتسلق جانبي الواجهة، مبطّن لأمسيات أبرد." },
  { id: 3, en: "Embroidered Linen Shirt", ar: "قميص كتان مطرز", price: 75, cat: "thobes", imgs: ["/shirt.jfif"],
    de: "A breathable beige linen shirt with a stitched collar band and a small embroidered pocket panel.", da: "قميص كتان بيج خفيف بياقة مطرزة وجيب صغير بلوحة تطريز." },
  { id: 4, en: "Tatreez Pillow Cover", ar: "غطاء وسادة مطرز", price: 38, cat: "home", imgs: ["/wesad.jfif"],
    de: "A cushion cover with a central diamond motif in red and black thread on natural cotton. Fits a 45×45 cm insert.", da: "غطاء وسادة بزخرفة معين مركزية بخيط أحمر وأسود على قطن طبيعي. يناسب حشوة 45×45 سم." },
  { id: 5, en: "Heritage Evening Thobe", ar: "ثوب سهرة تراثي", price: 180, cat: "thobes", imgs: ["/1thop.jfif"],
    de: "A long evening thobe with dense chest embroidery, finished over about three weeks by one artisan.", da: "ثوب سهرة طويل بتطريز كثيف على الصدر، تنجزه حرفية واحدة خلال نحو ثلاثة أسابيع." },
  { id: 6, en: "Wool Tatreez Jacket", ar: "جاكيت صوف مطرز", price: 140, cat: "jackets", imgs: ["/soof.jfif"],
    de: "A warm wool-blend jacket with a hand-embroidered back panel inspired by Hebron motifs.", da: "جاكيت دافئ من مزيج الصوف بلوحة ظهر مطرزة يدوياً بزخارف مستوحاة من الخليل." },
  { id: 7, en: "Embroidered Table Runner", ar: "مفرش طاولة مطرز", price: 45, cat: "home", imgs: ["/mfrash.jfif"],
    de: "A linen table runner with a border of small tatreez stars, 150 cm long.", da: "مفرش طاولة كتان بإطار من نجوم تطريز صغيرة، بطول 150 سم." },
  { id: 8, en: "Tatreez Cushion Set", ar: "طقم وسائد مطرزة", price: 82, cat: "home", imgs: ["/2wesada.jfif"],
    de: "A set of two cushion covers in matching red and black patterns.", da: "طقم من غطاءي وسادة بنقوش متناسقة بالأحمر والأسود." },
];

export const COLLECTIONS = [
  { en: "Cross-Stitch Classics", ar: "كلاسيكيات الغرز المتصالب", d: "Red and black geometric patterns passed down through generations.", da: "نقوش هندسية حمراء وسوداء توارثتها الأجيال.", imgs: [IMG.cloth] },
  { en: "Hebron Palette", ar: "ألوان الخليل", d: "Deep reds and bold motifs inspired by Hebron's village dress.", da: "أحمر عميق وزخارف جريئة مستوحاة من ثوب قرى الخليل.", imgs: ["/Hebron.jfif"] },
  { en: "Gaza Coastal Weave", ar: "نسيج ساحل غزة", d: "Light linen and soft threads shaped by the Mediterranean coast.", da: "كتان خفيف وخيوط ناعمة صاغها ساحل المتوسط.", imgs: [IMG.shirts] },
  { en: "Home & Heritage", ar: "البيت والتراث", d: "Pillows and runners that bring tatreez into your home.", da: "وسائد ومفارش تدخل التطريز إلى بيتك.", imgs: ["/Home.jfif"] },
];

export const FILTERS = [["all", "All", "الكل"], ["thobes", "Thobes", "أثواب"], ["jackets", "Jackets", "جاكيتات"], ["home", "Home Accessories", "إكسسوارات منزلية"]];
export const PAGES = [["home", "Home", "الرئيسية"], ["shop", "Shop", "المتجر"], ["collections", "Collections", "المجموعات"], ["about", "About", "من نحن"], ["contact", "Contact", "تواصل"]];
export const SIZES = ["S", "M", "L", "XL"];
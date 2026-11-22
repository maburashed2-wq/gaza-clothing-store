import { useState, useMemo, useEffect, createContext, useContext } from "react";

/* ================= الألوان ================= */
const C = { olive: "#4d5a1e", dark: "#3b4616", cream: "#f3efe8", paper: "#faf8f4", sand: "#e9e2d3", gold: "#c9b98a", red: "#a8262b", ink: "#1f1d18", line: "#ddd5c4" };

/* ================= اللغة: both | EN | AR ================= */
const LangCtx = createContext("both");
const useLang = () => useContext(LangCtx);
const pick = (lang, en, ar) => (lang === "EN" ? en : lang === "AR" ? ar : `${en} / ${ar}`);
const T = ({ en, ar, block }) => {
  const lang = useLang();
  if (lang === "EN") return <>{en}</>;
  if (lang === "AR") return <span lang="ar">{ar}</span>;
  if (block) return <><span style={{ display: "block" }}>{en}</span><span lang="ar" dir="rtl" style={{ display: "block", color: "#555" }}>{ar}</span></>;
  return <>{en} / <span lang="ar">{ar}</span></>;
};

/* ================= الصور (Unsplash) =================
   كل عنصر له قائمة روابط: إذا فشل الأول يجرّب التالي، وأخيراً صورة بديلة.
   لاستبدال أي صورة غيّر الرابط داخل المصفوفات فقط. */
const U = (id, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='400' height='300' fill='#efe8da'/><g fill='none' stroke='#a8262b' stroke-width='6'><path d='M200 60 L260 150 L200 240 L140 150Z'/></g></svg>`);
function Img({ srcs, alt, style }) {
  const [i, setI] = useState(0);
  return <img src={i < srcs.length ? srcs[i] : FALLBACK} alt={alt} loading="lazy" style={{ objectFit: "cover", width: "100%", height: "100%", ...style }} onError={() => setI((n) => n + 1)} />;
}
// صور معبّرة عن التطريز اليدوي والقماش التراثي (تطريز يدوي / ثوب مطرز / قمصان / وسائد)
const IMG = {
  cloth: U("photo-1673551727871-951292d16bef", 900),   // قماش مطرز يدوياً بزهور (البانر + من نحن + مفرش الطاولة)
  dress: U("photo-1756483510820-4b9302a27556"),        // ثوب مخمل مطرز
  shirts: U("photo-1584747144270-fd1549a9f6e8"),       // قمصان بيج/بنية على علاقات
  pillow: U("photo-1616735553951-5aec605cfad0"),       // وسائد حمراء وزرقاء
};
// روابط احتياطية (تُستخدم إذا فشل الرابط الأول)
const UL = {
  thobe: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
  jacket: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  shirt: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
  pillow: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80",
};
const HERO = ["/baner.jfif"];

/* ================= البيانات ================= */
const PRODUCTS = [
  { id: 1, en: "Embroidered Thobe", ar: "ثوب مطرز", price: 120, cat: "thobes", imgs: [],imgs: ["/Sthop.jfif"],
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
const COLLECTIONS = [
  { en: "Cross-Stitch Classics", ar: "كلاسيكيات الغرز المتصالب", d: "Red and black geometric patterns passed down through generations.", da: "نقوش هندسية حمراء وسوداء توارثتها الأجيال.", imgs: [IMG.cloth] },
  { en: "Hebron Palette", ar: "ألوان الخليل", d: "Deep reds and bold motifs inspired by Hebron's village dress.", da: "أحمر عميق وزخارف جريئة مستوحاة من ثوب قرى الخليل.", imgs: ["/Hebron.jfif"] },
  { en: "Gaza Coastal Weave", ar: "نسيج ساحل غزة", d: "Light linen and soft threads shaped by the Mediterranean coast.", da: "كتان خفيف وخيوط ناعمة صاغها ساحل المتوسط.", imgs: [IMG.shirts] },
  { en: "Home & Heritage", ar: "البيت والتراث", d: "Pillows and runners that bring tatreez into your home.", da: "وسائد ومفارش تدخل التطريز إلى بيتك.", imgs: ["/Home.jfif"] },
];
const FILTERS = [["all", "All", "الكل"], ["thobes", "Thobes", "أثواب"], ["jackets", "Jackets", "جاكيتات"], ["home", "Home Accessories", "إكسسوارات منزلية"]];
const PAGES = [["home", "Home", "الرئيسية"], ["shop", "Shop", "المتجر"], ["collections", "Collections", "المجموعات"], ["about", "About", "من نحن"], ["contact", "Contact", "تواصل"]];
const SIZES = ["S", "M", "L", "XL"];

const NavLabel = ({ en, ar }) => {
  const lang = useLang();
  if (lang !== "both") return <T en={en} ar={ar} />;
  return <span className="nl"><span>{en}</span><span className="nsep"> / </span><span lang="ar">{ar}</span></span>;
};

/* ================= الأيقونات ================= */
const Ic = ({ d, size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
const SearchI = () => <Ic d={<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>} />;
const UserI = () => <Ic d={<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>} />;
const CartI = () => <Ic d={<><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.7 12.4a2 2 0 002 1.6h8a2 2 0 002-1.5L21 7H6" /></>} />;
const XI = () => <Ic d={<path d="M18 6L6 18M6 6l12 12" />} />;
const TrashI = () => <Ic size={16} d={<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />} />;
const Logo = () => (
  <svg width="48" height="48" viewBox="0 0 60 60" aria-hidden="true"><g fill="none" stroke={C.gold} strokeWidth="2.2"><path d="M30 4L40 20 56 30 40 40 30 56 20 40 4 30 20 20Z" /><path d="M30 14L37 23 46 30 37 37 30 46 23 37 14 30 23 23Z" stroke={C.olive} /></g><circle cx="30" cy="30" r="3.5" fill={C.red} /></svg>
);
const B = ({ p, sm, style, ...r }) => <button className={`btn ${p ? "btn-p" : "btn-o"} ${sm ? "sm" : ""}`} style={style} {...r} />;

/* زخرفة هندسية تراثية خفيفة (ذهبي باهت) تُستخدم كخلفية للبانر */
const HeroDecor = () => (
  <svg aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25, pointerEvents: "none", zIndex: 0 }}>
    <defs>
      <pattern id="tatreezPattern" width="56" height="56" patternUnits="userSpaceOnUse">
        <g fill="none" stroke={C.gold} strokeWidth="1.4">
          <path d="M28 4L40 16 52 28 40 40 28 52 16 40 4 28 16 16Z" />
          <path d="M28 16L34 22 40 28 34 34 28 40 22 34 16 28 22 22Z" />
        </g>
        <circle cx="28" cy="28" r="2" fill={C.gold} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tatreezPattern)" />
  </svg>
);

/* ================= المنتجات ================= */
function ProductCard({ p, onAdd, onView, imgH = 180, compact }) {
  return (
    <div className="card" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div className="zoom" role="button" tabIndex={0} onClick={() => onView(p)} onKeyDown={(e) => e.key === "Enter" && onView(p)} style={{ height: imgH, cursor: "pointer" }} aria-label={p.en}>
        <Img srcs={p.imgs} alt={p.en} />
      </div>
      <div style={{ padding: compact ? "8px 10px 10px" : "10px 12px 12px", textAlign: "center", display: "flex", flexDirection: "column", flex: 1 }}>
        <div onClick={() => onView(p)} style={{ fontWeight: 600, fontSize: compact ? 13 : 14, cursor: "pointer" }}><T en={p.en} ar={p.ar} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: compact ? 6 : 10, gap: 6 }}>
          <b style={{ fontSize: 14 }}>${p.price.toFixed(2)}</b>
          <B sm onClick={() => onAdd(p, p.cat === "home" ? "—" : "M")}><T en="Add to Cart" ar="إضافة" /></B>
        </div>
      </div>
    </div>
  );
}
const Title = ({ en, ar, sub, subAr, compact }) => (
  <div style={{ textAlign: "center", margin: compact ? "18px 0 12px" : "30px 0 20px" }}>
    <h2 style={{ margin: 0, fontSize: compact ? 22 : 26, color: C.dark }}><T en={en} ar={ar} /></h2>
    {sub && <p style={{ margin: "8px auto 0", color: "#666", maxWidth: 560 }}><T en={sub} ar={subAr} /></p>}
  </div>
);

/* ================= السلة ================= */
function CartBody({ cart, setQty, remove, onClose, onCheckout, onViewCart, listMax }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3 style={{ margin: 0, lineHeight: 1.3 }}><T en="Shopping Cart" ar="عربة التسوق" /></h3>
        {onClose && <button onClick={onClose} aria-label="Close" className="icon">{<XI />}</button>}
      </div>
      <div style={{ flex: 1, overflowY: "auto", margin: "12px 0", minHeight: 90, maxHeight: listMax }}>
        {!cart.length && <p style={{ color: "#777", textAlign: "center", marginTop: 30 }}><T en="Your cart is empty" ar="السلة فارغة" /></p>}
        {cart.map((i) => (
          <div key={i.key} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.line}` }}>
            <div style={{ width: 56, height: 56, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}><Img srcs={i.imgs} alt={i.en} /></div>
            <div style={{ flex: 1, fontSize: 13 }}>
              <div style={{ fontWeight: 600 }}><T en={i.en} ar={i.ar} />{i.size !== "—" && <span style={{ color: "#777" }}> · {i.size}</span>}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                <button className="qb" aria-label="Decrease" onClick={() => setQty(i.key, i.qty - 1)}>−</button>
                <span>Qty {i.qty} × ${i.price.toFixed(2)}</span>
                <button className="qb" aria-label="Increase" onClick={() => setQty(i.key, i.qty + 1)}>+</button>
              </div>
            </div>
            <button className="icon" aria-label="Remove" onClick={() => remove(i.key)} style={{ color: C.red }}><TrashI /></button>
          </div>
        ))}
      </div>
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}><T en="Subtotal" ar="المجموع" />: ${total.toFixed(2)}</div>
      <div style={{ display: "flex", gap: 8 }}>
        {onViewCart && <B onClick={onViewCart} style={{ flex: 1, padding: 11 }}><T en="View Cart" ar="عرض العربة" /></B>}
        <B p disabled={!cart.length} onClick={onCheckout} style={{ flex: 1, padding: 11, opacity: cart.length ? 1 : 0.5 }}><T en="Checkout" ar="الدفع" /></B>
      </div>
    </>
  );
}

/* ================= الصفحات ================= */
function Home({ go, onAdd, onView, cartProps, wide }) {
  const lang = useLang();
  const isAR = lang === "AR";
  return (
    <>
      <section className="hero" style={{ background: C.sand, display: "grid", direction: "ltr", minHeight: "auto", width: "100%", position: "relative", overflow: "hidden" }}>
        <HeroDecor />
        <div dir={isAR ? "rtl" : "ltr"} style={{ padding: "24px clamp(16px,3.5vw,40px)", alignSelf: "center", minWidth: 0, textAlign: isAR ? "right" : "left", position: "relative", zIndex: 1 }}>
          {lang !== "AR" && <h1 className="hero-h1">Traditional Palestinian Embroidery</h1>}
          {lang !== "EN" && <h2 lang="ar" dir="rtl" className={`hero-ar ${isAR ? "main" : ""}`} style={{ textAlign: isAR ? "right" : "left" }}>تطريز فلسطيني تقليدي – مُصَنّع يدوياً بتراث أصيل</h2>}
          <p className="hero-sub"><T en="Handcrafted Tatreez • Ethical • Sustainably Made" ar="تطريز يدوي • أخلاقي • صناعة مستدامة" /></p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: isAR ? "flex-start" : "flex-start", direction: isAR ? "rtl" : "ltr" }}>
            <B p onClick={() => go("shop")}><T en="Shop Now" ar="تسوق الآن" /></B>
            <B onClick={() => go("about")}><T en="Learn More" ar="تعرف أكثر" /></B>
          </div>
        </div>
        <div style={{ padding: 16, alignSelf: "center", position: "relative", zIndex: 1, minWidth: 0 }}>
          <div className="zoom hero-frame" style={{ height: 185, maxHeight: 190, borderRadius: 6, border: `3px solid ${C.paper}`, boxShadow: "0 4px 14px rgba(0,0,0,.12)" }}>
            <Img srcs={HERO} alt="Tatreez embroidered fabric" />
          </div>
        </div>
      </section>
      <div className="home-grid" style={{ padding: "0 clamp(16px,4vw,40px) 24px" }}>
        <div style={{ minWidth: 0 }}>
          <Title compact en="Featured Products" ar="المنتجات المميزة" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12 }}>
            {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} onAdd={onAdd} onView={onView} imgH={220} compact />)}
          </div>
        </div>
        {wide && (
          <aside aria-label="Shopping Cart" style={{ background: C.cream, borderRadius: 10, padding: 16, marginTop: 18, alignSelf: "start", display: "flex", flexDirection: "column", position: "sticky", top: 16, border: `1px solid ${C.line}` }}>
            <CartBody {...cartProps} onClose={null} listMax={200} />
          </aside>
        )}
      </div>
    </>
  );
}
function Shop({ onAdd, onView }) {
  const [f, setF] = useState("all");
  const list = useMemo(() => (f === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === f)), [f]);
  return (
    <div style={{ padding: "0 clamp(16px,4vw,40px) 40px" }}>
      <Title en="Shop" ar="المتجر" sub="Every piece is stitched by hand." subAr="كل قطعة مطرزة يدوياً." />
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 }}>
        {FILTERS.map(([k, en, ar]) => <B key={k} p={f === k} aria-pressed={f === k} onClick={() => setF(k)} style={{ borderRadius: 20, padding: "8px 18px" }}><T en={en} ar={ar} /></B>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 18 }}>
        {list.map((p) => <ProductCard key={p.id} p={p} onAdd={onAdd} onView={onView} />)}
      </div>
    </div>
  );
}
function Collections({ go }) {
  return (
    <div style={{ padding: "0 clamp(16px,4vw,40px) 40px" }}>
      <Title en="Collections" ar="المجموعات" sub="Embroidery families, each with its own story." subAr="عائلات تطريز لكل منها حكايتها." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22 }}>
        {COLLECTIONS.map((c) => (
          <article key={c.en} className="card" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 6, overflow: "hidden" }}>
            <div className="zoom" style={{ height: 190 }}><Img srcs={c.imgs} alt={c.en} /></div>
            <div style={{ padding: 18 }}>
              <h3 style={{ margin: "0 0 8px", color: C.dark }}><T en={c.en} ar={c.ar} /></h3>
              <p style={{ margin: "0 0 14px", fontSize: 14 }}><T block en={c.d} ar={c.da} /></p>
              <B onClick={() => go("shop")}><T en="Explore" ar="استكشف" /></B>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
function About() {
  return (
    <div style={{ padding: "0 clamp(16px,4vw,40px) 50px" }}>
      <Title en="Our Story" ar="قصتنا" />
      <div style={{ display: "flex", gap: 30, flexWrap: "wrap", alignItems: "center" }}>
        <div className="zoom" style={{ width: 340, maxWidth: "100%", height: 300, borderRadius: 6 }}><Img srcs={HERO} alt="Embroidery" /></div>
        <div style={{ flex: "1 1 320px", lineHeight: 1.8 }}>
          <p><T block en="Gaza Clothing Store began with a simple promise: keep tatreez alive. Our embroiderers stitch each motif by hand, using patterns that carry the names of villages, seasons and families across Palestine." ar="بدأ متجر غزة للملابس بوعد بسيط: أن يبقى التطريز حياً. تطرّز نساؤنا كل زخرفة بأيديهن، بنقوش تحمل أسماء القرى والفصول والعائلات في أنحاء فلسطين." /></p>
          <p><T block en="We pay fair wages, use natural fabrics, and ship to the West Bank and Gaza for free." ar="ندفع أجوراً عادلة، ونستخدم أقمشة طبيعية، ونشحن مجاناً إلى الضفة وغزة." /></p>
        </div>
      </div>
    </div>
  );
}
function Contact() {
  const lang = useLang();
  const empty = { name: "", email: "", msg: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState(null); // null | ok | empty | email
  useEffect(() => { if (status !== "ok") return; const t = setTimeout(() => setStatus(null), 7000); return () => clearTimeout(t); }, [status]);
  const set = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); if (status === "empty" || status === "email") setStatus(null); };
  const submit = (e) => {
    e.preventDefault(); // لا إعادة تحميل للصفحة
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) return setStatus("empty");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setStatus("email");
    setStatus("ok");
    setForm(empty); // إفراغ الخانات
  };
  const banner = (ok) => ({ display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px", borderRadius: 8, marginBottom: 18, fontSize: 14, lineHeight: 1.5, animation: "tin .3s ease", background: ok ? "#eef2df" : "#fbeaea", border: `1px solid ${ok ? C.olive : C.red}`, color: ok ? C.dark : C.red });
  return (
    <form onSubmit={submit} noValidate style={{ maxWidth: 520, margin: "0 auto", padding: "0 20px 50px" }}>
      <Title en="Contact" ar="تواصل معنا" />
      {status === "ok" && (
        <div role="status" style={banner(true)}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>✓</span>
          <span><T block en="Your message has been sent successfully. Thank you for contacting us!" ar="تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا" /></span>
        </div>
      )}
      {(status === "empty" || status === "email") && (
        <div role="alert" style={banner(false)}>
          {status === "empty" ? <T block en="Please fill in your name, email and message." ar="يرجى ملء الاسم والبريد الإلكتروني والرسالة." /> : <T block en="Please enter a valid email address." ar="يرجى إدخال بريد إلكتروني صحيح." />}
        </div>
      )}
      {[["name", "Name", "الاسم", "text"], ["email", "Email", "البريد الإلكتروني", "email"]].map(([k, en, ar, t]) => (
        <label key={k} style={{ display: "block", marginBottom: 14, fontSize: 13, fontWeight: 600 }}>{pick(lang, en, ar)}<input className="field" type={t} value={form[k]} onChange={set(k)} dir={k === "email" ? "ltr" : undefined} /></label>
      ))}
      <label style={{ display: "block", marginBottom: 16, fontSize: 13, fontWeight: 600 }}>{pick(lang, "Message", "الرسالة")}<textarea className="field" rows={5} value={form.msg} onChange={set("msg")} /></label>
      <B p type="submit" style={{ width: "100%", padding: 12 }}><T en="Send Message" ar="إرسال" /></B>
    </form>
  );
}

/* ================= النوافذ المنبثقة ================= */
const Overlay = ({ onClose, children, z = 60 }) => (
  <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: z, display: "grid", placeItems: "center", padding: 16, overflowY: "auto" }}>
    <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} style={{ background: C.paper, borderRadius: 8, width: "100%", maxWidth: 720, position: "relative" }}>{children}</div>
  </div>
);
function QuickView({ p, onClose, onAdd }) {
  const [size, setSize] = useState("M");
  const isHome = p.cat === "home";
  return (
    <Overlay onClose={onClose}>
      <button className="icon" onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 10, insetInlineEnd: 10, zIndex: 2, background: "#fffc", borderRadius: 20 }}><XI /></button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        <div className="zoom" style={{ minHeight: 300, borderRadius: "8px 0 0 8px" }}><Img srcs={p.imgs} alt={p.en} /></div>
        <div style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 4px", color: C.dark }}><T en={p.en} ar={p.ar} /></h2>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>${p.price.toFixed(2)}</div>
          <p style={{ lineHeight: 1.7, fontSize: 14 }}><T block en={p.de} ar={p.da} /></p>
          <div style={{ fontWeight: 600, fontSize: 13, margin: "14px 0 8px" }}><T en="Size" ar="المقاس" /></div>
          {isHome ? <div style={{ fontSize: 13, color: "#555" }}><T en="One size" ar="مقاس موحد" /></div> : (
            <div style={{ display: "flex", gap: 8 }}>
              {SIZES.map((s) => <B key={s} p={size === s} aria-pressed={size === s} onClick={() => setSize(s)} style={{ width: 44, padding: "8px 0" }}>{s}</B>)}
            </div>
          )}
          <B p onClick={() => { onAdd(p, isHome ? "—" : size); onClose(); }} style={{ width: "100%", padding: 12, marginTop: 20 }}><T en="Add to Cart" ar="إضافة إلى السلة" /></B>
        </div>
      </div>
    </Overlay>
  );
}
function CheckoutModal({ total, onClose, onDone }) {
  const lang = useLang();
  const [done, setDone] = useState(false);
  return (
    <Overlay onClose={onClose}>
      <div style={{ padding: 26, maxWidth: 420, margin: "0 auto" }}>
        {done ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 44, color: C.olive }}>✓</div>
            <h3><T en="Order placed!" ar="تم استلام طلبك" /></h3>
            <p><T block en="Thank you for supporting Palestinian artisans." ar="شكراً لدعمك الحرفيين الفلسطينيين." /></p>
            <B p onClick={onDone}><T en="Close" ar="إغلاق" /></B>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <h3 style={{ marginTop: 0 }}><T en="Checkout" ar="إتمام الطلب" /></h3>
            {[["Full name", "الاسم الكامل", "text"], ["Phone", "رقم الهاتف", "tel"], ["Address", "العنوان", "text"]].map(([en, ar, t]) => (
              <label key={en} style={{ display: "block", fontSize: 13, marginBottom: 12 }}>{pick(lang, en, ar)}<input className="field" required type={t} /></label>
            ))}
            <p style={{ fontWeight: 700 }}><T en="Total" ar="المجموع" />: ${total.toFixed(2)}</p>
            <div style={{ display: "flex", gap: 10 }}>
              <B type="button" onClick={onClose} style={{ flex: 1 }}><T en="Cancel" ar="إلغاء" /></B>
              <B p type="submit" style={{ flex: 1 }}><T en="Place Order" ar="تأكيد الطلب" /></B>
            </div>
          </form>
        )}
      </div>
    </Overlay>
  );
}

/* ---------- نافذة الحساب (محاكاة واجهة فقط: لا يُرسل شيء لخادم ولا تُخزَّن كلمات المرور) ---------- */
const USER_KEY = "gaza-clothing-user-v1";
const NAMES_KEY = "gaza-clothing-names-v1";
const loadUser = () => { try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; } catch { return null; } };
function AccountModal({ user, onClose, onAuth, onLogout }) {
  const lang = useLang();
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ name: "", email: "", pw: "" });
  const [err, setErr] = useState(false);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr(false); };
  const submit = (e) => {
    e.preventDefault();
    if (f.pw.length < 6) { setErr(true); return; }
    const email = f.email.trim().toLowerCase();
    let names = {};
    try { names = JSON.parse(localStorage.getItem(NAMES_KEY)) || {}; } catch {}
    let name = f.name.trim();
    if (mode === "signup") { names[email] = name; try { localStorage.setItem(NAMES_KEY, JSON.stringify(names)); } catch {} }
    else name = names[email] || email.split("@")[0];
    onAuth({ name, email });
  };
  return (
    <Overlay onClose={onClose}>
      <button className="icon" onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 10, insetInlineEnd: 10 }}><XI /></button>
      <div style={{ padding: "30px 26px 26px", maxWidth: 400, margin: "0 auto" }}>
        {user ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.olive, color: "#fff", display: "grid", placeItems: "center", fontSize: 28, fontWeight: 700, margin: "0 auto 12px" }}>{user.name.charAt(0).toUpperCase()}</div>
            <h2 style={{ margin: "0 0 6px", color: C.dark }}><T en={`Welcome, ${user.name}!`} ar={`أهلاً بك، ${user.name}!`} /></h2>
            <p style={{ color: "#666", margin: "0 0 20px", fontSize: 14 }} dir="ltr">{user.email}</p>
            <div style={{ display: "flex", gap: 10 }}>
              <B onClick={() => { onLogout(); }} style={{ flex: 1 }}><T en="Log out" ar="تسجيل الخروج" /></B>
              <B p onClick={onClose} style={{ flex: 1 }}><T en="Keep shopping" ar="متابعة التسوق" /></B>
            </div>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              <B p={mode === "login"} type="button" aria-pressed={mode === "login"} onClick={() => { setMode("login"); setErr(false); }} style={{ flex: 1 }}><T en="Login" ar="تسجيل الدخول" /></B>
              <B p={mode === "signup"} type="button" aria-pressed={mode === "signup"} onClick={() => { setMode("signup"); setErr(false); }} style={{ flex: 1 }}><T en="Sign Up" ar="إنشاء حساب" /></B>
            </div>
            {mode === "signup" && <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{pick(lang, "Full name", "الاسم الكامل")}<input className="field" required value={f.name} onChange={set("name")} autoComplete="name" /></label>}
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{pick(lang, "Email", "البريد الإلكتروني")}<input className="field" required type="email" value={f.email} onChange={set("email")} autoComplete="email" dir="ltr" /></label>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{pick(lang, "Password", "كلمة المرور")}<input className="field" required type="password" value={f.pw} onChange={set("pw")} autoComplete={mode === "login" ? "current-password" : "new-password"} dir="ltr" /></label>
            {err && <p role="alert" style={{ color: C.red, fontSize: 13, margin: "6px 0 0" }}><T en="Password must be at least 6 characters." ar="يجب ألا تقل كلمة المرور عن 6 أحرف." /></p>}
            <B p type="submit" style={{ width: "100%", padding: 12, marginTop: 16 }}>{mode === "login" ? <T en="Login" ar="دخول" /> : <T en="Create Account" ar="إنشاء الحساب" />}</B>
            <p style={{ fontSize: 11.5, color: "#888", textAlign: "center", margin: "12px 0 0" }}><T en="Demo only — nothing is sent to a server." ar="نسخة تجريبية — لا يُرسل أي شيء إلى خادم." /></p>
          </form>
        )}
      </div>
    </Overlay>
  );
}

/* ================= التطبيق ================= */
const STORE_KEY = "gaza-clothing-cart-v1";
const loadCart = () => { try { const r = JSON.parse(localStorage.getItem(STORE_KEY)); return Array.isArray(r) ? r : []; } catch { return []; } };
const useWide = () => {
  const q = "(min-width: 1024px)";
  const [w, setW] = useState(() => typeof window !== "undefined" && window.matchMedia ? window.matchMedia(q).matches : true);
  useEffect(() => { if (!window.matchMedia) return; const m = window.matchMedia(q); const h = () => setW(m.matches); m.addEventListener("change", h); return () => m.removeEventListener("change", h); }, []);
  return w;
};

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState(loadCart);          // يُقرأ من LocalStorage عند التحميل
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [lang, setLang] = useState("both");
  const [toast, setToast] = useState(null);
  const [view, setView] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(loadUser);
  const [q, setQ] = useState("");
  const wide = useWide();

  useEffect(() => { try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch {} }, [cart]); // حفظ تلقائي
  useEffect(() => { try { user ? localStorage.setItem(USER_KEY, JSON.stringify(user)) : localStorage.removeItem(USER_KEY); } catch {} }, [user]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2400); return () => clearTimeout(t); }, [toast]);
  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") { setView(null); setCheckout(false); setCartOpen(false); setSearchOpen(false); setMenuOpen(false); setAccountOpen(false); } };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);

  const go = (k) => { setPage(k); setSearchOpen(false); setMenuOpen(false); window.scrollTo?.(0, 0); };
  const add = (p, size = "M") => {
    const key = `${p.id}-${size}`;
    setCart((c) => (c.find((i) => i.key === key) ? c.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i)) : [...c, { key, id: p.id, en: p.en, ar: p.ar, price: p.price, imgs: p.imgs, size, qty: 1 }]));
    setToast(Date.now());
  };
  const setQty = (key, n) => setCart((c) => (n < 1 ? c.filter((i) => i.key !== key) : c.map((i) => (i.key === key ? { ...i, qty: n } : i))));
  const remove = (key) => setCart((c) => c.filter((i) => i.key !== key));
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const inlineCart = page === "home" && wide;
  const results = q.trim() ? PRODUCTS.filter((p) => (p.en + " " + p.ar).toLowerCase().includes(q.trim().toLowerCase())) : [];
  // onViewCart: في الصفحة الرئيسية (السلة الثابتة) يفتح العربة الكاملة في لوحة جانبية
  const cartProps = { cart, setQty, remove, onCheckout: () => { setCartOpen(false); setCheckout(true); }, onViewCart: () => setCartOpen(true) };
  const toggleLang = (l) => setLang((c) => (c === l ? "both" : l));

  return (
    <LangCtx.Provider value={lang}>
      <div dir={lang === "AR" ? "rtl" : "ltr"} style={{ fontFamily: "'Segoe UI', Tahoma, 'Noto Naskh Arabic', Arial, sans-serif", background: "#fff", color: C.ink, minHeight: "100vh", width: "100%", maxWidth: "100%", margin: 0, padding: 0, overflowX: "clip", display: "flex", flexDirection: "column", textAlign: "initial" }}>
        <style>{`
          /* عرض كامل: إلغاء قيود قالب Vite الافتراضي (#root max-width / padding / text-align / body flex) */
          html,body,#root{margin:0!important;padding:0!important;width:100%!important;max-width:100%!important;min-width:0}
          body{display:block!important;place-items:initial!important}
          #root{text-align:initial!important;margin:0 auto!important}
          *,*::before,*::after{box-sizing:border-box}
          img{max-width:100%}
          .btn{font-family:inherit;font-weight:600;font-size:13px;padding:9px 16px;border-radius:6px;cursor:pointer;border:1.5px solid ${C.olive};transition:background .25s,color .25s,transform .15s,box-shadow .25s}
          .btn.sm{padding:5px 10px;font-size:12px}
          .btn-p{background:${C.olive};color:#fff}.btn-p:hover{background:${C.dark}}
          .btn-o{background:${C.paper};color:${C.olive}}.btn-o:hover{background:${C.olive};color:#fff}
          .btn:active{transform:scale(.97)}.btn:focus-visible,.icon:focus-visible{outline:2px solid ${C.red};outline-offset:2px}
          .zoom{overflow:hidden}.zoom img{display:block;transition:transform .5s ease}.zoom:hover img{transform:scale(1.08)}
          .card{transition:box-shadow .3s,transform .3s}.card:hover{box-shadow:0 8px 22px rgba(0,0,0,.12);transform:translateY(-2px)}
          .icon{background:none;border:0;cursor:pointer;color:${C.ink};padding:4px;position:relative;transition:color .25s}.icon:hover{color:${C.olive}}
          .qb{width:22px;height:22px;border-radius:4px;border:1px solid ${C.line};background:#fff;cursor:pointer;transition:background .2s}.qb:hover{background:${C.sand}}
          .field{width:100%;padding:10px;margin-top:6px;border:1px solid ${C.line};border-radius:6px;font-family:inherit;font-size:14px;box-sizing:border-box;background:#fff;transition:border-color .25s}.field:focus{outline:none;border-color:${C.olive}}
          .navb{background:none;border:0;cursor:pointer;font-family:inherit;font-size:12.5px;font-weight:600;padding:4px 2px 5px;white-space:nowrap;border-bottom:2px solid transparent;transition:color .25s,border-color .25s;outline:none;-webkit-tap-highlight-color:transparent}.navb:hover{color:${C.olive}}.navb:focus,.navb:focus-visible{outline:none}.navb:focus-visible{border-bottom-color:${C.olive}}

          /* ===== البانر: مدمج، عمود النص أعرض من الصورة ===== */
          .hero{grid-template-columns:1.9fr 1fr;min-height:auto}
          .hero-h1{margin:0;font-size:clamp(15px,4.4vw,38px);font-weight:800;letter-spacing:-.4px;line-height:1.15;color:${C.dark};white-space:nowrap}
          .hero-ar{margin:6px 0 8px;font-size:clamp(13px,3.1vw,20px);font-weight:500;color:${C.ink};line-height:1.5}
          .hero-ar.main{margin:0 0 10px;font-size:clamp(20px,5vw,38px);font-weight:800;color:${C.dark}}
          .hero-sub{margin:0 0 14px;font-size:12px;font-weight:400;color:#6f7550}
          @media(min-width:801px){.hero-h1{font-size:clamp(20px,2.6vw,54px)}.hero-ar{font-size:clamp(15px,1.55vw,24px)}.hero-ar.main{font-size:clamp(22px,3vw,52px)}.hero-sub{font-size:14px}}

          /* ===== الشبكة السفلية: منتجات عريضة (1.8fr) + سلة ثابتة (320px) ===== */
          .home-grid{display:grid;grid-template-columns:1.8fr 320px;gap:24px;align-items:start}
          @media(max-width:1023px){.home-grid{grid-template-columns:1fr}}
          @media(max-width:800px){.hero{grid-template-columns:1fr!important}.hdr{padding:10px 16px!important}}
          .nav-d{display:flex;gap:20px;flex-wrap:nowrap;min-width:0;flex:1;justify-content:space-evenly}.burger{display:none}
          @media(max-width:767px){.nav-d{display:none}.burger{display:inline-flex}}
          @media(min-width:768px) and (max-width:1100px){.logo-t{font-size:15px!important}.logo-a{font-size:12px!important}.nav-d{gap:10px}.navb{font-size:11px}.hdr{padding:8px 16px!important}.nl{display:inline-flex;flex-direction:column;align-items:center;line-height:1.3}.nsep{display:none}}
          @media(min-width:768px){.burger-panel{display:none}}
          .burger-panel .navb{display:block;width:100%;text-align:start;padding:12px 4px;font-size:14px;border-bottom:1px solid ${C.line}}
          @keyframes tin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
          @media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
        `}</style>

        <header className="hdr" style={{ background: C.cream, padding: "8px 32px", position: "relative", borderBottom: `1px solid ${C.line}`, width: "100%" }}>
          <div style={{ position: "absolute", top: 4, insetInlineEnd: 70, fontSize: 11, display: "flex", gap: 3, alignItems: "center" }} dir="ltr">
            {["EN", "AR"].map((l, i) => (
              <span key={l}>{i === 1 && <span style={{ color: "#999" }}>| </span>}
                <button onClick={() => toggleLang(l)} aria-pressed={lang === l} style={{ border: 0, cursor: "pointer", borderRadius: 10, padding: "1px 8px", fontWeight: 700, fontSize: 11, background: lang === l ? C.olive : "transparent", color: lang === l ? "#fff" : C.ink, transition: "background .25s" }}>{l}</button>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "nowrap", paddingTop: 10 }}>
            <div onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }}>
              <Logo />
              <div style={{ lineHeight: 1.15 }}>
                <div className="logo-t" style={{ fontSize: 20, fontWeight: 800, color: C.olive }}>{lang !== "AR" ? "Gaza Clothing Store" : "متجر غزة للملابس"}</div>
                {lang === "both" && <div className="logo-a" lang="ar" style={{ color: C.olive, fontSize: 14 }}>متجر غزة للملابس</div>}
              </div>
            </div>
            <nav className="nav-d" aria-label="Main">
              {PAGES.map(([k, en, ar]) => <button key={k} className="navb" onClick={() => go(k)} aria-current={page === k ? "page" : undefined} style={{ color: page === k ? C.olive : C.ink, borderBottomColor: page === k ? C.olive : "transparent" }}><NavLabel en={en} ar={ar} /></button>)}
            </nav>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
              <button className="icon burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>{menuOpen ? <XI /> : <Ic d={<path d="M3 6h18M3 12h18M3 18h18" />} />}</button>
              <button className="icon" aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen((o) => !o)}><SearchI /></button>
              <button className="icon" aria-label="Account" onClick={() => setAccountOpen(true)}>{user ? <span title={user.name} style={{ width: 26, height: 26, borderRadius: "50%", background: C.olive, color: "#fff", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>{user.name.charAt(0).toUpperCase()}</span> : <UserI />}</button>
              <button className="icon" aria-label="Cart" onClick={() => (inlineCart ? window.scrollTo?.({ top: 300, behavior: "smooth" }) : setCartOpen(true))}>
                <CartI />
                {count > 0 && <span style={{ position: "absolute", top: -3, insetInlineEnd: -5, background: C.red, color: "#fff", borderRadius: 8, fontSize: 10, minWidth: 15, height: 15, display: "grid", placeItems: "center" }}>{count}</span>}
              </button>
            </div>
          </div>
          {menuOpen && (
            <nav className="burger-panel" aria-label="Menu" style={{ marginTop: 8 }}>
              {PAGES.map(([k, en, ar]) => <button key={k} className="navb" onClick={() => go(k)} aria-current={page === k ? "page" : undefined} style={{ color: page === k ? C.olive : C.ink }}><T en={en} ar={ar} /></button>)}
            </nav>
          )}
          {searchOpen && (
            <div style={{ position: "relative", maxWidth: 560, margin: "12px auto 4px" }}>
              <input autoFocus className="field" style={{ marginTop: 0 }} value={q} onChange={(e) => setQ(e.target.value)} placeholder={pick(lang, "Search products…", "ابحث عن منتج…")} aria-label="Search" />
              {q.trim() && (
                <div style={{ position: "absolute", top: "100%", insetInline: 0, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 6, marginTop: 4, zIndex: 30, boxShadow: "0 8px 20px rgba(0,0,0,.12)", maxHeight: 320, overflowY: "auto" }}>
                  {results.length === 0 && <div style={{ padding: 14, color: "#777", fontSize: 13 }}><T en="No products match your search." ar="لا توجد منتجات مطابقة للبحث." /></div>}
                  {results.map((p) => (
                    <button key={p.id} onClick={() => { setView(p); setSearchOpen(false); setQ(""); }} style={{ display: "flex", gap: 10, alignItems: "center", width: "100%", textAlign: "start", padding: 8, border: 0, background: "none", cursor: "pointer", fontFamily: "inherit", borderBottom: `1px solid ${C.line}` }}>
                      <div style={{ width: 42, height: 42, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}><Img srcs={p.imgs} alt="" /></div>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}><T en={p.en} ar={p.ar} /></span>
                      <b style={{ fontSize: 13 }}>${p.price}</b>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </header>

        <main style={{ flex: 1, width: "100%" }}>
          {page === "home" && <Home go={go} onAdd={add} onView={setView} cartProps={cartProps} wide={wide} />}
          {page === "shop" && <Shop onAdd={add} onView={setView} />}
          {page === "collections" && <Collections go={go} />}
          {page === "about" && <About />}
          {page === "contact" && <Contact />}
        </main>

        <footer style={{ background: C.cream, padding: "10px 20px", fontSize: 12.5, display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap", borderTop: `1px solid ${C.line}`, width: "100%" }}>
          <span>• <T en="Free Shipping to West Bank & Gaza" ar="الشحن مجاني للضفة وغزة" /></span>
          <span>• <T en="Handmade in Palestine" ar="مصنوع يدوياً في فلسطين" /></span>
          <span>• <T en="Secure Payment" ar="دفع آمن" /></span>
        </footer>

        {cartOpen && (
          <>
            <div onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.35)", zIndex: 40 }} />
            <aside role="dialog" aria-label="Shopping Cart" style={{ position: "fixed", top: 0, insetInlineEnd: 0, bottom: 0, width: 340, maxWidth: "92vw", background: C.cream, zIndex: 50, padding: 20, display: "flex", flexDirection: "column", boxShadow: "-6px 0 24px rgba(0,0,0,.2)" }}>
              <CartBody {...cartProps} onViewCart={null} onClose={() => setCartOpen(false)} />
            </aside>
          </>
        )}
        {accountOpen && <AccountModal user={user} onClose={() => setAccountOpen(false)} onAuth={setUser} onLogout={() => setUser(null)} />}
        {view && <QuickView p={view} onClose={() => setView(null)} onAdd={add} />}
        {checkout && <CheckoutModal total={total} onClose={() => setCheckout(false)} onDone={() => { setCheckout(false); setCart([]); }} />}

        {toast && (
          <div role="status" aria-live="polite" style={{ position: "fixed", bottom: 24, insetInlineEnd: 24, background: C.dark, color: "#fff", padding: "12px 20px", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,.25)", zIndex: 80, fontSize: 14, animation: "tin .3s ease" }}>
            <T en="Item added to cart successfully ✓" ar="تمت إضافة المنتج إلى السلة بنجاح ✓" />
          </div>
        )}
      </div>
    </LangCtx.Provider>
  );
}
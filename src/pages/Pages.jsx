import { useState, useMemo, useEffect } from "react";
import { C, HERO, PRODUCTS, COLLECTIONS, FILTERS } from "../data/storeData";
import { T, Img, B, Title, HeroDecor, useLang, pick } from "../components/UI";
import { ProductCard, CartBody } from "../components/StoreParts";

export function Home({ go, onAdd, onView, cartProps, wide }) {
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
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-start", direction: isAR ? "rtl" : "ltr" }}>
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

export function Shop({ onAdd, onView }) {
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

export function Collections({ go }) {
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

export function About() {
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

export function Contact() {
  const lang = useLang();
  const empty = { name: "", email: "", msg: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState(null);
  useEffect(() => { if (status !== "ok") return; const t = setTimeout(() => setStatus(null), 7000); return () => clearTimeout(t); }, [status]);
  const set = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); if (status === "empty" || status === "email") setStatus(null); };
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) return setStatus("empty");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setStatus("email");
    setStatus("ok");
    setForm(empty);
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
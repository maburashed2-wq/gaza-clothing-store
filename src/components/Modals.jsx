import { useState } from "react";
import { C, SIZES } from "../data/storeData";
import { T, Img, B, XI, useLang, pick } from "./UI";

const Overlay = ({ onClose, children, z = 60 }) => (
  <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: z, display: "grid", placeItems: "center", padding: 16, overflowY: "auto" }}>
    <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} style={{ background: C.paper, borderRadius: 8, width: "100%", maxWidth: 720, position: "relative" }}>{children}</div>
  </div>
);

export function QuickView({ p, onClose, onAdd }) {
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

export function CheckoutModal({ total, onClose, onConfirmOrder }) {
  const lang = useLang();
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    onConfirmOrder(); // تُفرغ السلة فوراً بمجرد إرسال الطلب!
  };

  return (
    <Overlay onClose={onClose}>
      <div style={{ padding: 26, maxWidth: 420, margin: "0 auto" }}>
        {done ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 44, color: C.olive }}>✓</div>
            <h3><T en="Order placed!" ar="تم استلام طلبك بنجاح!" /></h3>
            <p><T block en="Thank you for supporting Palestinian artisans. Your cart has been cleared." ar="شكراً لدعمك الحرفيين الفلسطينيين. تم إرسال طلبك وتفريغ السلة." /></p>
            <B p onClick={onClose}><T en="Close" ar="إغلاق" /></B>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
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

const NAMES_KEY = "gaza-clothing-names-v1";

export function AccountModal({ user, onClose, onAuth, onLogout }) {
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
    if (mode === "signup") {
      names[email] = name;
      try { localStorage.setItem(NAMES_KEY, JSON.stringify(names)); } catch {}
    } else {
      name = names[email] || email.split("@")[0];
    }
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
              <B onClick={onLogout} style={{ flex: 1 }}><T en="Log out" ar="تسجيل الخروج" /></B>
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
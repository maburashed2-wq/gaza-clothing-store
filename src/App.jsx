import { useState, useEffect } from "react";
import { C, PRODUCTS, PAGES } from "./data/storeData";
import { LangCtx, T, NavLabel, Img, Ic, SearchI, UserI, CartI, XI, Logo, pick } from "./components/UI";
import { CartBody } from "./components/StoreParts";
import { QuickView, CheckoutModal, AccountModal } from "./components/Modals";
import { Home, Shop, Collections, About, Contact } from "./pages/Pages";

const STORE_KEY = "gaza-clothing-cart-v1";
const USER_KEY = "gaza-clothing-user-v1";
const loadCart = () => { try { const r = JSON.parse(localStorage.getItem(STORE_KEY)); return Array.isArray(r) ? r : []; } catch { return []; } };
const loadUser = () => { try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; } catch { return null; } };

const useWide = () => {
  const q = "(min-width: 1024px)";
  const [w, setW] = useState(() => typeof window !== "undefined" && window.matchMedia ? window.matchMedia(q).matches : true);
  useEffect(() => { if (!window.matchMedia) return; const m = window.matchMedia(q); const h = () => setW(m.matches); m.addEventListener("change", h); return () => m.removeEventListener("change", h); }, []);
  return w;
};

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState(loadCart);
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

  useEffect(() => { try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch {} }, [cart]);
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
  const cartProps = { cart, setQty, remove, onCheckout: () => { setCartOpen(false); setCheckout(true); }, onViewCart: () => setCartOpen(true) };
  const toggleLang = (l) => setLang((c) => (c === l ? "both" : l));

  return (
    <LangCtx.Provider value={lang}>
      <div dir={lang === "AR" ? "rtl" : "ltr"} style={{ fontFamily: "'Segoe UI', Tahoma, 'Noto Naskh Arabic', Arial, sans-serif", background: "#fff", color: C.ink, minHeight: "100vh", width: "100%", maxWidth: "100%", margin: 0, padding: 0, overflowX: "clip", display: "flex", flexDirection: "column", textAlign: "initial" }}>
        <style>{`
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
          .hero{grid-template-columns:1.9fr 1fr;min-height:auto}
          .hero-h1{margin:0;font-size:clamp(15px,4.4vw,38px);font-weight:800;letter-spacing:-.4px;line-height:1.15;color:${C.dark};white-space:nowrap}
          .hero-ar{margin:6px 0 8px;font-size:clamp(13px,3.1vw,20px);font-weight:500;color:${C.ink};line-height:1.5}
          .hero-ar.main{margin:0 0 10px;font-size:clamp(20px,5vw,38px);font-weight:800;color:${C.dark}}
          .hero-sub{margin:0 0 14px;font-size:12px;font-weight:400;color:#6f7550}
          @media(min-width:801px){.hero-h1{font-size:clamp(20px,2.6vw,54px)}.hero-ar{font-size:clamp(15px,1.55vw,24px)}.hero-ar.main{font-size:clamp(22px,3vw,52px)}.hero-sub{font-size:14px}}
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
        {checkout && <CheckoutModal total={total} onClose={() => setCheckout(false)} onConfirmOrder={() => setCart([])} />}

        {toast && (
          <div role="status" aria-live="polite" style={{ position: "fixed", bottom: 24, insetInlineEnd: 24, background: C.dark, color: "#fff", padding: "12px 20px", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,.25)", zIndex: 80, fontSize: 14, animation: "tin .3s ease" }}>
            <T en="Item added to cart successfully ✓" ar="تمت إضافة المنتج إلى السلة بنجاح ✓" />
          </div>
        )}
      </div>
    </LangCtx.Provider>
  );
}
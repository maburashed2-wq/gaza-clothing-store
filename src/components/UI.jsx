import { useState, createContext, useContext } from "react";
import { C } from "../data/storeData";

/* ================= اللغة ================= */
export const LangCtx = createContext("both");
export const useLang = () => useContext(LangCtx);
export const pick = (lang, en, ar) => (lang === "EN" ? en : lang === "AR" ? ar : `${en} / ${ar}`);

export const T = ({ en, ar, block }) => {
  const lang = useLang();
  if (lang === "EN") return <>{en}</>;
  if (lang === "AR") return <span lang="ar">{ar}</span>;
  if (block) return <><span style={{ display: "block" }}>{en}</span><span lang="ar" dir="rtl" style={{ display: "block", color: "#555" }}>{ar}</span></>;
  return <>{en} / <span lang="ar">{ar}</span></>;
};

export const NavLabel = ({ en, ar }) => {
  const lang = useLang();
  if (lang !== "both") return <T en={en} ar={ar} />;
  return <span className="nl"><span>{en}</span><span className="nsep"> / </span><span lang="ar">{ar}</span></span>;
};

/* ================= الصور والأزرار ================= */
const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='400' height='300' fill='#efe8da'/><g fill='none' stroke='#a8262b' stroke-width='6'><path d='M200 60 L260 150 L200 240 L140 150Z'/></g></svg>`);

export function Img({ srcs, alt, style }) {
  const [i, setI] = useState(0);
  return <img src={i < srcs.length ? srcs[i] : FALLBACK} alt={alt} loading="lazy" style={{ objectFit: "cover", width: "100%", height: "100%", ...style }} onError={() => setI((n) => n + 1)} />;
}

export const B = ({ p, sm, style, ...r }) => <button className={`btn ${p ? "btn-p" : "btn-o"} ${sm ? "sm" : ""}`} style={style} {...r} />;

export const Title = ({ en, ar, sub, subAr, compact }) => (
  <div style={{ textAlign: "center", margin: compact ? "18px 0 12px" : "30px 0 20px" }}>
    <h2 style={{ margin: 0, fontSize: compact ? 22 : 26, color: C.dark }}><T en={en} ar={ar} /></h2>
    {sub && <p style={{ margin: "8px auto 0", color: "#666", maxWidth: 560 }}><T en={sub} ar={subAr} /></p>}
  </div>
);

/* ================= الأيقونات والشعار ================= */
export const Ic = ({ d, size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
export const SearchI = () => <Ic d={<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>} />;
export const UserI = () => <Ic d={<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>} />;
export const CartI = () => <Ic d={<><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.7 12.4a2 2 0 002 1.6h8a2 2 0 002-1.5L21 7H6" /></>} />;
export const XI = () => <Ic d={<path d="M18 6L6 18M6 6l12 12" />} />;
export const TrashI = () => <Ic size={16} d={<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />} />;

export const Logo = () => (
  <svg width="48" height="48" viewBox="0 0 60 60" aria-hidden="true">
    <g fill="none" stroke={C.gold} strokeWidth="2.2">
      <path d="M30 4L40 20 56 30 40 40 30 56 20 40 4 30 20 20Z" />
      <path d="M30 14L37 23 46 30 37 37 30 46 23 37 14 30 23 23Z" stroke={C.olive} />
    </g>
    <circle cx="30" cy="30" r="3.5" fill={C.red} />
  </svg>
);

export const HeroDecor = () => (
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
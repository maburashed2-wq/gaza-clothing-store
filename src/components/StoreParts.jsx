import { C } from "../data/storeData";
import { T, Img, B, XI, TrashI } from "./UI";

export function ProductCard({ p, onAdd, onView, imgH = 180, compact }) {
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

export function CartBody({ cart, setQty, remove, onClose, onCheckout, onViewCart, listMax }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3 style={{ margin: 0, lineHeight: 1.3 }}><T en="Shopping Cart" ar="عربة التسوق" /></h3>
        {onClose && <button onClick={onClose} aria-label="Close" className="icon"><XI /></button>}
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
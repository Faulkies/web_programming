// src/cart/CartProvider.jsx
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

const CartContext = createContext(null);

function load() {
  try { return JSON.parse(localStorage.getItem("cart:v1")) ?? { items: [] }; }
  catch { return { items: [] }; }
}
function save(state) {
  localStorage.setItem("cart:v1", JSON.stringify(state));
}

// Each item key = `${productId}:${sourceId}`
function keyOf(pId, sId) { return `${pId}:${sId}`; }

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { item } = action;
      const k = keyOf(item.productId, item.sourceId);
      const existing = state.items.find(i => i.key === k);
      let items;
      if (existing) {
        const qty = Math.min(existing.quantity + item.quantity, item.maxQty ?? Infinity);
        items = state.items.map(i => i.key === k ? { ...i, quantity: qty, price: item.price } : i);
      } else {
        items = [...state.items, { ...item, key: k }];
      }
      return { ...state, items };
    }
    case "UPDATE_QTY": {
      const { productId, sourceId, quantity, maxQty } = action;
      const k = keyOf(productId, sourceId);
      const q = Math.max(0, Math.min(quantity, maxQty ?? Infinity));
      const items = state.items
        .map(i => i.key === k ? { ...i, quantity: q } : i)
        .filter(i => i.quantity > 0);
      return { ...state, items };
    }
    case "REMOVE": {
      const { productId, sourceId } = action;
      const k = keyOf(productId, sourceId);
      return { ...state, items: state.items.filter(i => i.key !== k) };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const [open, setOpen] = useState(false);

  useEffect(() => { save(state); }, [state]);

  const totals = useMemo(() => {
    const subtotal = state.items.reduce((s, i) => s + (Number(i.price || 0) * i.quantity), 0);
    const count = state.items.reduce((s, i) => s + i.quantity, 0);
    return { count, subtotal, total: subtotal }; // add tax/shipping later
  }, [state.items]);

  const api = useMemo(() => ({
    items: state.items,
    ...totals,
    open,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),

    addItem: (item) => { dispatch({ type: "ADD", item }); setOpen(true); },
    updateItem: (productId, sourceId, quantity, maxQty) =>
      dispatch({ type: "UPDATE_QTY", productId, sourceId, quantity, maxQty }),
    removeItem: (productId, sourceId) =>
      dispatch({ type: "REMOVE", productId, sourceId }),
    clear: () => dispatch({ type: "CLEAR" }),
  }), [state.items, totals, open]);

  return (
    <CartContext.Provider value={api}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

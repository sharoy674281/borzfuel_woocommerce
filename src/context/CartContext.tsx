"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types/cart";

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartState {
  items: CartItem[];
}

export interface AppliedCoupon {
  code: string;
  discount_type: string;
  amount: string;
  minimum_amount: string;
}

interface CartContextValue extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  coupon: AppliedCoupon | null;
  couponDiscount: number;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter((i) => i.id !== action.payload.id),
        };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    case "LOAD_CART":
      return { items: action.payload };
    default:
      return state;
  }
}

const CART_STORAGE_KEY = "borzfuel-cart";
const COUPON_STORAGE_KEY = "borzfuel-coupon";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Load cart and coupon from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) });
      }
      const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (savedCoupon) {
        setCoupon(JSON.parse(savedCoupon));
      }
    } catch {}
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  // Persist coupon to localStorage
  useEffect(() => {
    if (coupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [coupon]);

  const addItem = useCallback(
    (item: CartItem) => {
      dispatch({ type: "ADD_ITEM", payload: item });
      openDrawer();
    },
    [openDrawer]
  );

  const removeItem = (id: number) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    setCoupon(null);
  };

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + Number(i.price) * i.quantity,
    0
  );

  // Calculate coupon discount
  let couponDiscount = 0;
  if (coupon) {
    const minAmount = parseFloat(coupon.minimum_amount) || 0;
    if (totalPrice >= minAmount) {
      if (coupon.discount_type === "percent") {
        couponDiscount = totalPrice * (parseFloat(coupon.amount) / 100);
      } else {
        // fixed_cart or fixed_product
        couponDiscount = Math.min(parseFloat(coupon.amount), totalPrice);
      }
    }
  }

  const applyCoupon = useCallback((c: AppliedCoupon) => setCoupon(c), []);
  const removeCoupon = useCallback(() => setCoupon(null), []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        drawerOpen,
        openDrawer,
        closeDrawer,
        coupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

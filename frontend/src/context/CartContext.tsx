import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (ticketId: string) => void;
  updateQuantity: (ticketId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  getCartItem: (ticketId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.ticketId === newItem.ticketId);
      if (existing) {
        const newQuantity = Math.min(existing.quantity + 1, existing.maxPerOrder);
        return prevItems.map((i) =>
          i.ticketId === newItem.ticketId ? { ...i, quantity: newQuantity } : i
        );
      }
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (ticketId: string) => {
    setItems((prev) => prev.filter((i) => i.ticketId !== ticketId));
  };

  const updateQuantity = (ticketId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.ticketId === ticketId
          ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxPerOrder)) }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const getCartItem = (ticketId: string) => items.find((i) => i.ticketId === ticketId);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, getCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

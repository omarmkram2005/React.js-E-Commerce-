import { createContext, useState } from "react";

export const openCart = createContext("");
export default function CartContext({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <openCart.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </openCart.Provider>
  );
}

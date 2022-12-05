import React, { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const[cartHeader, setCartHeader] = useState(null);
  const [isEmptyCart, setIsEmptyCart] = useState(false);
  const [isLocalStorage, setIsLocalStorage] = useState(false);
  return (
    <CartContext.Provider value={{cartHeader, setCartHeader, isEmptyCart, setIsEmptyCart, isLocalStorage, setIsLocalStorage}}>
      {children}
    </CartContext.Provider>
  );
};
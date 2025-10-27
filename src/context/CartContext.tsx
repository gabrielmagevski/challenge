import React, { createContext, useContext, useMemo } from "react";
import { useAddToCart, CartProduct } from "../hooks/useAddToCart";
import { Product } from "../ts/Product";

type CartContextProps = {
  addToCart: CartProduct[];
  setAddToCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  handleAddToCart: (sku: Product) => void;
  handleRemoveToCart: (sku: Product) => void;
  openMinicart: boolean;
  setOpenMinicart: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenMinicart: () => void;
};

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    handleAddToCart,
    handleRemoveToCart,
    addToCart,
    setAddToCart,
    openMinicart,
    setOpenMinicart,
    handleOpenMinicart,
  } = useAddToCart();

  const value = useMemo(
    () => ({
      handleAddToCart,
      handleRemoveToCart,
      addToCart,
      setAddToCart,
      openMinicart,
      setOpenMinicart,
      handleOpenMinicart,
    }),
    [
      handleAddToCart,
      handleRemoveToCart,
      addToCart,
      setAddToCart,
      openMinicart,
      setOpenMinicart,
      handleOpenMinicart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext deve ser usado dentro de CartProvider");
  return context;
};

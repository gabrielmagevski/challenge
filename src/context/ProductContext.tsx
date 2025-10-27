import React, { createContext, useContext } from "react";
import { useProduct } from "../hooks/useProduct";
import { Product } from "../ts/Product";

type ProductContextProps = {
  listProducts: Product[];
};

const ProductContext = createContext<ProductContextProps | null>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const { listProducts } = useProduct();

  return (
    <ProductContext.Provider value={{ listProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProductContext deve ser usado dentro de ProductProvider");
  return context;
};

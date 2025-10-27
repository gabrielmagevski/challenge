import React from "react";
import { ProductProvider } from "./ProductContext";
import { FilterProvider } from "./FilterContext";
import { CartProvider } from "./CartContext";
import { MobileProvider } from "./MobileContext";

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProductProvider>
      <FilterProvider>
        <CartProvider>
          <MobileProvider>{children}</MobileProvider>
        </CartProvider>
      </FilterProvider>
    </ProductProvider>
  );
};

export default CategoryProvider;
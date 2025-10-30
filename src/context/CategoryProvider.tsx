import React from "react";
import { ProductProvider } from "./ProductContext";
import { FilterProvider } from "./FilterContext";
import { CartProvider } from "./CartContext";
import { MobileProvider } from "./MobileContext";
import { FilterWithProductsProvider } from "./FilterWithProductsContext";

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MobileProvider>
      <CartProvider>
        <ProductProvider>
          <FilterProvider>
            <FilterWithProductsProvider>{children}</FilterWithProductsProvider>
          </FilterProvider>
        </ProductProvider>
      </CartProvider>
    </MobileProvider>
  );
};

export default CategoryProvider;

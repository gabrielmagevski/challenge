import React, { createContext, useContext } from "react";
import { Product } from "../ts/Product";
import { useFilterWithProducts } from "../hooks/useFilterWithProducts";

type FilterWithProductsCtx = {
  searchNewProduct: Product[];
  columnFilters: { type: string; items: string[] }[];
  ordeByFilter: { type: string; items: (string | number)[] }[];
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
};

const FilterWithProducts = createContext<FilterWithProductsCtx | null>(null);

export const FilterWithProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const values = useFilterWithProducts();
  return <FilterWithProducts.Provider value={values}>{children}</FilterWithProducts.Provider>;
};


export const useFilterWithProductsContext = () => {
  const context = useContext(FilterWithProducts);
  if (!context) throw new Error("useFilterContext deve ser usado dentro de FilterProvider");
  return context;
};

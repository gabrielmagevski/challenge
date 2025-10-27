import React, { createContext, useContext, useState, useMemo } from "react";
import { useCheckedInputFilter } from "../hooks/useCheckedInputFilter";
import { useFilter } from "../hooks/useFilter";
import { Product } from "../ts/Product";
import { useProductContext } from "./ProductContext";

type FilterContextProps = {
  searchNewProduct: Product[];
  columnFilters: { type: string; items: string[] }[];
  ordeByFilter: { type: string; items: (string | number)[] }[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: { [key: string]: boolean };
  applyFilters: () => void;
  clearFilters: () => void;
  setIsChecked: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
};

const FilterContext = createContext<FilterContextProps | null>(null);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const { listProducts } = useProductContext();
  const { handleCheckboxChange, isChecked, appliedFilters, applyFilters, clearFilters, setIsChecked } = useCheckedInputFilter();

  const [orderBy, setOrderBy] = useState("");
  const { searchNewProduct, columnFilters, ordeByFilter } = useFilter(
    listProducts,
    // usar isMobile para decidir qual estado passar
    typeof window !== "undefined" && window.innerWidth <= 768 ? appliedFilters : isChecked,
    orderBy
  );

  const value = useMemo(
    () => ({
      searchNewProduct,
      columnFilters,
      ordeByFilter,
      handleCheckboxChange,
      isChecked,
      applyFilters,
      clearFilters,
      setIsChecked,
      orderBy,
      setOrderBy,
    }),
    [
      searchNewProduct,
      columnFilters,
      ordeByFilter,
      handleCheckboxChange,
      isChecked,
      appliedFilters,
      applyFilters,
      clearFilters,
      setIsChecked,
      orderBy,
    ]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};


export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilterContext deve ser usado dentro de FilterProvider");
  return context;
};

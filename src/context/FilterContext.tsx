import React, { createContext, useContext, useMemo } from "react";
import { useCheckedInputFilter } from "../hooks/useCheckedInputFilter";

type FilterContextProps = {
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: { [key: string]: boolean };
  applyFilters: () => void;
  clearFilters: () => void;
  setIsChecked: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

const FilterContext = createContext<FilterContextProps | null>(null);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const { 
    handleCheckboxChange,
    isChecked,
    appliedFilters,
    applyFilters,
    clearFilters,
    setIsChecked
  } = useCheckedInputFilter();

  const value = useMemo(
    () => ({
      handleCheckboxChange,
      isChecked,
      applyFilters,
      clearFilters,
      setIsChecked,
    }),
    [
      handleCheckboxChange,
      isChecked,
      appliedFilters,
      applyFilters,
      clearFilters,
      setIsChecked,
    ]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};


export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilterContext deve ser usado dentro de FilterProvider");
  return context;
};

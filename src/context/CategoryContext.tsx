import React, { useContext, createContext, ReactNode, useMemo, useState } from 'react';
import { useProduct } from '../hooks/useProduct';
import { Product } from '../ts/Product';
import { useCheckedInputFilter } from '../hooks/useCheckedInputFilter';
import { useFilter } from '../hooks/useFilter';
import { CartProduct, useAddToCart } from '../hooks/useAddToCart';
import { useFilterMobile } from '../hooks/useFilterMobile';

type ProviderProps = {
  children: ReactNode;
};

type useCategoryContextProps = {
  listProducts: Product[]
  searchNewProduct: Product[]
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isChecked: {
    [key: string]: boolean;
  }
  columnFilters: {type: string, items: string[]}[]
  handleAddToCart: (sku: Product) => void;
  handleRemoveToCart: (sku: Product) => void;
  addToCart: CartProduct[]
  setAddToCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  openMinicart: boolean;
  handleOpenMinicart: () => void;
  setOpenMinicart: React.Dispatch<React.SetStateAction<boolean>>;
  ordeByFilter: {type: string, items: (string | number)[]}[]
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>,
  handleOpenMobile: (filterName: string) => void;
  setOpenMobileFilter: React.Dispatch<React.SetStateAction<string | null>>
  openMobileFilter: string | null
}
const CategoryContext = createContext<null | useCategoryContextProps>(null);

export const CategoryProvider = ({ children }: ProviderProps) => {
  const { listProducts } = useProduct()
  const { handleCheckboxChange, isChecked } = useCheckedInputFilter()
  const { handleOpenMobile, setOpenMobileFilter, openMobileFilter } = useFilterMobile();
  const [orderBy, setOrderBy] = useState<string>("");
  const { searchNewProduct, columnFilters, ordeByFilter } = useFilter(listProducts, isChecked, orderBy)
  const { handleAddToCart, handleRemoveToCart, addToCart, setAddToCart, openMinicart, setOpenMinicart, handleOpenMinicart} = useAddToCart();


  const values = useMemo(() => ({
    listProducts,
    handleCheckboxChange,
    isChecked, 
    searchNewProduct,
    columnFilters,
    ordeByFilter,
    orderBy,
    setOrderBy,
    handleAddToCart,
    handleRemoveToCart,
    addToCart,
    setAddToCart,
    openMinicart, 
    setOpenMinicart, 
    handleOpenMinicart,
    handleOpenMobile,
    setOpenMobileFilter, 
    openMobileFilter 
  }), [
    listProducts,
    handleCheckboxChange,
    isChecked, 
    searchNewProduct,
    columnFilters,
    handleAddToCart,
    handleRemoveToCart,
    addToCart,
    setAddToCart,
    openMinicart, 
    setOpenMinicart, 
    handleOpenMinicart,
    orderBy,
    setOrderBy,
    handleOpenMobile,
    setOpenMobileFilter, 
    openMobileFilter 
  ]);

  return (
    <CategoryContext.Provider value={values}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = (): useCategoryContextProps => {
  const context = useContext(CategoryContext);

  if (!context) throw new Error("Doesnt exists Context");

  return context;
};

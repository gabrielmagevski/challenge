import { useState } from "react";
import { Product } from "../ts/Product";

export interface CartProduct extends Product {
  qty: number;
}

export const useAddToCart = () => {
  const [openMinicart, setOpenMinicart] = useState<boolean>(false);
  const [addToCart, setAddToCart] = useState<CartProduct[]>([]);

  const handleOpenMinicart = () => {
    setOpenMinicart(valueOld => !valueOld)
  }
  
  const handleAddToCart = (sku: Product) => {
    setAddToCart((old) => {
      const existingProduct = old.find((item) => item.id === sku.id);
  
      if (existingProduct) {
        return old.map((item) =>
          item.id === sku.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      
      handleOpenMinicart();
      return [...old, { ...sku, qty: 1 }];
    });

    
  };

  const handleRemoveToCart = (sku: Product) => {
    setAddToCart((old) => {
      const newMinicart = old.filter((item) => item.id !== sku.id)

      return newMinicart;
    })
  }

  return { handleAddToCart, addToCart, setAddToCart, handleRemoveToCart, handleOpenMinicart, openMinicart, setOpenMinicart }
}


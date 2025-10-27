import { useEffect, useState } from "react";
import { Product } from "../ts/Product";
import { getListProductService } from "../services/ListProductService";

export const useProduct = () => {
  const [listProducts, setListProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getListProductService("http://localhost:5000/products");
        setListProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    
    fetchProducts();
  }, []);

  return {
    listProducts,
    setListProducts
  };
};

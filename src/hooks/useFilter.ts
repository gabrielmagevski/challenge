import { useEffect, useMemo, useState } from "react";
import { Product } from "../ts/Product";
import { formatCurrency } from "../utils/formatCurrency";

export const useFilter = (
  products: Product[],
  isChecked: { [key: string]: boolean },
  orderBy: string
) => {
  const [searchNewProduct, setSearchNewProduct] = useState<Product[]>([]);
  const [columnFilters, setColumnFilters] = useState<{ type: string; items: string[] }[]>([]);
  const [ordeByFilter, setOrderByFilter] = useState<{ type: string; items: (string | number)[] }[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 

  const { colors, sizes, ranges } = useMemo(() => {
    const uniqueColors = Array.from(new Set(products.map(p => p.color)));
    const uniqueSizes = Array.from(new Set(products.map(p => p.size).flat(1)));
    const prices = products.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const priceRanges: string[] = [];
    const step = 50;
    for (let i = 0; i < maxPrice; i += step) {
      const rangeStart = i;
      const rangeEnd = i + step - 1;
      if (prices.some(price => price >= rangeStart && price <= rangeEnd)) {
        priceRanges.push(`de ${formatCurrency(rangeStart)} até ${formatCurrency(rangeEnd)}`);
      }
    }

    const lastStep = Math.floor(maxPrice / step) * step;
    if (prices.some(p => p > lastStep + step - 1)) {
      priceRanges.push(`${lastStep + step}-`);
    }

    return { colors: uniqueColors, sizes: uniqueSizes, ranges: priceRanges };
  }, [products]);

  useEffect(() => {
    setColumnFilters([
      { type: "Cores", items: colors },
      { type: "Tamanhos", items: sizes },
      { type: "Faixa de Preço", items: ranges },
    ]);

    setOrderByFilter([{ type: "Ordenar Por:", items: ["Mais recentes", "Menor preço", "Maior preço"] }]);
  }, [colors, sizes, ranges]);

  useEffect(() => {
    const activeFilters = Object.keys(isChecked);
    if (activeFilters.length === 0) {
      setFilteredProducts(products);
      return;
    }

    let filtered = [...products];

    const colorFilters = activeFilters.filter(f => colors.includes(f));
    const sizeFilters = activeFilters.filter(f => sizes.includes(f));
    const priceFilters = activeFilters.filter(f => ranges.includes(f));

    if (colorFilters.length > 0) {
      filtered = filtered.filter(p => colorFilters.includes(p.color));
    }

    if (sizeFilters.length > 0) {
      filtered = filtered.filter(p => p.size.some(s => sizeFilters.includes(s)));
    }

    if (priceFilters.length > 0) {
      filtered = filtered.filter(p => {
        return priceFilters.some(filter => {
          const match = filter.match(/de R\$\s([\d.,]+) até R\$\s([\d.,]+)/);
          if (match) {
            const min = parseFloat(match[1].replace('.', '').replace(',', '.'));
            const max = parseFloat(match[2].replace('.', '').replace(',', '.'));
            return p.price >= min && p.price <= max;
          }
          const lastStepMatch = filter.match(/^(\d+)-/);
          if (lastStepMatch) {
            const min = parseInt(lastStepMatch[1], 10);
            return p.price >= min;
          }
          return false;
        });
      });
    }

    setFilteredProducts(filtered);
  }, [products, isChecked, colors, sizes, ranges]);

  useEffect(() => {
    let ordered = [...filteredProducts];
    switch (orderBy) {
      case "Mais recentes":
        ordered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "Menor preço":
        ordered.sort((a, b) => a.price - b.price);
        break;
      case "Maior preço":
        ordered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setSearchNewProduct(ordered);
  }, [orderBy, filteredProducts]);

  return { searchNewProduct, columnFilters, ordeByFilter };
};

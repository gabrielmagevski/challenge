import { useEffect, useMemo, useState } from "react";
import { Product } from "../ts/Product";
import { formatCurrency } from './../utils/formatCurrency';

export const useFilter = (products: Product[], isChecked: { [key: string]: boolean }, orderBy: string) => {
  const [searchNewProduct, setSearchNewProduct] = useState<Product[]>([]);
  const [columnFilters, setColumnFilters] = useState<{type: string, items: string[]}[]>([]);
  const [ordeByFilter, setOrderByFilter] = useState<{type: string, items: (string | number)[]}[]>([]);
  

  const { colors, sizes, ranges, recents, minPrice, maxPrice } = useMemo(() => {
    const uniqueColors = Array.from(new Set(products.map(product => product.color)));
    const uniqueSizes = Array.from(new Set(products.map(product => product.size).flat(1)));

    const productRecents = Array.from(new Set(products.map((product) => product.date)))

    const prices = products.map(product => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRanges: string[] = [];

    if (minPrice && maxPrice) {
      const step = 50;
      for (let i = 0; i < maxPrice; i += step) {
        const rangeStart = i;
        const rangeEnd = i + step -1;
        if (prices.some(product => product >= rangeStart && product <= rangeEnd)) {
          priceRanges.push(`de ${formatCurrency(rangeStart)} até ${formatCurrency(rangeEnd)}`);
        }
      }
      const lastStep = Math.floor(maxPrice / step) * step;
      if (prices.some(product => product > lastStep + step - 1)) {
        priceRanges.push(`${lastStep + step}-`);
      }
    }

    return { colors: uniqueColors, sizes: uniqueSizes, ranges: priceRanges, recents: productRecents, minPrice, maxPrice };
  }, [products]);

  useEffect(() => {
    setColumnFilters([
      { type: 'Cores', items: colors },
      { type: 'Tamanhos', items: sizes },
      { type: 'Faixa de Preço', items: ranges }
    ]);

  }, [colors, sizes, ranges]);

  useEffect(() => {
    setOrderByFilter([
      { type: "Ordenar Por:", items: ["Mais recentes", "Menor preço", "Maior preço"] },
    ])
  }, [recents, minPrice, maxPrice])

  useEffect(() => {
    const activeFilters = Object.keys(isChecked);

    let filtered = [...products];

    const colorFilters = activeFilters.filter(f => colors.includes(f));
    const sizeFilters = activeFilters.filter(f => sizes.includes(f));
    const priceFilters = activeFilters.filter(f => ranges.includes(f));

    if (colorFilters.length > 0) {
      filtered = filtered.filter(product => colorFilters.includes(product.color));
    }

    if (sizeFilters.length > 0) {
      filtered = filtered.filter(product => product.size.some(size => sizeFilters.includes(size)));
    }

    if (priceFilters.length > 0) {
      filtered = filtered.filter(product => {
        return priceFilters.some(filter => {
          const match = filter.match(/de R\$\s([\d.,]+) até R\$\s([\d.,]+)/);
          if (match) {
            const min = parseFloat(match[1].replace('.', '').replace(',', '.'));
            const max = parseFloat(match[2].replace('.', '').replace(',', '.'));
            return product.price >= min && product.price <= max;
          }
          const lastStepMatch = filter.match(/^(\d+)-/);
          if (lastStepMatch) {
            const min = parseInt(lastStepMatch[1], 10);
            return product.price >= min;
          }
          return false;
        })
      })
    }

     if (orderBy) {
    switch (orderBy) {
      case "Mais recentes":
        filtered.sort((a, b) => {
          const dateA = new Date(a.date).getTime() || 0;
          const dateB = new Date(b.date).getTime() || 0;
          return dateB - dateA;
        });
        break;

      case "Menor preço":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "Maior preço":
        filtered.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }
  }
  
    setSearchNewProduct(filtered);
  }, [products, isChecked, orderBy]);
  
  return { searchNewProduct, columnFilters, ordeByFilter };
};

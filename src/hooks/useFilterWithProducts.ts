import { useMemo, useState } from "react";
import { useFilter } from "./useFilter";
import { useProductContext } from "../context/ProductContext";
import { useIsMobile } from "./useIsMobile";
import { useCheckedInputFilter } from "./useCheckedInputFilter";

export const useFilterWithProducts = () => {
  const [orderBy, setOrderBy] = useState("");

  const { listProducts } = useProductContext();
  const { isMobile } = useIsMobile();
  const { isChecked, appliedFilters } = useCheckedInputFilter();

  const { searchNewProduct, columnFilters, ordeByFilter } = useFilter(
    listProducts,
    isMobile ? appliedFilters : isChecked,
    orderBy
  );

  const values = useMemo(() => ({
    searchNewProduct,
    columnFilters,
    ordeByFilter,
    orderBy,
    setOrderBy
  }), [
    searchNewProduct,
    columnFilters,
    ordeByFilter,
    orderBy,
  ])

  return values;
};

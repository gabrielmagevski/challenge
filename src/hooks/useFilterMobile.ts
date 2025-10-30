import { useCallback, useState } from "react";

export const useFilterMobile = () => {
  const [openMobileFilter, setOpenMobileFilter] = useState<string | null>(null);

  const handleOpenMobile = useCallback((filterName: string) => {
    setOpenMobileFilter(old => (old === filterName ? null : filterName));
  }, []);

  return {
    handleOpenMobile,
    openMobileFilter,
    setOpenMobileFilter
  };
};

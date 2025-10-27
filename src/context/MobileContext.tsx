import React, { createContext, useContext, useMemo } from "react";
import { useFilterMobile } from "../hooks/useFilterMobile";

type MobileContextProps = {
  handleOpenMobile: (filterName: string) => void;
  setOpenMobileFilter: React.Dispatch<React.SetStateAction<string | null>>;
  openMobileFilter: string | null;
};

const MobileContext = createContext<MobileContextProps | null>(null);

export const MobileProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleOpenMobile, setOpenMobileFilter, openMobileFilter } = useFilterMobile();

  const value = useMemo(
    () => ({ handleOpenMobile, setOpenMobileFilter, openMobileFilter }),
    [handleOpenMobile, setOpenMobileFilter, openMobileFilter]
  );

  return <MobileContext.Provider value={value}>{children}</MobileContext.Provider>;
};

export const useMobileContext = () => {
  const context = useContext(MobileContext);
  if (!context) throw new Error("useMobileContext deve ser usado dentro de MobileProvider");
  return context;
};

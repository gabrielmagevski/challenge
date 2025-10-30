import React, { useCallback, useState } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import TriggerFilterMobile from "../../Atoms/ModalFilterMobile/FilterMobile";
import OrderByItem from "./OrderByItem";
import { useMobileContext } from "../../../context/MobileContext";
import { useFilterWithProductsContext } from "../../../context/FilterWithProductsContext";

const OrderBySelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { ordeByFilter, orderBy, setOrderBy } = useFilterWithProductsContext();
  const { handleOpenMobile } = useMobileContext()
  const { isMobile } = useIsMobile();

  
  const handleSelect = useCallback((value: string) => {
    setOrderBy(value);
    setIsOpen(false);

    isMobile && handleOpenMobile("orderBy")
  }, [handleOpenMobile, isMobile]);

  return (
    <div className="orderby--selected-wrapper">
      {!isMobile && (
        <div className="orderby--select" onClick={() => setIsOpen(!isOpen)}>
          {orderBy || "Ordenar por: "}
          <svg
            width="12"
            height="9"
            viewBox="0 0 8 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 0.500031L4 5.50003L7.5 0.505224"
              stroke="#666666"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
      {!isMobile && isOpen && (
        <OrderByItem ordeByFilter={ordeByFilter} handleSelect={handleSelect} />
      )}
      {isMobile && (
        <TriggerFilterMobile textFilter={"Ordenar"}>
          <OrderByItem ordeByFilter={ordeByFilter} handleSelect={handleSelect} />
        </TriggerFilterMobile>
      )}
    </div>
  );
};

export default OrderBySelect;

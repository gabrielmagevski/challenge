import React, { useState } from "react";
import { useCategoryContext } from "../../../context/CategoryContext";
import { useIsMobile } from "../../../hooks/useIsMobile";
import FilterMobile from "../../Atoms/ModalFilterMobile/FilterMobile";
import OrderByItem from "./OrderByItem";

const OrderBySelect = () => {
  const { ordeByFilter, orderBy, setOrderBy, handleOpenMobile } = useCategoryContext();
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useIsMobile();

  const handleSelect = (value: string) => {
    setOrderBy(value);
    setIsOpen(false);

    isMobile && handleOpenMobile("orderBy")
  };

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
        <FilterMobile textFilter={"Ordenar"}>
          <OrderByItem ordeByFilter={ordeByFilter} handleSelect={handleSelect} />
        </FilterMobile>
      )}
    </div>
  );
};

export default OrderBySelect;

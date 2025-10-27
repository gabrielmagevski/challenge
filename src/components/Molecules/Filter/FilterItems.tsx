import React, { useState } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import Accordion from "../../Atoms/Accordion/Accordion";
import InputCustom from "../../Atoms/InputCustom/InputCustom";

interface FilterItemsProps {
  itemsFilter: {
    type: string;
    items: string[];
  };
  isChecked: {
    [key: string]: boolean;
  };
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterItems = ({
  itemsFilter,
  isChecked,
  handleCheckboxChange,
}: FilterItemsProps) => {
  const [viewMore, setViewMore] = useState<boolean>(false);
  const { isMobile } = useIsMobile()

  if (!itemsFilter) {
    return null;
  }

  const { type, items } = itemsFilter;

  const handleViewMore = () => {
    setViewMore((valueOld) => !valueOld);
  };

  return (
    <div
      className={`filter--wrapper ${type
      .toLowerCase()
      .replace(/\s+/g, "-")}--filter`
      } 
    >
      {!isMobile && <h3 className="filter--title">{type}</h3>}
    
      <div className="filter--content">
        {
          isMobile && 
          <Accordion filterName={type} >
            {items.map((item: string, idx) => (
              <div
                className={
                  !isMobile && !viewMore && type === "Cores" && idx >= 5
                    ? "filter--none"
                    : "filter--item"
                }
                key={idx}
              >
                <InputCustom
                  item={item}
                  type="checkbox"
                  value={item}
                  name={item}
                  checked={isChecked[item] ?? false}
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <span className="item-span">{item}</span>
              </div>
            ))}
          </Accordion>
        }
          <>
            {!isMobile && items.map((item: string, idx) => (
              <div
                className={
                  !isMobile && !viewMore && type === "Cores" && idx >= 5
                    ? "filter--none"
                    : "filter--item"
                }
                key={idx}
              >
                <InputCustom
                  item={item}
                  type="checkbox"
                  value={item}
                  name={item}
                  checked={isChecked[item] ?? false}
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <span className="item-span">{item}</span>
              </div>
            ))}

            {!isMobile && type === "Cores" && items.length > 5 && (
              <div className="button--see-more" onClick={handleViewMore}>
                <h4 className="button--see-more--title">
                  Ver todas as cores
                  <svg
                    width="8"
                    height="7"
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
                </h4>
              </div>
            )}
          </>
      </div>
    </div>
  );
};

export default FilterItems;

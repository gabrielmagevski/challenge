import React from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import InputCustom from "../../Atoms/InputCustom/InputCustom";

interface ItemFilterProps {
  items: string[];
  viewMore: boolean,
  type: string,
  isChecked:  {[key: string]: boolean;},
  handleCheckboxChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ItemFilter = ({ items, viewMore, type, isChecked, handleCheckboxChange }: ItemFilterProps) => {
  const { isMobile } = useIsMobile()

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default ItemFilter;
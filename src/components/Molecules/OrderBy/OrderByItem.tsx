import React from "react";

interface OrderByItem {
  handleSelect: (value: string) => void;
  ordeByFilter: {type: string, items: (string | number)[]}[]
}

const OrderByItem = React.memo(({ handleSelect, ordeByFilter }: OrderByItem) => {
  return (
    <ul className="orderby--select--options">
      {ordeByFilter[0]?.items.map((item) => (
        <li
          key={String(item).toLowerCase().replace(/\s+/g, "-")}
          className="orderby--select--option"
          onClick={() => handleSelect(String(item)) }
        >
          {String(item)}
        </li>
      ))}
    </ul>
  );
});

export default OrderByItem;

import React, { ReactNode, useState } from "react";

interface AccordionProps {
  filterName: string;
  children: ReactNode;
}

const Accordion = ({ filterName, children }: AccordionProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleOpenAccordion = (filterType: string) => {
    setOpenAccordion((old) => (old === filterType ? null : filterType));
  };

  return (
    <React.Fragment>
      <div
        className="accordion--filter-mobile--title"
        onClick={() => handleOpenAccordion(filterName)}
      >
        {filterName}{" "}
        <svg
          width="19"
          height="15"
          viewBox="0 0 19 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 0.500061L9.5 13.5001L18.5 0.513564"
            stroke="#666666"
            stroke-linecap="round"
          />
        </svg>
      </div>
      {openAccordion && (
        <div className="accordion--filter-mobile-content">{children}</div>
      )}
    </React.Fragment>
  );
};

export default Accordion;

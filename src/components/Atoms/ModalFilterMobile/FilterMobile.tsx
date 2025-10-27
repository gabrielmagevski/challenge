import React, { ReactNode } from 'react';
import { useCategoryContext } from '../../../context/CategoryContext';

interface FilterMobile {
  children: ReactNode;
  textFilter: string;
}

const FilterMobile = ({ children, textFilter }: FilterMobile) => {
  const { handleOpenMobile, openMobileFilter, applyFilters, clearFilters } = useCategoryContext();

  const isOpen = openMobileFilter === textFilter;

  const handleApply = () => {
    applyFilters();
    handleOpenMobile(textFilter);
  };

  const handleClear = () => {
    clearFilters();
    handleOpenMobile(textFilter);
  };

  return (
    <div className="container-modal--filter-mobile">
      <button className="button--trigger-filter--mobile" onClick={() => handleOpenMobile(textFilter)}>
        <h2 className="title--button--trigger-filter--mobile">{textFilter}</h2>
      </button>

      {isOpen && ( 
        <div className="container--filter-mobile">
          <div className="header--filter-mobile">
            <div className="header--filter-mobile-wrapper-title">
              <h3 className="header--filter-mobile--title">{textFilter}</h3>
            </div>
            <div
              className="header--filter-mobile-wrapper-close"
              onClick={() => handleOpenMobile(textFilter)}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.5 18.1018L17.5547 0.249885" stroke="black" />
                <line
                  y1="-0.5"
                  x2="25.2899"
                  y2="-0.5"
                  transform="matrix(0.711746 0.702437 -0.874311 0.485367 0 0.485352)"
                  stroke="black"
                />
              </svg>
            </div>
          </div>
          <div className='header--filter-content'>{children}</div>
          <div className="filter-mobile-buttons">
            <button className="button--apply-filter" onClick={handleApply}>Aplicar</button>
            <button className="button--clear-filter" onClick={handleClear}>Limpar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMobile;

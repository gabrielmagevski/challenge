import React from 'react'
import FilterItems from './FilterItems';
import { useFilterContext } from '../../../context/FilterContext';
import { useFilterWithProductsContext } from '../../../context/FilterWithProductsContext';

const Filters = () => {
  const { handleCheckboxChange, isChecked  } = useFilterContext()
  const {columnFilters} = useFilterWithProductsContext()
  return (
    <div className='container--filter'>
      <FilterItems
        itemsFilter={columnFilters.find(filtersColumnItem => filtersColumnItem.type === 'Cores')!}
        isChecked={isChecked}
        handleCheckboxChange={handleCheckboxChange}
      />

      <FilterItems 
        itemsFilter={columnFilters.find(filtersColumnItem => filtersColumnItem.type === 'Tamanhos')!} 
        isChecked={isChecked}
        handleCheckboxChange={handleCheckboxChange}
      />

      <FilterItems
        itemsFilter={columnFilters.find(filtersColumnItem => filtersColumnItem.type === 'Faixa de Preço')!}
        isChecked={isChecked}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}
Filters.displayName = "Filters"

export default Filters;

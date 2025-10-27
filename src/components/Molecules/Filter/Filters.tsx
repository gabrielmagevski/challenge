import React, { memo } from 'react'
import FilterItems from './FilterItems';
import { useFilterContext } from '../../../context/FilterContext';

const Filters = () => {
  const { handleCheckboxChange, isChecked, columnFilters  } = useFilterContext()

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

export default memo(Filters);

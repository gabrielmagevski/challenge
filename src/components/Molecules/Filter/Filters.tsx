import React, { memo } from 'react'
import { useCategoryContext } from '../../../context/CategoryContext';
import FilterItems from './FilterItems';

const Filters = () => {
  const { handleCheckboxChange, isChecked, columnFilters  } = useCategoryContext()

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

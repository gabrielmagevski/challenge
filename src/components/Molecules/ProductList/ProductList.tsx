import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useCategoryContext } from '../../../context/CategoryContext';
import { useIsMobile } from '../../../hooks/useIsMobile';

const PRODUCTS_PER_PAGE_DESKTOP = 9;
const PRODUCTS_PER_PAGE_MOBILE = 4;

const ProductList = () => {
  const { searchNewProduct } = useCategoryContext();
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE_DESKTOP);
  const { isMobile } = useIsMobile()

  useEffect(() => {
    if (!isMobile) {
      setVisibleCount(PRODUCTS_PER_PAGE_DESKTOP);
    } else {
      setVisibleCount(PRODUCTS_PER_PAGE_MOBILE);
    }
  }, [searchNewProduct]);

  const handleLoadMore = () => {
    setVisibleCount((old) => old + visibleCount);
  };

  const visibleProducts = searchNewProduct.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < searchNewProduct.length;

  return (
    <div className="products-container">
      {searchNewProduct.length === 0 && <div>Not found</div>}
      <div className='container--shelf'>
        {visibleProducts.map((sku, idx) => (
          <ProductCard sku={sku} key={`${sku.id}-${idx}`} />
        ))}
      </div>
      {hasMoreProducts && (
        <div className="products-footer">
          <button className="button--load-more" onClick={handleLoadMore}>
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

import React from 'react';
import { Product } from '../../../ts/Product';
import ProductCard from '../ProductList/ProductCard';

interface MinicarItemProps {
  sku: Product;
}

const MinicartItem = React.memo(({ sku }: MinicarItemProps) => {
  return (
    <React.Fragment>
      <ProductCard sku={sku} />
    </React.Fragment>
  )
})

export default MinicartItem
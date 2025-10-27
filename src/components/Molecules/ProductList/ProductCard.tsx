import React from 'react';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Product } from '../../../ts/Product';
import { useCategoryContext } from '../../../context/CategoryContext';

interface ProductCardProps {
  sku: Product
}

const ProductCard = ({ sku }: ProductCardProps) => {
  const { handleAddToCart } = useCategoryContext()
  
  return (
    <article className="shelf-card">
      <div className="shelf-content">
        <div className="shelf-item-topside">
          <img 
            className="shelf-image"
            src={sku.image}
            alt={sku.name}
            title={sku.name}
            width={195}
            height={293}
          />
        </div>
        <div className="shelf-item-bottomside">
          <div className="shelf-wrapper--title">
            <h2 className="shelf--productName">{sku.name}</h2>
          </div>
          <div className="shelf-wrapper--prices">
            <strong className="shelf--price">{formatCurrency(sku.price)}</strong>
            <span className="shelf--installments">
              até {sku.parcelamento[0]}x de {formatCurrency(sku.parcelamento[1])}
            </span>
          </div>
          <div className="shelf-wrapper--buy">
            <button className="shelf--buybutton" onClick={() => handleAddToCart(sku)}>Comprar</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard;

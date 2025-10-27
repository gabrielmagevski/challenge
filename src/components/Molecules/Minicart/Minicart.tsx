import React, { useState } from 'react';
import { useCategoryContext } from '../../../context/CategoryContext';
import { Product } from '../../../ts/Product';
import MinicartEmpty from './MinicartEmpty';
import { formatCurrency } from '../../../utils/formatCurrency';
import MinicartItem from './MinicartItem';

const Minicart = () => {
  const { addToCart, handleOpenMinicart, openMinicart } = useCategoryContext()

  const hasItensOnMinicart = addToCart.length > 0
  const itensAvailables = addToCart.length

  const totalPriceMinicart = addToCart.reduce((acc, sku) => acc + sku.price, 0)

  return (
    <React.Fragment>
      <div onClick={handleOpenMinicart} className='minicart-logo--container'>
        <img className="minicart-icon" src="../../img/minicart_icon.svg" title='Icone do Minicart' alt="Icone do Minicart" width={17} height={20} />
        { hasItensOnMinicart && <span className='minicart--toltip'>{itensAvailables}</span> }
      </div>
  
      {
        openMinicart && (
          <div className='minicart--overlay' onClick={handleOpenMinicart}>
            <div className='minicart--container'>
              <div className='minicart--header'>
                <h2 className='minicart--header--title'>Carrinho</h2>
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

              <div className='minicart--content'>
                {
                  hasItensOnMinicart ? (
                    addToCart?.map((sku: Product, idx) => {
                      return <MinicartItem sku={sku} key={sku.id + idx} />
                    })
                  )
                  :
                  (
                    <MinicartEmpty />
                  )
                }
              </div>

              <div className='minicart--footer'>
                <div className='minicart--footer--subtotal'>
                  <span className='minicart-footer---subtotal--desc'>Total: {formatCurrency(totalPriceMinicart)}</span>
                </div>
               <button className='minicart--footer--go-to-checkout'>Ir para o Carrinho</button>
              </div>
            </div>
          </div>
        )
      }
    </React.Fragment>
  )
}

export default Minicart;
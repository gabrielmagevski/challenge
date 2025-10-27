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
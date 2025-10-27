import React from "react";
import TriggerFilterMobile from "../../Atoms/ModalFilterMobile/FilterMobile";
import ListProducts from "../../Molecules/ProductList/ProductList";
import OrderBy from "../../Molecules/OrderBy/OrderBy";
import Filters from "../../Molecules/Filter/Filters";

import { useIsMobile } from "../../../hooks/useIsMobile";

const Category = () => {
  const { isMobile } = useIsMobile();

  return (
    <React.Fragment>
      <div className="container--category">
        <div className="container--top-category">
          <div className="container--top-category--departament">
            <h1 className="container--top-category--departament--title">
              Blusas
            </h1>
          </div>
          <div className="container--top-category--departament-orderby">

            {isMobile && (
              <TriggerFilterMobile textFilter={"Filtrar"}>
                <Filters />
              </TriggerFilterMobile>
            )}
            
            <OrderBy />
          </div>
        </div>
        <div className="container--content-category">
          {!isMobile && <Filters />}
          <ListProducts />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;

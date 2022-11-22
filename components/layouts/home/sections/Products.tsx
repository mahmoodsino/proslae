import React from "react";
import Panal from "./Panal";
import ProductTap from "./ProductTap";

const Products = () => {
  return (
    <div className="ltn__product-tab-area ltn__product-gutter pt-10 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title-area ltn__section-title-2--- text-center">
              <h1 className="section-title">Our Products</h1>
            </div>
            <ProductTap />
            <div className="tab-content pr-10 pl-10">
              <Panal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

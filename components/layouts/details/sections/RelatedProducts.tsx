import React from "react";
import { ProductsType } from "../../../../helpers/types";
import ProductCard from "../../../cards/ProductCard";

interface Props {
  products: ProductsType[];
}

const RelatedProducts = ({ products }: Props) => {
  return (
    <div className="realted_Products_Section">
      <span className="related_Product_span">RELATED PRODUCTS</span>
      {products.length > 0 ? (
        <div className="related_Products_Card_Section">
          {products.map((item, i) => {
            return <ProductCard product={item} key={i} />;
          })}
        </div>
      ) : (
        <span className="related_Products_Empty">
          there are no related products
        </span>
      )}
    </div>
  );
};

export default RelatedProducts;

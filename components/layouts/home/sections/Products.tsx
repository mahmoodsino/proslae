import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import { FeaturedProductAtom, TokenAtom } from "../../../../helpers/recoil";
import { getFeaturedProducts } from "../../../../helpers/server/services";
import CircleProgressBar from "../../progress-bar";
import Panal from "./Panal";
import ProductTap, { SelectedFeaturedCAtegories } from "./ProductTap";

const Products = () => {
  const [selected, setSelected] = useRecoilState(SelectedFeaturedCAtegories);
  const { addToast } = useToasts();
  const [token, setToken] = useRecoilState(TokenAtom);
  const [featuredProducts, setFeaturedProducts] =
    useRecoilState(FeaturedProductAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await getFeaturedProducts({
        token: token,
        categoryId: selected?.id,
      });
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        setFeaturedProducts(res.result.items);
      }
      setLoading(false);
    };
    getData();
  }, [selected]);
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
              {!loading ? (
                <Panal />
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircleProgressBar height={60} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

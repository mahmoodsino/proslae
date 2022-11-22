import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import { DetailsAtom, TokenAtom } from "../../../../helpers/recoil";
import {
  getProductDetails,
  getSimilarProducts,
} from "../../../../helpers/server/services";
import { ProductsType } from "../../../../helpers/types";
import MoveTopBTN from "../../../buttons/MoveTopBTN";
import BottomCart from "../../../cart/BottomCart";
import CartMenu from "../../../cart/CartMenu";
import FixedCart from "../../../cart/FixedCart";
import TopAreaPages from "../../pages-top-area/TopAreaPages";
import CircleProgressBar from "../../progress-bar";
import DetailsCard from "./DetailsCard";
import DetailsProductPhoto from "./DetailsProductPhoto";
import RelatedProducts from "./RelatedProducts";

const MainSection = () => {
  const { addToast } = useToasts();
  const { query } = useRouter();
  const [loading, setLoading] = useState(false);
  const [detailsState, setDetailsState] = useRecoilState(DetailsAtom);
  const [relatedProducts, setRelatedProducts] = useState<ProductsType[]>([]);
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [token, setToken] = useRecoilState(TokenAtom);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      if (query.product) {
        const res = await getProductDetails(+query.product);
        if (res === null) {
          addToast("Something wrong happened!", { appearance: "error" });
        } else {
          setDetailsState(res.result);
        }
        const response = await getSimilarProducts(+query.product);
        if (response === null) {
          addToast("Something wrong happened!", { appearance: "error" });
        } else {
          setRelatedProducts(response.result);
        }
      }
      setLoading(false);
    };
    getData();
  }, [query]);

  return (
    <div>
      <TopAreaPages title="Product Details" isMini={true} />
      <CartMenu />
      <MoveTopBTN />
      {token && !isMobile ? <FixedCart /> : token && isMobile && <BottomCart />}

      <div className="main__details">
        {!loading ? (
          <div>
            <div className="details_First_Section">
              <div className="details_Photo_Section">
                <DetailsProductPhoto />
              </div>
              <div className="details_Card_Section">
                <DetailsCard />
              </div>
            </div>
            <div className="Details_Secound_Section">
              <span className="details_Info_text">Product Infomation</span>
              <div className="details_Info_Section">
                <div className="details_border_Info"></div>
              </div>
              <span className="details_span">
                {detailsState.product?.description}
              </span>
            </div>
            <RelatedProducts products={relatedProducts} />
          </div>
        ) : (
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className=""
          >
            <CircleProgressBar height={80} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSection;

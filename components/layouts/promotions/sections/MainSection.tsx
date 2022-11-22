import React, { useEffect, useState } from "react";
import TopAreaPages from "../../pages-top-area/TopAreaPages";
import { PRODUCTS_PROMOTION } from "../../../../helpers/Common";
import { motion } from "framer-motion";
import { useToasts } from "react-toast-notifications";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import { TokenAtom } from "../../../../helpers/recoil";
import AllPromotionsType from "../../../../helpers/types/AllPromotionsType";
import {
  getPromotions,
  getPromotionsProducts,
} from "../../../../helpers/server/services";
import PromotionsType from "../../../../helpers/types/PromotionsType";
import Tabs from "./Tabs";
import CircleProgressBar from "../../progress-bar";
import Timer from "../../../timer/Timer";
import { ProductsType } from "../../../../helpers/types";
import GridCard from "../../../cards/GridProduct";

const variants = {
  hidden: {
    y: 0,
    opacity: 0,
    transition: { duration: 0.3 },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const MainSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const { addToast } = useToasts();
  const [token, setToken] = useRecoilState(TokenAtom);
  const [promotions, setPromotions] = useState<AllPromotionsType>(
    {} as AllPromotionsType
  );
  const [loading, setLoading] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<PromotionsType>(
    {} as PromotionsType
  );
  const [promotionProducts, setPromotionProducts] = useState<ProductsType[]>(
    []
  );

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await getPromotions();
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        setPromotions(res.result);
      }
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    if (promotions?.featured_promotions?.length !== 0) {
      setSelectedPromotion(
        promotions?.featured_promotions && promotions?.featured_promotions[0]
      );
    }
  }, [promotions]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await getPromotionsProducts({
        promotion: selectedPromotion.id,
      });
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        setPromotionProducts(res.result.items);
      }
      setLoading(false);
    };

    if (selectedPromotion?.id) {
      getData();
    }
  }, [selectedPromotion]);

  const data = promotionProducts.map((product, index) => {
    return <GridCard key={index} product={product} />;
  });

  return (
    <div>
      <TopAreaPages title="Promotions" />
      <motion.div variants={variants} initial="hidden" animate="visible">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mt-20">
              <Tabs
                setSelectedPromotion={setSelectedPromotion}
                promotion={selectedPromotion}
                promotions={promotions.featured_promotions}
              />
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CircleProgressBar height={60} />
                </div>
              ) : (
                <div className="tab-content">
                  <div className="flex_center_h">
                    {selectedPromotion && (
                      <Timer
                        startDate={selectedPromotion?.start_date}
                        endDate={selectedPromotion?.end_date}
                      />
                    )}
                  </div>
                  <div className="tab-pane fade show active">
                    <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                      <div className="row">{data}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MainSection;

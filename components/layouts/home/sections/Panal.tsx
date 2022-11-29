import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import { useRecoilState } from "recoil";
import FeaturedProductAtom from "../../../../helpers/recoil/home/FeaturedProductAtom";
import ProductCard from "../../../cards/ProductCard";

function sliderSettings(productsCount: number) {
  return {
    infinite: productsCount >= 4 ? true : false,
    // slidesToShow: productsCount >= 5 ? 5 : productsCount,
    slidesToShow: 4,
    speed: 700,
    rows: productsCount > 5 ? 2 : 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 2,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };
}

const Panal = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [isShow, setShowArrows] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const [featuredProducts, setFeaturedProducts] =
    useRecoilState(FeaturedProductAtom);

  const handleEnter = () => {
    setShowArrows(true);
  };

  const handleLeave = () => {
    setShowArrows(false);
  };

  useEffect(() => {
    setProductsCount(featuredProducts.length);
  }, [featuredProducts]);

  return (
    <div
      //@ts-ignore
      onMouseEnter={!isTabletOrMobile || !isPortrait ? handleEnter : null}
      style={!isTabletOrMobile || !isPortrait ? { padding: "0px" } : {}}
      // onMouseEnter={!isTabletOrMobile || !isPortrait ? handleEnter : null}
      onMouseLeave={() =>
        !isTabletOrMobile || !isPortrait ? handleLeave : null
      }
    >
      <div className="products-section">
        {!isTabletOrMobile && (
          <div className="left">
            <img src="cat.webp" alt="" />
          </div>
        )}

        <div className="right">
          <div
            className="tab-pane fade active show"
            style={{ padding: "0 20px" }}
          >
            <div
              className={
                !isTabletOrMobile || !isPortrait
                  ? isShow
                    ? "arrow"
                    : "hide_arrow"
                  : "arrow"
              }
            >
              <Slider {...sliderSettings(productsCount)}>
                {featuredProducts.map((item, i) => {
                  return <ProductCard product={item} key={i} />;
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panal;

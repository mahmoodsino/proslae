import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import BrandsAtom from "../../../../helpers/recoil/home/BrandsAtom";
import { useRecoilState } from "recoil";
import TopBrandCard from "../../../cards/TopBrandCard";

const settings = {
  infinite: true,
  slidesToShow: 6,
  speed: 700,
  rows: 1,
  initialSlide: 1,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        dots: true,
        slidesToShow: 3,
        rows: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 780,
      settings: {
        dots: true,
        slidesToShow: 2,
        rows: 2,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        dots: true,
        slidesToShow: 2,
        rows: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

const TopBrands = () => {
  const [isShow, setShowArrows] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const [brands, setBrands] = useRecoilState(BrandsAtom);

  const handleEnter = () => {
    setShowArrows(true);
  };

  const handleLeave = () => {
    setShowArrows(false);
  };
  return (
    <div className="ltn__category-area overflow_x_hidden ltn__product-gutter mt-5 mb-5 pb-70">
      <div
        onMouseEnter={() =>
          !isTabletOrMobile || !isPortrait ? handleEnter : null
        }
        onMouseLeave={() =>
          !isTabletOrMobile || !isPortrait ? handleLeave : null
        }
        className={`${
          !isTabletOrMobile || !isPortrait
            ? isShow
              ? "arrow container"
              : "hide_arrow container"
            : null
        }`}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2--- text-center">
              <h1 className="section-title white-color---">Top Brands</h1>
            </div>
          </div>
        </div>
        <Slider {...settings}>
          {brands.map((brand, index) => {
            return <TopBrandCard key={index} brand={brand} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TopBrands;

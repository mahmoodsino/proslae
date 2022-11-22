import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { SliderType } from "../../../helpers/types";

const settings = {
  infinite: true,
  slidesToShow: 1,
  speed: 500,
  rows: 1,
  fade: true,
  initialSlide: 0,
  dots: true,
};

interface Prop {
  data: SliderType;
}

const SliderComponent = ({ data }: Prop) => {
  const isMobile = useMediaQuery({ query: "(max-width: 520px)" });
  const handleProductDetails = () => {};

  return (
    <div
      className="ltn__slide-item ltn__slide-item-10 bg-image base"
      // style={{
      // 		background:
      // 			'url(http://previews.123rf.com/images/daryl22996/daryl229961507/daryl22996150704269/43425513-Barnstaple-Saturday-18th-July-2015-Pliton-Green-man-festival-Stock-Photo.jpg)',
      // 	}}
    >
      {!isMobile && (
        <img src={data.img} alt="" className="image_ product-img" />
      )}
      <div className="ltn__slide-item-inner">
        <div className="container">
          <div className="row row__">
            <div className="col-lg-7 col-md-7 col-sm-7 align-self-center">
              <div className="slide-item-info">
                <div className="slide-item-info-inner ltn__slide-animation">
                  <h5 className="slide-sub-title ltn__secondary-color animated text-uppercase">
                    {data.description}
                  </h5>
                  <h1 className="slide-title  animated">{data.title}</h1>
                  <div className="slide-brief animated d-none">
                    <p>
                      Predictive analytics is drastically changing the real
                      estate industry. In the past, providing data for quick
                    </p>
                  </div>
                  <div className="btn-wrapper animated">
                    <div className="mt-10" style={{ width: "180px" }}>
                      <Link
                        href="#"
                        className="theme-btn-1 btn btn-effect-1 animated_green text-uppercase"
                        onClick={handleProductDetails}
                      >
                        {data.button_text}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-5 align-self-center">
              <div className="slide-item-img">
                {isMobile && <img src="" alt="" className=" product-img" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  sliders: SliderType[];
}

const HomeSlider = ({ sliders }: Props) => {
  const data = sliders.map((slider, index) => {
    return <SliderComponent data={slider} key={index} />;
  });
  return (
    <div>
      <Slider {...settings}>{data}</Slider>
    </div>
  );
};

export default HomeSlider;

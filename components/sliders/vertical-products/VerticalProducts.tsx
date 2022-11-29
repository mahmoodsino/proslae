import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ProductsType } from "../../../helpers/types";
import VerticalProductCard from "../../cards/VerticalProductCard";
import { useRecoilState } from "recoil";
import FeaturedProductAtom from "../../../helpers/recoil/home/FeaturedProductAtom";
import {
  getLatestProducts,
  getTopProducts,
  getTopSellingProducts,
} from "../../../helpers/server/services";
import { useToasts } from "react-toast-notifications";
import CircleProgressBar from "../../layouts/progress-bar";

const settings = {
  infinite: true,
  slidesToShow: 1,
  speed: 700,
  rows: 3,
  initialSlide: 0,
  dots: true,
  arrows: false,
};

interface Props {
  title: string;
  data: ProductsType[];
}

function SliderComponent({ title, data }: Props) {
  const data_ = data.map((product, index) => {
    return <VerticalProductCard key={index} product={product} />;
  });

  return (
    <div className="col-12 col-sm-6 col-xl-3 px-0 my-20">
      <div className="row bg-white">
        <div className="col-lg-12">
          <div className="section-title-area ltn__section-title-2--- pl-3 pr-3">
            <h1 className="section-title sm">{title}</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Slider {...settings}>{data_}</Slider>
        </div>
      </div>
    </div>
  );
}

const VerticalProducts = () => {
  const [featuredProducts, setFeaturedProducts] =
    useRecoilState(FeaturedProductAtom);
  const [topProducts, setTopProducts] = useState<ProductsType[]>([]);
  const [recentProducts, setRecentProducts] = useState<ProductsType[]>([]);
  const [topSellProducts, setTopSellProducts] = useState<ProductsType[]>([]);
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await getLatestProducts();
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        setRecentProducts(res.result.items);
      }

      const response = await getTopProducts();
      if (response === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        setTopProducts(response.result.items);
      }

      const ress = await getTopSellingProducts();
      if (ress === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        setTopSellProducts(ress.result.items);
      }
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <div>
      <div className="ltn__small-product-list-area pt-4 pb-85 pl-4 pr-4">
        <div className="container">
          {!loading ? (
            <div className="row justify-content-center">
              <SliderComponent title="Top Products" data={topProducts} />
              <SliderComponent title="Recently added" data={recentProducts} />
              <SliderComponent
                title="Featured Products"
                data={featuredProducts}
              />
              <SliderComponent title="Top Selling" data={topSellProducts} />
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircleProgressBar height={90} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalProducts;

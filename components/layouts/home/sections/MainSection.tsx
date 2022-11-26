import React, { useEffect, useState } from "react";
import { HeaderBaseComponent } from "../../../headers";
import {
  getBrands,
  getFeaturedProducts,
  getHomePageData,
} from "../../../../helpers/server/services";
import { useRecoilState } from "recoil";
import CategoriesAtom from "../../../../helpers/recoil/home/CategoriesAtom";
import { useToasts } from "react-toast-notifications";
import BrandsAtom from "../../../../helpers/recoil/home/BrandsAtom";
import Categories from "../../../sidebars/categories/Categories";
import Brands from "../../../sidebars/brands/Brands";
import CircleProgressBar from "../../progress-bar";
import Taps from "./Taps";
import { HomeSlider } from "../../../sliders";
import { Feature } from "../../../cards";
import MobileMenuBTN from "../../../buttons/MobileMenuBTN";
import FeaturedCategoriesAtom from "../../../../helpers/recoil/home/FeaturedCategoriesAtom";
import FeaturedProductAtom from "../../../../helpers/recoil/home/FeaturedProductAtom";
import TopBrands from "./TopBrands";
import Products from "./Products";
import VerticalProducts from "../../../sliders/vertical-products/VerticalProducts";
import CartMenu from "../../../cart/CartMenu";
import MoveTopBTN from "../../../buttons/MoveTopBTN";
import FixedCart from "../../../cart/FixedCart";
import { TokenAtom } from "../../../../helpers/recoil/token";
import { useMediaQuery } from "react-responsive";
import BottomCart from "../../../cart/BottomCart";
import MobileMenu from "../../../sidebars/mobile-menu/MobileMenu";
import openBrandsDialogAtom from "../../../../helpers/recoil/sidebar/openBrandsDialogAtom";
import BrandsDialog from "../../../dialogs/BrandsDialog";
import openCategoriesDialogAtom from "../../../../helpers/recoil/sidebar/openCategoriesDialogAtom";
import CategoriesDialog from "../../../dialogs/CategoriesDialog";
import { SliderAtom } from "../../../../helpers/recoil";
import { SelectedFeaturedCAtegories } from "./ProductTap";

const MainSection = () => {

  const [currentIndex, setIndex] = useState(1);
  const [progress, setPropgress] = useState(false);
  const [slider, setSlider] = useRecoilState(SliderAtom)

    const[token,setToken]=useRecoilState(TokenAtom)
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });






  const renderSidebar = () => {
    if (currentIndex === 1) return <Categories />;
    return <Brands />;
  };
  

  return (
    <>
      <HeaderBaseComponent />
      <MobileMenuBTN />
      <CartMenu />
      <MoveTopBTN />
      {token && !isMobile ? <FixedCart /> : token && isMobile && <BottomCart />}  
      <div className="ltn__slider-area ltn__slider-3---">
        <div className="container">
          {progress ? (
            <div className="loader pb-200">
              <CircleProgressBar  height={60} />
            </div>
          ) : (
            <>
              <div className="home-slider-parent">
                <div className="left">
                  <br />
                  <Taps currentIndex={currentIndex} setIndex={setIndex} />
                  {renderSidebar()}
                </div>

                <div className="right">
                  <HomeSlider sliders={slider} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Feature />
      <Products />
      <TopBrands />
      <VerticalProducts />
    </>
  );
};

export default MainSection;

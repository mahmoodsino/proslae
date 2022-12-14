import React, { useState } from "react";
import CartMenu from "../../../cart/CartMenu";
import { HeaderBaseComponent } from "../../../headers";
import MobileMenuBTN from "../../../../components/buttons/MobileMenuBTN";
import CircleProgressBar from "../../progress-bar";
import CartMobileMenu from "../../../cart/CartMobileMenu";

const MainSection = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <HeaderBaseComponent />
      <MobileMenuBTN />
      <CartMenu />
      <CartMobileMenu />


      {loading ? (
        <div className="loader">
          <CircleProgressBar height={60} />
        </div>
      ) : (
        <div className="mt-50 mb-50 container px-100">
          {privacyPolicy
            ? privacyPolicy
            : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
										incididunt ut labore`}
        </div>
      )}
    </div>
  );
};

export default MainSection;

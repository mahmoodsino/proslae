import React from "react";
import Cart from "../headers/static-home/middle-area/Cart";
import { formatFloatNumber } from "../../helpers/Common";
import { useRecoilState } from "recoil";
import CartMenuAtom from "../../helpers/recoil/home/CartMenuAtom";
import { AllCartsInfoAtom } from "../../helpers/recoil";

const FixedCart = () => {
  const [openCartMenu, setOpenCartMenu] = useRecoilState(CartMenuAtom);
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfoAtom);

  return (
    <div className="cart_btn" onClick={() => setOpenCartMenu(true)}>
      <Cart hiddenText={true} />
      <div className="price_section">${formatFloatNumber(allCartsInfo.total_price)}</div>
    </div>
  );
};

export default FixedCart;

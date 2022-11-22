import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import { ShoppingCart } from 'tabler-icons-react';
import CartMenuAtom from "../../../../helpers/recoil/home/CartMenuAtom";
import { formatFloatNumber } from '../../../../helpers/Common';
import { AllCartsInfoAtom } from "../../../../helpers/recoil";

interface Props {
  hiddenText?:boolean
}

const Cart = ({hiddenText}:Props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 512px)" });
  const [openCartMenu,setOpenCartMenu]=useRecoilState(CartMenuAtom)
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfoAtom);

  return (
    <li style={{listStyleType:"none"}}>
      <div
      onClick={() => setOpenCartMenu(true)}
        className={
          isMobile
            ? "mini-cart-icon mini-cart-icon-2 mt-10"
            : "mini-cart-icon mini-cart-icon-2"
        }
      >
        <Link href="#" className="ltn__utilize-toggle">
          <span className="mini-cart-icon">
            <ShoppingCart size={24} />
            <sup>{allCartsInfo.items.length}</sup>
          </span>
          {!hiddenText && (
						<h6>
							<span>Your Cart</span>
							<span className="ltn__secondary-color">${formatFloatNumber(allCartsInfo.total_price)}</span>
						</h6>
					)}
        </Link>
      </div>
    </li>
  );
};

export default Cart;

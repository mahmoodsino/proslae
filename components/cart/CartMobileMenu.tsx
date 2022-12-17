import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilState, useRecoilValue } from "recoil";
import { ArrowRight, ShoppingCartX, X } from "tabler-icons-react";
import { formatFloatNumber } from "../../helpers/Common";
import { AllCartsInfoAtom, CartItemsAtom, RemveFromCartAtom } from "../../helpers/recoil";
import MobileCartMenuAtom from "../../helpers/recoil/home/MobileCartMenuAtom";

function Card() {
    const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);
    const removeFromCart = useRecoilValue(RemveFromCartAtom);
  
    const viewProduct = () => {};
  
    return (
      <div >
        {cartItems.map((item, i) => {
          return (
            <div key={i} className="mini-cart-item clearfix">
              <div className="mini-cart-img">
                <Link href="#">
                  <img src="alternative.png" alt="alt" />
                </Link>
                <span
                  className="mini-cart-item-delete"
                  onClick={() => item.id && removeFromCart(item.id,"remove")}
                >
                  <X />
                </span>
              </div>
              <div className="mini-cart-info" onClick={viewProduct}>
                <h6>
                  <Link href="#">{item.product?.name}</Link>
                </h6>
                <span className="mini-cart-quantity">
                  {item.quantity}x${item.variation?.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }





const CartMobileMenu = () => {
  const [openMobileCartMenu, setOpenMobileCartMenu] =
    useRecoilState(MobileCartMenuAtom);
  const isMobile = useMediaQuery({ query: "(max-width: 512px)" });
  const { push } = useRouter();
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfoAtom);

  const closeMenu = () => {
    setOpenMobileCartMenu(false);
  };

  const handleCheckout = () => {
    setOpenMobileCartMenu(false)
    push("/cart");
  };



  return (
    < >
      <div style={openMobileCartMenu ? { bottom: "0" } : { bottom: "-100%"}} className={`main-div`}>
      <div className="ltn__utilize-menu-inner ltn__scrollbar">
        <div className="ltn__utilize-menu-head py-2">
          <span style={{paddingLeft:"10px" , top:"0px"}} className="ltn__utilize-menu-title ">Shopping Cart</span>
          <button className="ltn__utilize-close" onClick={closeMenu}>
            ×
          </button>
        </div>
        <div className="mini-cart-product-area ltn__scrollbar">{Card()}</div>
        {allCartsInfo.items.length > 0 ? (
          <div className="mini-cart-footer">
            <div className="mini-cart-sub-total">
              <div className="row">
                <div className="col-6">
                  <strong>Subtotal:</strong>
                </div>
                <div className="col-6">
                  <strong>
                    <span>
                      ${formatFloatNumber(allCartsInfo.sub_total_price)}
                    </span>
                  </strong>
                </div>
              </div>
            </div>
            {!isMobile && (
              <div className="btn-wrapper">
                <button className="btn1 btn-regular" onClick={handleCheckout}>
                  Checkout <ArrowRight size="20" className="mr-0" />
                </button>
              </div>
            )}
            {isMobile && (
              <div className="btn-wrapper">
                <button onClick={handleCheckout} className="btn1 btn-regular">Checkout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="cart-empty">
            <ShoppingCartX size="50" />
            <strong>Cart is empty</strong>
          </div>
        )}
      </div>

      </div>
      {openMobileCartMenu && 
      <div onClick={() => setOpenMobileCartMenu(false)} className="dlack-div"></div>
      }
    </>
  );
};

export default CartMobileMenu;

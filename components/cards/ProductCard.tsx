import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Minus, Plus, ShoppingCartPlus } from "tabler-icons-react";
import {
  AddToCartAtom,
  AddToCartLoadingAtom,
  CartItemsAtom,
  RemveFromCartAtom,
  TokenAtom,
} from "../../helpers/recoil";
import { ProductsType } from "../../helpers/types";
import ManageCart from "./ManageCart";

interface Props {
  product: ProductsType;
}

const ProductCard = ({ product }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const addtoCArt = useRecoilValue(AddToCartAtom);
  const removeFromCart = useRecoilValue(RemveFromCartAtom);
  const [addLoading, setAddLoading] = useRecoilState(AddToCartLoadingAtom);
  const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);
  const {push}=useRouter()
  const [token,setToken]=useRecoilState(TokenAtom)

  const handleLoad = () => {
    setLoaded(true);
  };

  const handelCart = (id: number) => {
    let isFound = false;
    for (let item of cartItems) {
      if (cartItems.length === 0) return isFound;
      else if (item.variation?.id === id) {
        return (isFound = true);
      }
    }
    return isFound;
  };

  const canAddToCart = () => {
    let canAdd = true;
    if (product.variation.in_stock < 1) {
      canAdd = false;
    } else if (product.variation.in_stock === 1) {
      if (product.tracking_type === 1) {
        canAdd = true;
      } else if (product.tracking_type == 2 || product.tracking_type == 3) {
        if (product.variation.available_quantity === 0) {
          canAdd = false;
        } else {
          canAdd = true;
        }
      }
    }
    return canAdd;
  };

  const renderComponent = () => {
    let indexcart = cartItems.findIndex(
      (item) => item.variation && item.variation.id === product.variation.id
    );
    if (handelCart(product.variation.id)) {
      return (
        <div className="container__ product-count-btns">
          <button onClick={() => removeFromCart(cartItems[indexcart].id)}>
            <Minus size="20" />
          </button>
          <span className="child__ count-num">
            {cartItems[indexcart].quantity}
          </span>
          {product.tracking_type === 1 && (
            <button onClick={() => addtoCArt(product)}>
              <Plus size="20" />
            </button>
          )}
          {product.tracking_type != 1 && (
            <button
              onClick={() => addtoCArt(product)}
              disabled={
                cartItems[indexcart].quantity ===
                cartItems[indexcart].available_quantity
                  ? true
                  : false
              }
            >
              <Plus size="20" />
            </button>
          )}
        </div>
      );
    } else {
      return (
        <div className={`${canAddToCart() ? "product-btns" : "disable_add"} `}>
          <button
            disabled={canAddToCart() ? false : true}
            onClick={() =>( token ?  addtoCArt(product) : push("/main"))}
          >
            <ShoppingCartPlus size="17" />
            Add
          </button>
        </div>
      );
    }
  };

  const has_discount_promotion = () => {
    let hasPro: boolean = false;
    if (product.variation.price != product.variation.new_price) {
      hasPro = true;
    } else {
      hasPro = false;
    }

    return hasPro;
  };


  const handelMoveToDetails = async () => {
    push({
      pathname: "/details",
      query: { product: encodeURI(`${product?.id}`) },
    });
  };

  return (
    <>
      <div
        className={`ltn__product-item ltn__product-item-3 ${
          addLoading && "pointer__Event"
        } `}
      >
        <div>
          <Link href="#">
            <div className="card_img">
              {product?.images?.map((item,i)=> {
                if(item.is_default){
                  return(
                    <img key={i} src={item.path} alt="" onLoad={handleLoad} />
                  )
                }
              })}
              {product?.images?.length===0 &&
                <img  src="alternative.png" alt="" />
              
              }
            </div>
          </Link>
          {has_discount_promotion() && (
            <div className="product-badge">
              <ul>
                <li className="sale-badge">5</li>
              </ul>
            </div>
          )}
          <div className="product-hover-action">
            <ul>
              <li>
                <Link href={`/details?product=${product.id}`} title="Quick View">
                  <i className="far fa-eye"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="product-info">
          <span className="product-brand">{product?.brand?.name}</span>
          <h5
            className="product-title product_name"

            // onClick={() => handleViewProduct(product)}
          >
            {product.name}
          </h5>
          <div className="cart-footer">
            <div className="product-price">
              <span>${product.variation.new_price}</span>
              {product.variation.price && (
                <del>
                  <span>
                    {product.variation.new_price &&
                      `$${product.variation.price}`}
                  </span>
                </del>
              )}
            </div>
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

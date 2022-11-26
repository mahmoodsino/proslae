import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilState, useRecoilValue } from "recoil";
import { Minus, Plus, ShoppingCartPlus } from "tabler-icons-react";
import {
  getAnimateMobileStyle,
  getAnimateStyle,
  getStaticStyle,
} from "../../helpers/Common";
import {
  AddToCartAtom,
  AddToCartLoadingAtom,
  CartItemsAtom,
  RemveFromCartAtom,
  TokenAtom,
} from "../../helpers/recoil";
import { ProductsType } from "../../helpers/types";

interface Props {
  product: ProductsType;
}

const VerticalProductCard = ({ product }: Props) => {
  const addtoCArt = useRecoilValue(AddToCartAtom);
  const removeFromCart = useRecoilValue(RemveFromCartAtom);
  const [addLoading, setAddLoading] = useRecoilState(AddToCartLoadingAtom);
  const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const { push } = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [coordinator, setCoordinator] = useState({
    x: 0,
    y: 0,
  });
  const [animateImage, setAnimateImage] = useState(false);
  const [moveImage, setMoveImage] = useState(false);

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

  const renderImage = () => {
    let im = "";
    if (product?.images?.length !== 0) {
      product.images.map((img) => {
        if (img.is_default) {
          im = img.path;
        }
      });
    } else {
      im = "/alternative.png";
    }

    return im;
  };

  const handleAnimateImage = (e: any) => {
    setCoordinator({
      x: e.clientX - 120,
      y: e.clientY - 100,
    });
    setAnimateImage(true);
    setTimeout(() => {
      setMoveImage(true);
      setTimeout(() => {
        setAnimateImage(false);
        setMoveImage(false);
        setCoordinator({
          x: 0,
          y: 0,
        });
      }, 2000);
    }, 300);
  };

  const renderAnimation = () => {
    if (!moveImage) return getStaticStyle(coordinator.y, coordinator.x);
    if (moveImage && !isMobile) return getAnimateStyle();
    if (moveImage && isMobile) return getAnimateMobileStyle();
  };

  const addToCart = (e: any) => {
    handleAnimateImage(e);
    addtoCArt(product);
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
            onClick={(e) => (token ? addToCart(e) : push("/main"))}
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

  return (
    <>
      {animateImage && (
        //@ts-ignore
        <img src={renderImage()} alt="" style={renderAnimation()} />
      )}
      <div
        className={`ltn__small-product-item ltn__product-item-3 ${
          addLoading && "pointer__Event"
        }`}
      >
        <div
          className="small-product-item-img"
          //   onClick={() => handleViewProduct(product)}
        >
          <Link href="#">
            <div className="card_img">
              <img src={renderImage()} alt="" />
            </div>
          </Link>
        </div>
        <div className="small-product-item-info mt-10">
          {has_discount_promotion() && (
            <div className="product-badge">
              <ul>
                <li className="sale-badge">5</li>
              </ul>
            </div>
          )}
          <h2
            className="product-title "
            // onClick={() => handleViewProduct(product)}
          >
            <Link className="line-clamp____2" href={`/details?product=${product.id}`}>{product.name}</Link>
          </h2>
          <div className="cart-footer">
            <div className="product-price">
              <span>${product.variation.new_price}</span>
              {has_discount_promotion() && product.variation.price && (
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

export default VerticalProductCard;

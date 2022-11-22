import Link from "next/link";
import React, { MutableRefObject, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilState, useRecoilValue } from "recoil";
import { X } from "tabler-icons-react";
import { formatFloatNumber } from "../../../../helpers/Common";
import {
  AddToCartAtom,
  AllCartsInfoAtom,
  CartItemsAtom,
  RemveFromCartAtom,
  TokenAtom,
} from "../../../../helpers/recoil";
import { deleteCart, updateCart } from "../../../../helpers/server/services";
import FetchedItemsType from "../../../../helpers/types/FetchedItemsType";

interface Props {
  product: FetchedItemsType;
  loading: boolean;
  setLoading: any;
}

function Row({ product, loading, setLoading }: Props) {
  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>;
  const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfoAtom);
  const { addToast } = useToasts();
  const [token, setToken] = useRecoilState(TokenAtom);

  const handleAddToCart = async (clickedItem: FetchedItemsType) => {
    setCartItems((prev) => {
      const isItemInCarts = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCarts) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                //@ts-ignore
                actual_quantity: item?.actual_quantity + 1,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          ...clickedItem,
          type: 1,
          quantity: 1,
          product_id: clickedItem.product_id,
          branch_id: 1,
          description: "",
          modifierGroups: [],
          variation_id: clickedItem.variation_id,
        },
      ];
    });
    const isItemInCarts = cartItems.findIndex(
      (item) => item.id === clickedItem.id
    );
    if (isItemInCarts >= 0) {
      let newQuantity = cartItems[isItemInCarts].quantity;
      newQuantity++;
      let id = cartItems[isItemInCarts].id;

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        setLoading(true);
        if (id) {
          const res = await updateCart(token, id, newQuantity);
          if (res === null) {
            addToast("Something wrong happened!", { appearance: "error" });
          }
          if (res === 400) {
            addToast("no more quantity available", { appearance: "error" });
          } else {
            setAllCartsInfo(res.result);
            setCartItems(res.result.items);
          }
        }
        setLoading(false);
      }, 700);
    }
  };

  const handleRemoveFromCart = async (id: number, reomve?: string) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack;
          if (reomve) return ack;
          if (
            item.available_quantity &&
            //@ts-ignore
            item.actual_quantity > item.available_quantity
          )
            return [
              ...ack,
              {
                ...item,
                quantity: item.available_quantity,
                actual_quantity: item.available_quantity,
              },
            ];
          return [
            ...ack,
            {
              ...item,
              quantity: item.quantity - 1,
              //@ts-ignore
              actual_quantity: item.actual_quantity - 1,
            },
          ];
        } else {
          return [...ack, item];
        }
      }, [] as FetchedItemsType[])
    );

    const isItemInCarts = cartItems.findIndex((item) => item.id === id);
    let itemQuantity = cartItems[isItemInCarts].quantity;
    let availableQuantity = cartItems[isItemInCarts].available_quantity;

    if (availableQuantity && itemQuantity > availableQuantity) {
      itemQuantity = availableQuantity;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        setLoading(true);
        const res = await updateCart(token, id, itemQuantity);
        if (res === null) {
          addToast("Something wrong happened!", { appearance: "error" });
        } else {
          setAllCartsInfo(res.result);
          setCartItems(res.result.items);
        }
        setLoading(false);
      }, 1000);
    }
    if (itemQuantity > 1 && !reomve) {
      itemQuantity--;
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(async () => {
        setLoading(true);
        const res = await updateCart(token, id, itemQuantity);
        if (res === null) {
          addToast("Something wrong happened!", { appearance: "error" });
        } else {
          setAllCartsInfo(res.result);
          setCartItems(res.result.items);
        }
        setLoading(false);
      }, 700);
    } else if (itemQuantity === 1 || reomve) {
      clearTimeout(timerRef.current);
      setLoading(true);
      const res = await deleteCart(token, id);
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        setAllCartsInfo(res.result);
        setCartItems(res.result.items);
      }
      setLoading(false);
    }
  };

  return (
    <tr
      className={` ${
        //@ts-ignore
        product.in_stock < 1
          ? " unavailable___"
          : product.in_stock === 1 &&
            product.product?.tracking_type === 1 &&
            "bg-white"
      } ${
        product.in_stock === 1 &&
        product.product?.tracking_type === 2 &&
        //@ts-ignore
        product.actual_quantity > product.available_quantity
          ? " unavailable___"
          : "bg-white"
      }   ${
        product.in_stock === 1 &&
        product.product?.tracking_type === 3 &&
        //@ts-ignore
        product.actual_quantity > product.available_quantity
          ? " unavailable___"
          : "bg-white"
      } `}
    >
      <td>
        <div className="table_row">
          <span onClick={() =>product?.id&& handleRemoveFromCart(product?.id, "remove")}>
            <X />
          </span>
        </div>
      </td>
      <td className="cart-product-image flex">
        <Link href="">
          <img className="mt-10" src={product.product?.image?.path} alt="#" />
        </Link>
      </td>
      <td>
        <h5 className="truncate">
          <strong>{product?.product?.name}</strong>
        </h5>
      </td>
      <td>
        <div className="table_row">
          <p className="mt-10">${product?.variation?.price}</p>
        </div>
      </td>
      <td>
        <div className="table_row">
          <div className="inc_dec">
            <span
              onClick={() => product?.id && handleRemoveFromCart(product?.id)}
              className="span_ cursor_pointer"
            >
              <span className="span__">
                <i className="icon-remove"></i>
              </span>
            </span>
            <span className="span_">
              <span className="span__">{product.quantity}</span>
            </span>
            {product.in_stock === 1 && product.product?.tracking_type === 1 && (
              <span className="span_">
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{ backgroundColor: "transparent" }}
                  className="cursor_pointer puttom__disable"
                >
                  <i className="icon-plus"></i>
                </button>
              </span>
            )}
            {product.in_stock === 1 &&
              (product.product?.tracking_type === 2 ||
                product.product?.tracking_type === 3) && (
                <span className="span_">
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{ backgroundColor: "transparent" }}
                    className="cursor_pointer puttom__disable"
                    disabled={
                      product.actual_quantity === product.available_quantity
                        ? true
                        : false
                    }
                  >
                    <i className="icon-plus"></i>
                  </button>
                </span>
              )}
          </div>
        </div>
      </td>
      <td className="cart-product-subtotal">
        <div className="table_row">
          <p className="mt-10">
            {
              product?.variation?.price &&
            formatFloatNumber(product.quantity * product?.variation?.price )
            }
          </p>
        </div>
      </td>
    </tr>
  );
}

const CartProducts = () => {
  const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);
  const [loading, setLoading] = useState(false);

  const data = cartItems.map((product, index) => {
    return (
      <Row
        loading={loading}
        setLoading={setLoading}
        key={index}
        product={product}
      />
    );
  });
  return (
    <div
      className={`shoping-cart-table table-responsive ${
        loading && "pointer__Event"
      }`}
    >
      {cartItems.length > 0 && (
        <>
          <h4 className="title-1">Products</h4>
          <table className="table">
            <tbody>{data}</tbody>
          </table>
        </>
      )}

      {cartItems.length === 0 && (
        <h2 className="text-primary">No Products Found!</h2>
      )}
    </div>
  );
};

export default CartProducts;

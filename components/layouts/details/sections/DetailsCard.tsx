import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import { Minus, Plus, ShoppingCartPlus } from "tabler-icons-react";
import {
  AllCartsInfoAtom,
  CartItemsAtom,
  DetailsAtom,
  LocalCartAtom,
  TokenAtom,
  VariationsAtom,
} from "../../../../helpers/recoil";
import { addToCart } from "../../../../helpers/server/services";
import DetailsType from "../../../../helpers/types/DetailsType";
import LocalCartItemType from "../../../../helpers/types/LocalCartItemType";
import DetailsBaseButton from "../../../buttons/DetailsBaseButton";
import CircleProgressBar from "../../progress-bar";
import MoveToCartPageModal from "./MoveToCartPageModal";

const DetailsCard = () => {
  const [detailsState, setDetailsState] = useRecoilState(DetailsAtom);
  const [variationsState, setVariationsState] = useRecoilState(VariationsAtom);
  const [attributeNames, setAttributeNames] = useState<{
    [key: string]: { id: number; parent_id: number; name: string }[];
  }>({});
  const [boolAttributeValue, setBoolAttributeValue] = useState<{
    [key: number]: boolean;
  }>({});
  const [attributeValueNumbers, setAttributeValueNumber] = useState<any>();
  const [selectedAttributes, setSelectedAttributes] = useState<number[]>([]);
  const [newArrayOFArray, setNewArrayOFArry] = useState<any>();
  const [attributeToSetVAriation, setAttributesToSetVAriation] = useState<{
    id: number;
    parent: number;
  }>();
  const [localCart, setLocalCart] = useRecoilState(LocalCartAtom);
  const [token, setToken] = useRecoilState(TokenAtom);
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfoAtom);
  const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const handleAddToCart = async (clickedItem: DetailsType) => {
    setLocalCart((prev) => {
      const isItemInCarts = prev.find(
        (item) =>
          item.product_id === clickedItem.product.id &&
          item.variation_id === variationsState.id
      );
      if (isItemInCarts) {
        return prev.map((item) =>
          item.product_id === clickedItem.product.id &&
          item.variation_id === variationsState.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          type: 1,
          quantity: 1,
          product_id: clickedItem.product.id,
          branch_id: 1,
          variation_id: variationsState.id,
        },
      ];
    });
  };

  const handleRemoveFromCart = async (id: number, reomve?: string) => {
    setLocalCart((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack;
          if (reomve) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as LocalCartItemType[])
    );
  };

  useEffect(() => {
    detailsState.variations.map((item) => {
      if (item.is_default === 1) {
        setVariationsState(item);
      }
    });
  }, [detailsState]);

  useEffect(() => {
    setLocalCart([]);
    if (variationsState.in_stock === 1) {
      if (detailsState.product?.tracking_type === 1) {
        setLocalCart([
          {
            type: 1,
            quantity: 1,
            product_id: detailsState.product.id,
            description: "item",
            variation_id: variationsState.id,
            branch_id: 1,
          },
        ]);
      } else if (
        detailsState.product?.tracking_type === 2 ||
        detailsState.product?.tracking_type === 3
      ) {
        if (variationsState.available_quantity !== 0) {
          setLocalCart([
            {
              type: 1,
              quantity: 1,
              product_id: detailsState.product.id,
              description: "item",
              variation_id: variationsState.id,
              branch_id: 1,
            },
          ]);
        }
      }
    }
  }, [variationsState]);

  useEffect(() => {
    let index: number;
    const newNames = attributeNames;
    for (let i = 0; i < detailsState.variations?.length; i++) {
      const attributes = detailsState?.variations[i]?.attributes;
      if (attributes)
        for (let j = 0; j < attributes.length; j++) {
          const attribute = attributes[j];
          const Parent_id: number = attribute.id;
          let attribute_value = {
            id: attribute.attribute_values.id,
            name: attribute.attribute_values.name,
            parent_id: Parent_id,
          };
          if (newNames[`${attribute.name}`]) {
            const value = newNames[attribute.name];
            index = value.findIndex(
              (val: { id: number; parent_id: number; name: string }) =>
                val.id === attribute_value.id
            );
            if (index < 0) {
              newNames[`${attribute.name}`].push(attribute_value);
            }
          } else {
            newNames[`${attribute.name}`] = [attribute_value];
          }
        }
    }
    setAttributeNames(newNames);
  }, [detailsState]);

  useEffect(() => {
    let attributValueID: number[] = [];
    let attributeValueNumber: any = [];
    detailsState.variations?.map((variation) => {
      if (variation.attributes && variation.attributes?.length > 0) {
        variation.attributes?.map((attribut) => {
          attributValueID.push(attribut.attribute_values.id);
          setBoolAttributeValue((prev) => ({
            ...prev,
            [attribut.attribute_values.id]: false,
          }));
        });

        attributeValueNumber.push(attributValueID);
        attributValueID = [];
      }
      // if (variation.is_default) {
      //   setVariationState(variation);
      // }
    });
    setAttributeValueNumber(attributeValueNumber);
  }, [detailsState]);

  useEffect(() => {
    setSelectedAttributes([]);
    variationsState.attributes?.map((attribute) => {
      setSelectedAttributes((prev) => [...prev, attribute.attribute_values.id]);
    });
  }, [variationsState]);

  useEffect(() => {
    let arrayOfArrays: any = [];
    let errorCount: number = 0;

    if (
      attributeValueNumbers &&
      attributeValueNumbers.length > 0 &&
      selectedAttributes &&
      selectedAttributes.length > 0
    ) {
      for (let i = 0; i < attributeValueNumbers.length; i++) {
        errorCount = 0;
        const attribute = [...attributeValueNumbers[i]];

        for (let j = 0; j < attribute.length; j++) {
          const selectedAttribute = selectedAttributes[j];
          const valueAttribute = attribute[j];
          if (selectedAttribute !== valueAttribute) {
            errorCount++;
          }
        }
        //most be ===1
        if (errorCount === 1) {
          arrayOfArrays.push(attribute);
        }
      }
    }
    setNewArrayOFArry(arrayOfArrays);
  }, [
    selectedAttributes,
    attributeValueNumbers,
    variationsState,
    attributeToSetVAriation,
  ]);

  useEffect(() => {
    detailsState.variations?.map((variation) => {
      if (variation.attributes && variation.attributes?.length > 0) {
        variation.attributes?.map((attribut) => {
          setBoolAttributeValue((prev) => ({
            ...prev,
            [attribut.attribute_values.id]: false,
          }));
        });
      }
    });
    Object.keys(boolAttributeValue).map((key) => {
      newArrayOFArray.map((array: number[]) => {
        array.map((attributeValue) => {
          if (attributeValue === +key) {
            setBoolAttributeValue((prev) => ({ ...prev, [key]: true }));
          }
        });
      });
    });
  }, [newArrayOFArray, variationsState, attributeToSetVAriation]);

  const handelAttribute = (value: { id: number; parent_id: number }) => {
    let num: { id: number; parent: number } = { id: -1, parent: -1 };
    num = { id: value.id, parent: value.parent_id };
    setAttributesToSetVAriation(num);

    let count = selectedAttributes.length;
    let countArray = 0;
    let checked: number[] = [];
    let index: number = -1;

    for (let i = 0; i < attributeValueNumbers?.length; i++) {
      const array: number[] = attributeValueNumbers[i];
      index = array.findIndex((value) => value === num?.id);
      if (index > -1) {
        break;
      }
    }
    selectedAttributes.map((item, i) => {
      if (index === i) {
        //@ts-ignore
        checked.push(num?.id);
      } else if (index !== i) {
        checked.push(item);
      }
    });
    for (let i = 0; i < attributeValueNumbers?.length; i++) {
      const array: number[] = attributeValueNumbers[i];
      countArray = 0;
      for (let j = 0; j < array.length; j++) {
        const element = array[j];
        const chec = checked[j];
        if (element === chec) {
          countArray++;
        }
      }
      if (countArray === count) {
        break;
      }
    }
    if (countArray === count) {
      let same: number = 1;
      detailsState.variations?.map((variation) => {
        same = 0;
        if (variation.attributes?.length !== 0) {
          //@ts-ignore
          for (let i = 0; i < variation.attributes?.length; i++) {
            //@ts-ignore
            const attribute = variation.attributes[i];
            if (attribute.attribute_values.id === checked[i]) {
              same++;
            }
          }
          if (same === count) {
            setVariationsState(variation);
          }
        }
      });
    }
    if (countArray < count) {
      detailsState.variations.map((variation) => {
        if (num?.id) {
          variation.attributes?.map((attribute) => {
            if (
              attribute.id === num.parent &&
              attribute.attribute_values.id === num.id
            ) {
              setVariationsState(variation);
            }
          });
        }
      });
    }
  };

  const getbg = (id: number) => {
    let isfound = false;
    Object.keys(boolAttributeValue).forEach((key) => {
      const val = boolAttributeValue[+key];
      if (+key === id) {
        isfound = val;
      }
    });
    return isfound;
  };

  const CartButton = (id: number) => {
    if (variationsState.in_stock < 1) {
      return (
        <p className="detailsProducts_not_available">
          this product is not available now !!
        </p>
      );
    } else if (variationsState.in_stock === 1) {
      if (detailsState.product?.tracking_type === 1) {
        let indexcart: number;
        indexcart = localCart.findIndex((item) => item.variation_id === id);
        if (indexcart >= 0) {
          return (
            <div className="container__ product-count-btns">
              <button
                //@ts-ignore
                onClick={() => handleRemoveFromCart(localCart[indexcart].id)}
                disabled={localCart[indexcart].quantity === 1 ? true : false}
              >
                <Minus size="20" />
              </button>
              <span className="child__ count-num">
                {cartItems[indexcart].quantity}
              </span>
              <button onClick={() => handleAddToCart(detailsState)}>
                <Plus size="20" />
              </button>
            </div>
          );
        }
      } else if (
        detailsState.product?.tracking_type == 2 ||
        detailsState.product?.tracking_type == 3
      ) {
        if (variationsState.available_quantity === 0) {
          return (
            <p className="detailsProducts_not_available">
              this product is not available now !!
            </p>
          );
        } else if (variationsState.available_quantity > 0) {
          let indexcart: number;
          indexcart = localCart.findIndex((item) => item.variation_id === id);
          if (indexcart >= 0) {
            return (
              <div
                style={{ marginLeft: "12px" }}
                className="container__ product-count-btns"
              >
                <button
                  onClick={() =>
                    //@ts-ignore
                    handleRemoveFromCart(localCart[indexcart].id)
                  }
                  disabled={localCart[indexcart].quantity === 1 ? true : false}
                >
                  <Minus size="20" />
                </button>
                <span className="child__ count-num">
                  {localCart[indexcart].quantity}
                </span>
                <button
                  onClick={() => handleAddToCart(detailsState)}
                  disabled={
                    localCart[indexcart].quantity ===
                    variationsState.available_quantity
                      ? true
                      : false
                  }
                >
                  <Plus size="20" />
                </button>
              </div>
            );
          }
        }
      }
    }
  };

  const finallAddtoCart = async () => {
    localCart.map(async (item) => {
      setLoading(true);
      if (item.variation_id) {
        const res = await addToCart(
          token,
          1,
          item.product_id,
          item.variation_id,
          1,
          1,
          item.quantity
        );
        if (res === null) {
          addToast("Something wrong happened!", { appearance: "error" });

          setLoading(false);
        } else if (res == 400) {
          addToast("this Product Is not avalibale now !!", {
            appearance: "error",
          });

          setLoading(false);
        } else {
          setAllCartsInfo(res.result);
          setCartItems(res.result.items);
          setOpen(true);
          setLoading(false);
        }
      }
    });
  };

  return (
    <div>
      <span className="details_Card_span">{detailsState.product?.name}</span>
      <div className="details_Card_First_div">
        <div className="details_card_info_div">
          <span style={{ fontSize: "22px", fontWeight: "bold" }}>
            ${variationsState?.new_price?.toFixed(1)}
          </span>
          <span
            style={{ textDecorationLine: "line-through", color: "#9098B1" }}
          >
            ${variationsState?.price?.toFixed(1)}
          </span>
          <span style={{ color: "#33A0FF", fontWeight: "bold" }}>24% Off</span>
        </div>
        <div className="details_card_info_div">
          <span className="spn_info">Availability:</span>
          <span className="spn_info">
            {variationsState?.available_quantity}
          </span>
        </div>
        <div className="details_card_info_div">
          <span className="spn_info">Category:</span>
          <span className="spn_info">Accessories</span>
        </div>
      </div>

      <div className="details_card_Variants">
        {Object.keys(attributeNames).map((key, i) => {
          const values = attributeNames[key];
          return (
            <div key={i}>
              <div>
                <h3
                  style={{
                    fontWeight: "bold",
                    marginTop: "20px",
                    fontSize: "16px",
                  }}
                  className=""
                >
                  {key}
                </h3>
                <div className="details_Tap_father">
                  {values.map((value: any, index: number) => {
                    return (
                      <DetailsBaseButton
                        key={index}
                        onClick={() => handelAttribute(value)}
                        className={`
                        ${
                          selectedAttributes.findIndex(
                            (item: number) => item === value.id
                          ) > -1 && " details_card_tap_active"
                        } 
                        ${
                          getbg(value.id) &&
                          selectedAttributes.findIndex(
                            (item: number) => item === value.id
                          ) === -1
                            ? "details_card_tap_not_active"
                            : selectedAttributes.findIndex(
                                (item: number) => item === value.id
                              ) === -1 && "details_Product_disable"
                        }
                        details_product_taps`}
                      >
                        {value.name}
                      </DetailsBaseButton>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="details_add_section">
        {CartButton(variationsState.id)}
        <div className="details_add_buy">
          {!loading ? (
            <div className={``}>
              <button
                className="details_card_tap_active product-btns disable_add"
                style={{ whiteSpace: "nowrap" }}
                disabled={
                  variationsState.in_stock === 0
                    ? true
                    : detailsState.product?.tracking_type === 1
                    ? false
                    : detailsState.product?.tracking_type === 2 &&
                      variationsState.available_quantity === 0
                    ? true
                    : detailsState.product?.tracking_type === 3 &&
                      variationsState.available_quantity === 0
                    ? true
                    : false
                }
                onClick={() =>
                  token.length > 1 ? finallAddtoCart() : push("/main")
                }
              >
                <ShoppingCartPlus size="17" />
                Add to cart
              </button>
            </div>
          ) : (
            <div style={{ width: "116px" }} className="details_add_buy ">
              <CircleProgressBar height={60} />
            </div>
          )}
          <button className="theme-btn-1 btn btn-effect-1 animated_green text-uppercase">
            Buy Now
          </button>
        </div>
      </div>
      {open && <MoveToCartPageModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default DetailsCard;

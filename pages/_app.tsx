import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  atom,
  RecoilRoot,
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  Suspense,
  ReactNode,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
} from "react";
import CircleProgressBar from "../components/layouts/progress-bar";
import StickyHeader from "../components/headers/sticky-home/StickyHeader";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { TokenAtom } from "../helpers/recoil/token";
import Footer from "../components/fotter/Footer";
import {
  addToCart,
  deleteCart,
  getBrands,
  getCartItems,
  getCountries,
  getHomePageData,
  getUser,
  updateCart,
} from "../helpers/server/services";
import { UserAtom } from "../helpers/recoil/user";
import { CountriesAtom } from "../helpers/recoil/profile";
import { CountriesType, ProductsType } from "../helpers/types";
import {
  AddressAtom,
  AddToCartAtom,
  AddToCartLoadingAtom,
  AllCartsInfoAtom,
  BrandsAtom,
  CartItemsAtom,
  CategoriesAtom,
  FeaturedCategoriesAtom,
  RemveFromCartAtom,
  SliderAtom,
} from "../helpers/recoil";
import FetchedItemsType from "../helpers/types/FetchedItemsType";
import MobileMenu from "../components/sidebars/mobile-menu/MobileMenu";
import BrandsDialog from "../components/dialogs/BrandsDialog";
import CategoriesDialog from "../components/dialogs/CategoriesDialog";
import openBrandsDialogAtom from "../helpers/recoil/sidebar/openBrandsDialogAtom";
import openCategoriesDialogAtom from "../helpers/recoil/sidebar/openCategoriesDialogAtom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//@ts-ignore
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISH_KEY);


interface Props {
  children: ReactNode;
}
let modifCountries: CountriesType[] = [];

const MyApp = ({ children }: Props) => {
  const [token, setToken] = useRecoilState(TokenAtom);
  const [userInfo, setUserInfo] = useRecoilState(UserAtom);
  const [countries, setCountries] = useRecoilState(CountriesAtom);
  const { addToast } = useToasts();
  const [progress, setPropgress] = useState(false);
  const [categories, setCategories] = useRecoilState(CategoriesAtom);
  const [featuredCategory, setFeaturedCategory] = useRecoilState(
    FeaturedCategoriesAtom
  );
  const [slider, setSlider] = useRecoilState(SliderAtom);
  const [brands, setBrands] = useRecoilState(BrandsAtom);
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfoAtom);
  const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);
  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>;
  const setAddTocartFun = useSetRecoilState(AddToCartAtom);
  const setRemoveFromCartFun = useSetRecoilState(RemveFromCartAtom);
  const [addLoading, setAddLoading] = useRecoilState(AddToCartLoadingAtom);
  const [openBrandDialog, setOpenBrandDialog] =
    useRecoilState(openBrandsDialogAtom);
  const [openCategoriesDialog, setOepnCategoriesDialog] = useRecoilState(
    openCategoriesDialogAtom
  );
  const [loadAll, setLoadAll] = useState(true);
  useEffect(() => {
    const Token = localStorage.getItem("token" || "");
    if (Token !== null) setToken(Token);
  }, []);

  const handleAddToCart = async (product: ProductsType) => {
    if (product.id && product.variation.id) {
      setCartItems((prev) => {
        const isItemInCarts = prev.find(
          (item) =>
            item.product_id === product.id &&
            item.variation_id === product.variation.id
        );
        if (isItemInCarts) {
          return prev.map((item) =>
            item.product_id === product.id &&
            item.variation_id === product.variation.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [
          ...prev,
          {
            type: 1,
            quantity: 1,
            product_id: product.id,
            branch_id: 1,
            variation_id: product.variation.id,
          },
        ];
      });
    }
    const isItemInCarts = cartItems.findIndex((item) => {
      return (
        item.product_id === product.id &&
        item.variation_id === product.variation.id
      );
    });
    if (isItemInCarts < 0) {
      setAddLoading(true);
      if (product.id && product.variation.id) {
        const res = await addToCart(
          token,
          1,
          product.id,
          product.variation.id,
          1,
          1,
          1
        );
        if (res === null) {
          addToast("Something wrong happened!", { appearance: "error" });
        } else if (res == 400) {
          addToast("this product is not available now !", {
            appearance: "error",
          });
        } else {
          setCartItems(res.result.items);
          setAllCartsInfo(res.result);
        }
        setAddLoading(false);
      }
    }
    if (isItemInCarts >= 0) {
      let newQuantity = cartItems[isItemInCarts].quantity;
      newQuantity++;
      let id = cartItems[isItemInCarts].id;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        if (id) {
          const res = await updateCart(token, id, newQuantity);
          if (res === null) {
            addToast("Something wrong happened!", { appearance: "error" });
          } else if (res == 400) {
            addToast("this product is not available now !", {
              appearance: "error",
            });
          } else {
            setCartItems(res.result.items);
            setAllCartsInfo(res.result);
          }
        }
      }, 1000);
    }
  };

  const handleRemoveFromCart = async (id: number, reomve?: string) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack;
          if (reomve) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as FetchedItemsType[])
    );

    const isItemInCarts = cartItems.findIndex((item) => item.id === id);
    let itemQuantity = cartItems[isItemInCarts].quantity;

    if (itemQuantity > 1 && !reomve) {
      itemQuantity--;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        if (id) {
          const res = await updateCart(token, id, itemQuantity);
          if (res == null) {
            addToast("Something wrong happened!", { appearance: "error" });
          } else if (res === 400) {
            addToast("Something wrong happened!", { appearance: "error" });
          } else {
            setCartItems(res.result.items);
            setAllCartsInfo(res.result);
          }
        }
      }, 1000);
    } else if (itemQuantity === 1 || reomve) {
      clearTimeout(timerRef.current);
      if (id) {
        const res = await deleteCart(token, id);
        if (res === null) {
          addToast("Something wrong happened!", { appearance: "error" });
        } else {
          setCartItems(res.result.items);
          setAllCartsInfo(res.result);
        }
      }
    }
  };

  useEffect(() => {
    setAddTocartFun(() => handleAddToCart);
    setRemoveFromCartFun(() => handleRemoveFromCart);
  }, [token, cartItems]);

  useEffect(() => {
    const getData = async () => {
      const res = await getCartItems(token);
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        setAllCartsInfo(res.result);
        setCartItems(res.result.items);
      }
    };
    if (token.length > 1) {
      getData();
    }
  }, [token]);

  useEffect(() => {
    const getdata = async () => {
      const res = await getUser(token);
      if (res === null) {
      } else {
        setUserInfo(res.data);
      }
    };
    if (token.length > 0) {
      getdata();
    }
  }, [token]);

  useEffect(() => {
    setPropgress(true);
    const getData = async () => {
      const res = await getHomePageData();
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
        setLoadAll(false);
      } else {
        setSlider(res.result.slider);
        setCategories(res.result.all_categories);
        setFeaturedCategory(res.result.featured_categories);
        setPropgress(false);
        setLoadAll(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await getBrands();
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        setBrands(res.result.brands);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getdata = async () => {
      const res = await getCountries();
      if (res === null) {
      } else {
        let modifiedResponse = res.result;
        modifiedResponse.map((item: { id: number; name: string }) => {
          let countreyValue = item.id.toString();

          let countreyLabel = item.name;
          let newCountriesStructur = {
            label: countreyLabel,
            value: countreyValue,
          };
          if (modifCountries.length < 250) {
            modifCountries.push(newCountriesStructur);
          }
        });
        setCountries(modifCountries);
      }
    };
    getdata();
  }, []);

  return (
    <div>
      {!loadAll ? (
        <div>
          {openBrandDialog && <BrandsDialog />}
          {openCategoriesDialog && <CategoriesDialog />}
          <Elements stripe={stripePromise}>{children}</Elements>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircleProgressBar height={60} />
        </div>
      )}
    </div>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <RecoilRoot>
        <ToastProvider>
          <MyApp>
            <MobileMenu />

            <StickyHeader />
            <Component {...pageProps} />
            <Footer />
          </MyApp>
        </ToastProvider>
      </RecoilRoot>
    </div>
  );
}

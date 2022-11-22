import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const PRO_SALE_USER = "PRO_SALE_USER";
const PRO_SALE_TOKEN = "PRO_SALE_TOKEN";
const PRO_SALE_CART = "PRO_SALE_CART";
const PRO_SALE_PRODUCTS_PAGE = "PRO_SALE_PRODUCTS_PAGE";

const failed = "Failed";
const canceled = "Canceled";
const pending = "Pending";
const processing = "Processing";
const delivered = "Delivered";
const CATEGORIES = "CATEGORIES";
const SUB_CATEGORIES = "SUB_CATEGORIES";
const BRAND = "BRAND";
const SEARCH = "SEARCH";

const STORE = "Continue as a store";
const INDIVIDUAL = "Continue as an individual";
const GUEST = "Continue as a guest";

const BASE_COMPONENT = 1;
const LOGIN_COMPONENT = 2;
const REGISTER_STEP1_COMPONENT = 3;
const REGISTER_STEP2_COMPONENT = 4;
const FORGET_PASSWORD = 5;

const PROMOTIONS = "PROMOTIONS";
const PRODUCTS_PROMOTION = "PRODUCTS_PROMOTION";
const PRODUCTS = "PRODUCTS";
const HOME_PAGE = "HOME_PAGE";

const profileSections = {
  account: "Account Details",
  orders: "My Orders",
  addresses: "My Addresses",
};

const setUser = (user) => {
  localStorage.setItem(PRO_SALE_USER, JSON.stringify(user));
};

const setToken = (token) => {
  localStorage.setItem(PRO_SALE_TOKEN, token);
};

const getUser = () => {
  const user = localStorage.getItem(PRO_SALE_USER);
  if (user) return JSON.parse(user);
  return null;
};

const getToken = () => {
  const token = localStorage.getItem(PRO_SALE_TOKEN);
  if (token) return token;
  return null;
};

const removeUser = () => {
  localStorage.clear();
};

const addCart = (cart) => {
  localStorage.setItem(PRO_SALE_CART, JSON.stringify(cart));
};

const getCart = () => {
  const cart = localStorage.getItem(PRO_SALE_CART);
  return JSON.parse(cart);
};

const removeCart = () => {
  localStorage.removeItem(PRO_SALE_CART);
};

function calCartSubTotal(products) {
  let result = 0;
  for (let product of products) {
    result +=
      (product?.count ? product?.count : product?.quantity) *
      product.product.price;
  }
  return formatFloatNumber(result);
}

const confirmDialog = (title, content, callback) => {
  confirmAlert({
    title: title,
    message: content,
    buttons: [
      {
        label: "Confirm",
        onClick: () => {
          callback(true);
        },
      },
      {
        label: "No",
        onClick: () => {
          callback(false);
        },
      },
    ],
  });
};

const saveLocalSession = (data) => {
  sessionStorage.setItem(PRO_SALE_PRODUCTS_PAGE, JSON.stringify(data));
};

const getLocalSession = () => {
  const res = sessionStorage.getItem(PRO_SALE_PRODUCTS_PAGE);
  if (res) return JSON.parse(res);
  return null;
};

function checkInCart(cartProducts, productId) {
  for (let product of cartProducts) {
    if (product?.product?.id === productId) return product;
  }
  return 0;
}

const formatFloatNumber = (number) => {
  return +number.toFixed(3).toString().substr(0, 5);
};

function calSubTotal(products, deliveryFees) {
  let price = 0;
  for (let product of products) {
    price += product.quantity * product.product.price;
  }
  return formatFloatNumber(price + deliveryFees);
}

function getStaticStyle(top, left) {
  const static_style = {
    position: "fixed",
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    zIndex: 9999,
    left: left,
    top: top,
  };
  return static_style;
}

function getAnimateStyle() {
  const animate_style = {
    position: "fixed",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    left: "100vw",
    top: "50vh",
    zIndex: 9,
    transition: "2s all",
    opacity: 0.7,
  };
  return animate_style;
}

function getAnimateMobileStyle() {
  const animate_style = {
    position: "fixed",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    left: "15vw",
    top: "92%",
    zIndex: -5,
    transition: "2s all",
    opacity: 0.7,
  };
  return animate_style;
}

export {
  failed,
  canceled,
  pending,
  processing,
  delivered,
  SUB_CATEGORIES,
  CATEGORIES,
  BRAND,
  setUser,
  setToken,
  getUser,
  getToken,
  removeUser,
  addCart,
  getCart,
  removeCart,
  calCartSubTotal,
  confirmDialog,
  saveLocalSession,
  getLocalSession,
  checkInCart,
  formatFloatNumber,
  calSubTotal,
  getStaticStyle,
  getAnimateStyle,
  STORE,
  INDIVIDUAL,
  GUEST,
  SEARCH,
  PROMOTIONS,
  PRODUCTS,
  HOME_PAGE,
  BASE_COMPONENT,
  LOGIN_COMPONENT,
  REGISTER_STEP1_COMPONENT,
  REGISTER_STEP2_COMPONENT,
  FORGET_PASSWORD,
  PRODUCTS_PROMOTION,
  getAnimateMobileStyle,
  profileSections,
};

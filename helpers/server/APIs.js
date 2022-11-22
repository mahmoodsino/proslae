const root = process.env.NEXT_PUBLIC_BASE;
const baseURL = `${root}/api/v1/web`;

const HOME_PAGE = `${baseURL}/home`;
const FEATURED_PRODUCTS = `${baseURL}/products`;
const BRANDS = `${baseURL}/all-brands`;
const REGIDTERASINDIVIDUAL = `${baseURL}/user/register`;
const LOGIN = `${baseURL}/user/login`;
const LOGOUT = `${baseURL}user/logout`;
const USERINFO = `${baseURL}/user`;
const COUNTRIES = `${baseURL}/all-countries`;
const STATES = `${baseURL}/all-states`;
const CITIES = `${baseURL}/all-cities`;
const PRODUCTS = `${baseURL}/products`;
const ADDTOCART = `${baseURL}/carts`;
const UPDATECART = `${baseURL}/carts`;
const GETCARTITEMS = `${baseURL}/branch-carts?branch_id=1`;
const DELETECART = `${baseURL}/carts`;
const ADDADDRESS = `${baseURL}/address`;
const GETADDRESS = `${baseURL}/address`
const PROMOTIONS = `${baseURL}/promotions`
const DETAILS = `${baseURL}/products`
const SIMILARPRODUCTS = `${baseURL}/products`
const ABOUTUS = `${baseURL}/info/about`
const REGISTERASSTORE = `${baseURL}/user/busniss-register`
const CREATEORDER = `${baseURL}/orders`

export {
  HOME_PAGE,
  FEATURED_PRODUCTS,
  BRANDS,
  REGIDTERASINDIVIDUAL,
  LOGIN,
  LOGOUT,
  USERINFO,
  COUNTRIES,
  STATES,
  CITIES,
  PRODUCTS,
  ADDTOCART,
  UPDATECART,
  GETCARTITEMS,
  DELETECART,
  ADDADDRESS,
  GETADDRESS,
  PROMOTIONS,
  DETAILS,
  SIMILARPRODUCTS,
  ABOUTUS,
  REGISTERASSTORE,
  CREATEORDER
};

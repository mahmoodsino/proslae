import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";
import { Search } from "tabler-icons-react";
import { ShoppingCart, UserCheck, Logout } from "tabler-icons-react";
import openBrandsDialogAtom from "../../../helpers/recoil/sidebar/openBrandsDialogAtom";
import openCategoriesDialogAtom from "../../../helpers/recoil/sidebar/openCategoriesDialogAtom";
import OpenmobileMenuAtom from "../../../helpers/recoil/sidebar/OpenmobileMenuAtom";
import { TokenAtom } from "../../../helpers/recoil/token";
import SocialMedia from "../../drop-downs/SocialMedia";
import SimpleInput from "../../inputs/SimpleInput";
import SidebarMotion from "../../motions/Sidebar";

const MobileMenu = () => {
  const [token, setToken] = useRecoilState(TokenAtom);
  const [openMobileMenu, setOpenMobailMenu] =
    useRecoilState(OpenmobileMenuAtom);
  const [openBrandDialog, setOpenBrandDialog] =
    useRecoilState(openBrandsDialogAtom);
  const [openCategoriesDialog, setOepnCategoriesDialog] = useRecoilState(
    openCategoriesDialogAtom
  );

  const renderLinks = () => {
    return token ? (
      <>
        <li>
          <Link
            href="/profile/2"
            title="My Account"
            onClick={() => setOpenMobailMenu(false)}
          >
            <span className="utilize-btn-icon">
              <UserCheck />
            </span>
            My Account
          </Link>
        </li>
        <li>
          <Link
            href="/cart"
            title="Shopping Cart"
            onClick={() => setOpenMobailMenu(false)}
          >
            <span className="utilize-btn-icon">
              <ShoppingCart />
              <sup>5</sup>
            </span>
            Shopping Cart
          </Link>
        </li>
      </>
    ) : (
      <li>
        <Link href="/main" title="Login">
          <span className="utilize-btn-icon">
            <Logout />
          </span>
          Login
        </Link>
      </li>
    );
  };

  const handleCategoriesDialog = () => {
    setOepnCategoriesDialog(true);
    setOpenMobailMenu(false);
  };
  const handleBrandsDialog = () => {
    setOpenBrandDialog(true);
    setOpenMobailMenu(false);
  };

  const handleChange = (e: any) => {};

  const submitSearch = (e: any) => {
    e.preventDefault();
    setOpenMobailMenu(false);
  };

  return (
    <>
      <SidebarMotion
        className="ltn__utilize ltn__utilize-mobile-menu"
        isShow={openMobileMenu}
        direction="left"
        handleClose={() => setOpenMobailMenu(false)}
      >
        <div className="ltn__utilize-menu-inner ltn__scrollbar">
          <div className="ltn__utilize-menu-head">
            <div className="site-logo">
              <a href="#/">
                <img src="img/logo.svg" alt="Logo" />
              </a>
            </div>
            <button
              className="ltn__utilize-close"
              onClick={() => setOpenMobailMenu(false)}
            >
              ×
            </button>
          </div>
          <div className="ltn__utilize-menu-search-form">
            <form onSubmit={submitSearch}>
              <SimpleInput handleChange={handleChange} hint="Search..." />
              <button onClick={submitSearch}>
                <Search size="17" />
              </button>
            </form>
          </div>
          <div className="ltn__utilize-menu">
            <ul>
              <li>
                <Link href="/" onClick={() => setOpenMobailMenu(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" onClick={() => setOpenMobailMenu(false)}>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/promotions"
                  onClick={() => setOpenMobailMenu(false)}
                >
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setOpenMobailMenu(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  onClick={() => setOpenMobailMenu(false)}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  onClick={() => setOpenMobailMenu(false)}
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className="ltn__utilize-buttons ltn__utilize-menu ltn__utilize-buttons-2">
            <ul>
              <li onClick={handleCategoriesDialog}>
                <Link href="#">Categories</Link>
              </li>
              <li onClick={handleBrandsDialog}>
                <Link href="#">Brands</Link>
              </li>
            </ul>
          </div>
          <div className="ltn__utilize-buttons ltn__utilize-buttons-2">
            <ul>{renderLinks()}</ul>
          </div>
          <div className="ltn__social-media-2 mt-20">
            <SocialMedia />
          </div>
        </div>
      </SidebarMotion>
      {openMobileMenu && (
        <div
          onClick={() => setOpenMobailMenu(false)}
          className="dlack-div"
        ></div>
      )}
    </>
  );
};

export default MobileMenu;

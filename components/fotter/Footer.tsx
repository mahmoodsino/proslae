import React from "react";
import { useToasts } from "react-toast-notifications";
import { useMediaQuery } from "react-responsive";
import SocialMedia from "../drop-downs/SocialMedia";
import { MapPin, Phone, Mail } from "tabler-icons-react";
import { useRecoilState } from "recoil";
import { TokenAtom } from "../../helpers/recoil/token";
import Link from "next/link";

const Footer = () => {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 775px)" });
  const { addToast } = useToasts();
  const [token, setToken] = useRecoilState(TokenAtom);

  const handleLogin = () => {};

  const handleRegister = () => {};

  const renderPhones = () => {
    const phones = [];
    phones.push(
      <li>
        <div className="footer-address-icon">
          <Phone size="21" />
        </div>
        <div className="footer-address-info">
            <a href={`tel:111111`}>+111111111</a>
        </div>
      </li>
    );
    phones.push(
      <li>
        <div className="footer-address-icon">
          <Phone size="21" />
        </div>
        <div className="footer-address-info">
            <a href={`tel:111111`}>+111111111</a>
        </div>
      </li>
    );
    phones.push(
      <li>
        <div className="footer-address-icon">
          <Phone size="21" />
        </div>
        <div className="footer-address-info">
            <a href={`tel:111111`}>+111111111</a>
        </div>
      </li>
    );
    return <>{phones}</>;
  };

  const renderByToken = () => {
    return token ? (
      <>
        <li>
          <Link href="/profile">My Account</Link>
        </li>
        <li>
          <Link href="/cart">Cart</Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link href="/main" onClick={handleLogin}>
            Login
          </Link>
        </li>
        <li>
          <Link href="/main" onClick={handleRegister}>
            Register
          </Link>
        </li>
      </>
    );
  };

  const renderSiteMap = () => {
    if (!isMobileOrTablet)
      return (
        <div className="col-2">
          <div className="footer-widget footer-menu-widget clearfix">
            <h4 className="footer-title">
              <strong>Site Map</strong>
            </h4>
            <div className="footer-menu">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/promotions">Promotions</Link>
                </li>
                {renderByToken()}
                <li>
                  <Link href="/terms-conditions">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    return null;
  };

  return (
    <footer className="ltn__footer-area">
      <div className="footer-top-area section-bg-1 plr--5">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 col-12">
              <div className="footer-widget footer-about-widget">
                <div className="footer-logo">
                  <div className="site-logo">
                    <img src="img/logo.svg" alt="Logo" />
                  </div>
                </div>
                <p className="mt-4 mb-4 pl-2">
                  Lorem Ipsum is simply dummy text of the and typesetting
                  industry. Lorem Ipsum is dummy text of the printing.
                </p>
                <div className="footer-address pl-2">
                  <ul>
                    <li>
                      <div className="footer-address-icon">
                        <MapPin size="21" />
                      </div>
                      <div className="footer-address-info">
                        <p>location</p>
                      </div>
                    </li>
                    {renderPhones()}
                    <li>
                      <div className="footer-address-icon">
                        <Mail size="21" />
                      </div>
                      <div className="footer-address-info">
                          <a href={`mailto:test@test.com`}>test@test.com</a>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 mb-30">
                  <SocialMedia />
                </div>
              </div>
            </div>
            {renderSiteMap()}
            <div className="col-md-6 col-lg-5 col-12">
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=newyork&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameBorder="0"
                    scrolling="no"
                    // marginHeight="0"
                    // marginWidth="0"
                    title="location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__copyright-area ltn__copyright-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="ltn__copyright-design clearfix">
                <p className="text-center">
                  All Rights Reserved @ {new Date().getFullYear()} THE WHOLESALE
                  HOUSE INC.
                  <span className="current-year"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Mail, MapPin, Phone } from "tabler-icons-react";
import { useMediaQuery } from "react-responsive";
import SocialMedia from "../../../drop-downs/SocialMedia";
import Link from "next/link";

const TopArea = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  const renderComponent = () => {
    if (!isMobile) {
      return (
        <>
          <div className="col-md-7">
            <div className="ltn__top-bar-menu">
              <ul>
                <li>
                  <a href="mailto:info@webmail.com">
                    <Mail size="23" />
                    <span>test@test.com</span>
                  </a>
                </li>
                <li>
                  <Link href="#" title="">
                    <MapPin size="23" />
                    <span>location</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-5">
            <div className="top-bar-right text-right">
              <div className="ltn__top-bar-menu">
                <ul style={{ margin: "10px 0px" }}>
                  <li>
                    <a href={"tel:" + ""} title={""}>
                      <Phone size="23" />
                      <span>Need Help? </span>
                    </a>
                  </li>
                  <li>
                    <SocialMedia />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="col-md-12">
          <div className="top-bar-right text-right">
            <div className="ltn__top-bar-menu">
              <ul className="top_mobile">
                <li>
                  <a href={"tel:" + ""} title={""}>
                    <Phone size="23" />
                    <span>Need Help? </span>
                  </a>
                </li>
                <li>
                  <SocialMedia />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-20">
          <div className="site-logo">
            <Link href="#">
              <img src="img/logo.svg" alt="Logo" />
            </Link>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="ltn__header-top-area">
      <div className="container">
        <div className="row">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default TopArea;

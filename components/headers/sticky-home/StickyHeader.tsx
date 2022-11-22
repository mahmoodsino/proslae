import React,{useState} from 'react'
import { useShowStickyHeader } from "../../../helpers/hooks";
import HeaderSearch from "../static-home/middle-area/HeaderSearch";
import { FadeMotion } from "../../motions";
import Navbar from "../Navbar";
import { Search, X } from "tabler-icons-react";
import { useMediaQuery } from "react-responsive";
import Link from 'next/link';
import UserDropDown from '../../drop-downs/User';
import MobileMenuBTN from "../../buttons/MobileMenuBTN";

const StickyHeader = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const { showHeader } = useShowStickyHeader.default();
  const [searchInput, setSearchInput] = useState(false);


  const toggleMenu = () => {

  };

  const toggleSearchInput = () => {
    setSearchInput((prevState) => !prevState);
  };

  const renderResponsiveComponent = () => {
    if (!isMobile)
      return (
        <>
          <div className="header-menu header-menu-2">
            {searchInput && (
              <FadeMotion isShow={true}>
                <div className="mt-10 mb-10">
                  <HeaderSearch />
                </div>
              </FadeMotion>
            )}
            {!searchInput && (
              <FadeMotion isShow={true}>
                <Navbar isSticky={true} />
              </FadeMotion>
            )}
          </div>
          <div className="right_side_header">
            <div className="header-search-wrap relative_">
              <div className="header-search-1" onClick={toggleSearchInput}>
                <div className="search-icon">
                  {!searchInput ? <Search /> : <X />}
                </div>
              </div>
            </div>
            <div>
              <UserDropDown />
            </div>
          </div>
          <div className="mobile-menu-toggle d-xl-none" onClick={toggleMenu}>
            <Link href="#" className="ltn__utilize-toggle">
              <svg viewBox="0 0 800 600">
                <path
                  d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                  id="top"
                ></path>
                <path d="M300,320 L540,320" id="middle"></path>
                <path
                  d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                  id="bottom"
                  transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                ></path>
              </svg>
            </Link>
          </div>
        </>
      );
    return <MobileMenuBTN />;
  };

  return (
    <FadeMotion className="stick_header" isShow={showHeader}>
      <header className="container static_width_header">
        <div className="site-logo">
          <Link href="#/">
            <img src="/img/logo.svg" alt="Logo" />
          </Link>
        </div>
        {renderResponsiveComponent()}
      </header>
    </FadeMotion>
  )
}

export default StickyHeader

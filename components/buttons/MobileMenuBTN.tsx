import Link from "next/link";
import React, { useContext } from "react";
import { useRecoilState } from "recoil";
import { useShowStickyHeader } from "../../helpers/hooks";
import OpenmobileMenuAtom from "../../helpers/recoil/sidebar/OpenmobileMenuAtom";

export default function MobileDropDown() {
  // const { dispatch } = useContext(MobileMenuContext.default);
  const { showHeader } = useShowStickyHeader.default();
  const [openMobileMenu,setOpenMobailMenu]=useRecoilState(OpenmobileMenuAtom)

  const toggleMenu = () => {
    setOpenMobailMenu(true)
  };

  const renderClass = () => {
    let _class = "mobile-menu-toggle";

    if (showHeader) _class += " d-xl-none";

    if (!showHeader) _class += " d-lg-none";

    return _class;
  };

  return (
    <div className="mobile-header-menu-fullwidth">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={renderClass()} onClick={toggleMenu}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

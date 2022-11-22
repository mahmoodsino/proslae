import Link from "next/link";
import React from "react";
import HeaderSearch from './HeaderSearch';
import UserArea from '../../../drop-downs/User';
import Cart from "./Cart";
import { useRecoilState } from "recoil";
import { TokenAtom } from "../../../../helpers/recoil/token";

const MiddleArea = () => {
  const [token,setToken]=useRecoilState(TokenAtom)
  return (
    <div>
      <div className="ltn__header-middle-area d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-md-3 left-middle">
              <div className="site-logo">
                <Link href="#">
                  <img src="img/logo.svg" alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <HeaderSearch />
            </div>
            <div className="col-md-3 right-middle">
              <div className="ltn__header-options">
                <ul>
                <UserArea />
									{token && (
										<li >
											<Cart />
										</li>
									)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleArea;

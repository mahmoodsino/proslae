import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import { User } from "tabler-icons-react";
import { Package, MapPin, UserCheck, Logout } from "tabler-icons-react";
import { confirmDialog, removeUser } from "../../helpers/Common";
import { TokenAtom } from "../../helpers/recoil/token";
import { UserAtom } from "../../helpers/recoil/user";
import {  handelLogout } from "../../helpers/server/services";

export default function UserDropDown() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [token, setToken] = useRecoilState(TokenAtom);
  const [userInfo,setUserInfo]=useRecoilState(UserAtom)
  

  const logout = async () => {
    confirmDialog ('Logout', 'Sure to logout?', async (callback:any) => {
			if (callback) {
                if(token!==null){
                    const res = await handelLogout(token);
                }
				removeUser();
                window.location.href="/main"
				return;
			}
		});
  };





  const renderItems = () => {
    return (
      <>
        <li>
          <Link href={`/profile/`}>
            <UserCheck size="18" className="mr-2" /> Account
          </Link>
        </li>
        <li>
          <Link href={`/profile/`}>
            <Package size="18" className="mr-2" /> My Orders
          </Link>
        </li>
        <li>
          <Link href={`/profile/`}>
            <MapPin size="18" className="mr-2" /> My Addresses
          </Link>
        </li>
        <li onClick={logout}>
          <Link href="">
            <Logout size="18" className="mr-2" /> Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <li className="d-none---">
      <div className="ltn__drop-menu user-menu">
        <ul>
          <li>
            <Link href={!token ? "/main" : ""}>
              <User />
              {!isTabletOrMobile && (
                <span className="truncate_">
                  {token ? userInfo.first_name: "Login / Register"}
                </span>
              )}
            </Link>
            {token && <ul className="ul">{renderItems()}</ul>}
          </li>
        </ul>
      </div>
    </li>
  );
}

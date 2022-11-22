import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";
import { Logout, MapPin, Package, UserCheck } from "tabler-icons-react";
import { confirmDialog, profileSections, removeUser } from "../../../helpers/Common";
import { TokenAtom } from "../../../helpers/recoil";
import { ProfileTabsAtom } from "../../../helpers/recoil/profile";
import { handelLogout } from "../../../helpers/server/services";

const tabs = [
  {
    title: "My Orders",
    value: profileSections.orders,
    icon: <Package />,
  },
  {
    title: "My Addresses",
    value: profileSections.addresses,
    icon: <MapPin />,
  },
  {
    title: "Account Details",
    value: profileSections.account,
    icon: <UserCheck />,
  },
];

const ProfileSidebar = () => {
  const [profileTab, setProfileTab] = useRecoilState(ProfileTabsAtom);
  const [token,setToken]=useRecoilState(TokenAtom)

  const handlePanel = (value: string) => {
    setProfileTab(value);
  };

  const logout = () => {
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
  return (
    <div className="ltn__tab-menu-list mb-50">
      <div className="nav">
        {React.Children.toArray(
          tabs.map((tab, index) => {
            return (
              <Link
                key={index}
                href=""
                onClick={() => handlePanel(tab.title)}
                className={profileTab === tab.title ? "active show" : ""}
              >
                {tab.title} {tab.icon}
              </Link>
            );
          })
        )}
        <Link href="" onClick={logout}>
          Logout <Logout />
        </Link>
      </div>
    </div>
  );
};

export default ProfileSidebar;

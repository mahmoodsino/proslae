import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";
import { Logout, MapPin, Package, UserCheck } from "tabler-icons-react";
import { profileSections } from "../../../helpers/Common";
import useLogout from "../../../helpers/hooks/useLogout";
import { ProfileTabsAtom } from "../../../helpers/recoil/profile";

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

  const handlePanel = (value: string) => {
    setProfileTab(value);
  };

  const logout = () => {
    useLogout().handleLogout();
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

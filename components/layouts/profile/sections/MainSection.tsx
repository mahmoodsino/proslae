import React from 'react'
import { useRecoilState } from 'recoil';
import { profileSections } from '../../../../helpers/Common';
import { ProfileTabsAtom } from '../../../../helpers/recoil/profile';
import ProfileSidebar from '../../../sidebars/profile/ProfileSidebar';
import TopAreaPages from '../../pages-top-area/TopAreaPages'; 
import AccountDetails from './AccountDetails';
import AddressPanel from './AddressPanel';
import OrdersPanel from './OrdersPanel';

const MainSection = () => {
  const [profileTab,setProfileTab] = useRecoilState(ProfileTabsAtom)



  

  const renderPanel = () => {
    if(profileTab===profileSections.account){
      return <AccountDetails/>
    }
    else if(profileTab===profileSections.orders){
      
      return <OrdersPanel />
    }else if (profileTab===profileSections.addresses){
      return <AddressPanel />
    }
  };
  return (
    <div>
    <div className="ltn__utilize-overlay"></div>
    <TopAreaPages title="My Account" isMini={true} />
    <div className="liton__wishlist-area pb-70 mt-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__product-tab-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <ProfileSidebar />
                  </div>
                  <div className="col-lg-8">
                    <div className="tab-content">
                      <div className="tab-pane fade active show">
                        <div className="ltn__myaccount-tab-content-inner">
                          {renderPanel()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MainSection

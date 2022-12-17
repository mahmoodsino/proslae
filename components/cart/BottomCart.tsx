import React from 'react'
import Cart from '../headers/static-home/middle-area/Cart';
import { formatFloatNumber } from '../../helpers/Common';
import { useRecoilState } from 'recoil';
import CartMenuAtom from '../../helpers/recoil/home/CartMenuAtom';
import { AllCartsInfoAtom } from '../../helpers/recoil';
import MobileCartMenuAtom from '../../helpers/recoil/home/MobileCartMenuAtom';

const BottomCart = () => {
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfoAtom);
    const [openMobileCartMenu, setOpenMobileCartMenu] =
  useRecoilState(MobileCartMenuAtom);

  return (
    <div className="bottom_cart" onClick={() => setOpenMobileCartMenu(true)}>
			<div style={{marginTop:"10px"}}  className="left">
				<Cart hiddenText={true}  />
			</div>
			<div  className="right">
				<h5 style={{marginTop:"15px"}}>${formatFloatNumber(allCartsInfo.total_price)}</h5>
			</div>
		</div>
  )
}

export default BottomCart

import React from 'react'
import Cart from '../headers/static-home/middle-area/Cart';
import { formatFloatNumber } from '../../helpers/Common';
import { useRecoilState } from 'recoil';
import CartMenuAtom from '../../helpers/recoil/home/CartMenuAtom';
import { AllCartsInfoAtom } from '../../helpers/recoil';

const BottomCart = () => {
  const [openCartMenu, setOpenCartMenu] = useRecoilState(CartMenuAtom);
  const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfoAtom);

  return (
    <div className="bottom_cart" onClick={() => setOpenCartMenu(true)}>
			<div className="left">
				<Cart hiddenText={true}  />
			</div>
			<div className="right">
				<h5>${formatFloatNumber(allCartsInfo.total_price)}</h5>
			</div>
		</div>
  )
}

export default BottomCart

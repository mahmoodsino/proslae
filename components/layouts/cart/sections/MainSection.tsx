import React, { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications';
import { useRecoilState } from 'recoil';
import { AllCartsInfoAtom, CartItemsAtom, TokenAtom } from '../../../../helpers/recoil';
import { getCartItems } from '../../../../helpers/server/services';
import TopAreaPages from '../../pages-top-area/TopAreaPages'
import CircleProgressBar from '../../progress-bar';
import CalculationCart from './CalculationCart';
import CartProducts from './CartProducts'

const MainSection = () => {
    const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfoAtom);
    const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);
    const { addToast } = useToasts();
    const [token, setToken] = useRecoilState(TokenAtom);
    const [loading,setLoading]=useState(false)


    useEffect(() => {
        setLoading(true)
        const getData = async () => {
          const res = await getCartItems(token);
          if (res === null) {
            addToast("Something wrong happened!", { appearance: "error" });
          } else {
            setAllCartsInfo(res.result);
            setCartItems(res.result.items);
          }
          setLoading(false)
        };
        if (token.length > 1) {
          getData();
        }
      }, [token]);
  return (
    <div>
        {!loading ?
        <div>
			<TopAreaPages title="Shopping Cart" isMini={true} />
			<div className="liton__shoping-cart-area mb-120 mt-50">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="shoping-cart-inner">
								<CartProducts />
							</div>
						</div>
						<div className="col-lg-4">
							<div className="shoping-cart-total-parent">
								<CalculationCart/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>  : 
        <div style={{display:"flex" , justifyContent:"center"}}>
            <CircleProgressBar height={100}  />

        </div>
    }
    </div>
  )
}

export default MainSection

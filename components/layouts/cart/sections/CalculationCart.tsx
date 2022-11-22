import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications';
import { useRecoilState } from 'recoil';
import { calCartSubTotal } from '../../../../helpers/Common';
import { AddressAtom, AllCartsInfoAtom, CartItemsAtom, selctedMethodAtom, ShippingAddressIdAtom, TokenAtom } from '../../../../helpers/recoil';
import { getAddress, handelCrateOrder } from '../../../../helpers/server/services';
import CheckoutBTN from '../../../buttons/CheckoutBTN'
import CartAddress from '../../../drop-downs/CartAddress';
import SelectDelivaryType from '../../../drop-downs/SelectDelivaryType';
import CircleProgressBar from '../../progress-bar';

const CalculationCart = () => {
    const [allCartsInfo, setAllCartsInfo] = useRecoilState(AllCartsInfoAtom);
    const [address,setAddress]=useRecoilState(AddressAtom)
    const [token,setToken]=useRecoilState(TokenAtom)
    const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);
	const [selectedMethod, setSelectedMethod] = useRecoilState(selctedMethodAtom);
	const [shippingAddressId, setShippingAddressId] = useRecoilState(
	  ShippingAddressIdAtom
	);
	const [loading,setLoading]=useState(false)
	const [savedOrderId, setSavedOrderId] = useState<number>();
	const {push}=useRouter()
	const { addToast } = useToasts();


	const createOrder = async () => {
		if (selectedMethod === "PICKUP") {
		  setLoading(true);
		  const res = await handelCrateOrder({
			shipping_method: selectedMethod,
			token: token,
		  });
		  if (res === null) {
			addToast("Something wrong happened!", { appearance: "error" });

			setLoading(false);
		  } else {
			setSavedOrderId(res.result.saved_order_id);
			push({
			  pathname: "/checkout",
			  query: { savedOrder: encodeURI(res.result.saved_order_id) },
			});
			setLoading(false);
		  }
		} else {
		  setLoading(true);
		  const res = await handelCrateOrder({
			shipping_method: selectedMethod,
			token: token,
			address_id: shippingAddressId,
		  });
		  if (res === null) {
			addToast("Something wrong happened!", { appearance: "error" });
			setLoading(false);
		  } else {
			setSavedOrderId(res.result.saved_order_id);
			push({
			  pathname: "/checkout",
			  query: { savedOrder: encodeURI(res.result.saved_order_id) },
			});
			setLoading(false);
		  }
		}
	  };
	
	


	const checkQuantity = () => {
		let isFound = true;
		for (const item of cartItems) {
		  //@ts-ignore
		  if (item?.in_stock < 1) {
			return (isFound = false);
		  } else if (
			item.in_stock === 1 &&
			(item.product?.tracking_type === 2 || item.product?.tracking_type === 3)
		  ) {
			if (item.available_quantity) {
			  if (item.available_quantity >= item.quantity) {
				return (isFound = true);
			  } else if (item.available_quantity < item.quantity) {
				isFound = false;
			  }
			}
		  }
		}
		return isFound;
	  };

	useEffect(() => {
        const getData = async () => {
          const res = await getAddress(token);
          if (res === null) {
          } else {
            setAddress(res.result);
          }
        };
        if (token.length > 1) {
          getData();
        }
      }, [token]); 

  return (
    <div className="shoping-cart-total">
			<h4 className="title-1">Cart Totals</h4>
			<table className="table">
				<tbody>
					<tr>
						<td>Cart Subtotal</td>
						<td>${allCartsInfo?.sub_total_price}</td>
					</tr>
					<tr>
						<td>Shipping And Handling</td>
						<td>${allCartsInfo?.delivery_fee}</td>
					</tr>
					<tr>
						<td>
							<strong>Order Total</strong>
						</td>
						<td>
							<strong>${(allCartsInfo?.total_price)}</strong>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="mt-20 mb-20">
				<SelectDelivaryType/>
				{selectedMethod!=="PICKUP" && 
				<CartAddress/>
				}
			</div>
			{!loading ?
			<CheckoutBTN handleClick={() => createOrder()} disabled={checkQuantity() ? false : true} title="Proceed to checkout"  />
			:
			<div style={{display:"flex",justifyContent:"center"}}>
				<CircleProgressBar height={60}/>
			</div>
		}
		</div>
  )
}

export default CalculationCart

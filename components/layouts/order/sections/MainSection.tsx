import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useToasts } from 'react-toast-notifications';
import { useRecoilState } from 'recoil';
import { TokenAtom } from '../../../../helpers/recoil';
import OrderDetailsAtom from '../../../../helpers/recoil/order/OrderDetailsAtom';
import { getOrderById } from '../../../../helpers/server/services';
import ProductsOrder from '../../../tables/ProductsOrder';

const red = '#FF2138';
const blue = '#1E40AF';
const green = '#059669';
const gray = 'rgb(129, 129, 129)';
const orange = '#FF7418';

const MainSection = () => {
    const [token, setToken] = useRecoilState(TokenAtom);
    const [orderDetails, setOrderDetails] = useRecoilState(OrderDetailsAtom);
    const { query } = useRouter();
    const { addToast } = useToasts();
  
    useEffect(() => {
      const getData = async () => {
        if (query.savedOrder) {
          const res = await getOrderById(token, +query.savedOrder);
          console.log(res);
          if (res === null) {
            addToast("Something wrong happened!", { appearance: "error" });
          } else {
            setOrderDetails(res.result);
          }
        }
      };
      getData();
    }, [query.savedOrder]);

    const setColor = () => {
		if (orderDetails.status === "UN_PAID") return red;
		if (orderDetails.status === "cancelled") return gray;
		if (orderDetails.status === "pending") return blue;
		if (orderDetails.status === "processing") return orange;
		return green;
	};


  return (
    <div>
			<div className="body_">
				<div className="content">
					<h5>Order Number</h5>
					<h5>{orderDetails?.number}</h5>
				</div>
				<div className="content">
					<h5>Status</h5>
					<h5
						style={{
							color: setColor(),
						}}
					>
						{orderDetails?.status}
					</h5>
				</div>
				<div className="content">
					<h5>Date</h5>
					<h5>{new Date(orderDetails?.created_at).toLocaleDateString()}</h5>
				</div>

				<div className="content">
					<h5>Delivery Fees</h5>
					<h5>${orderDetails?.delivery_fee}</h5>
				</div>
				<div className="content">
					<h5>SubTotal</h5>
					<h5>${orderDetails.total}</h5>
				</div>
			</div>
			<ProductsOrder />
		</div>
  )
}

export default MainSection

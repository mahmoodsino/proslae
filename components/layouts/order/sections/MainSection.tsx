import { useRouter } from 'next/router';
import React, { useEffect,useState } from 'react'
import { useToasts } from 'react-toast-notifications';
import { useRecoilState } from 'recoil';
import { TokenAtom } from '../../../../helpers/recoil';
import OrderDetailsAtom from '../../../../helpers/recoil/order/OrderDetailsAtom';
import { getOrderById, getPaymentProvidor } from '../../../../helpers/server/services';
import PaymentProviderType from '../../../../helpers/types/PaymentProviderType';
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
	const [paymentProvidorState, setPaymentProvidorState] = useState<
    PaymentProviderType[]
  >([]);
  const [paymentProvidorId, setPaymenProvidorId] = useState<number>();

  const router = useRouter().query;
  
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

	useEffect(() => {
		const getData = async () => {
		  const res = await getPaymentProvidor();
		  if (res === null) {
            addToast("Something wrong happened!", { appearance: "error" });
		  } else {
			setPaymentProvidorState(res.result.payment_providers);
		  }
		};
		getData();
	  }, []);

	  useEffect(() => {
		paymentProvidorState?.map((providor) => {
		  if (providor.name === "stripe") {
			setPaymenProvidorId(providor.id);
		  }
		});
	  }, [paymentProvidorState]);
	  const { push } = useRouter();


	  const handelpayForOrder = async () => {
		if (paymentProvidorId) {
		  push({
			pathname: "/checkout",
			query: { savedOrder: encodeURI(orderDetails.id.toString()) },
		  });
		}
	  };
	
	  const handelComletetheOrder = async () => {
		if (orderDetails.payment_transaction?.id) {
		  push({
			pathname: "/checkout",
			query: {
			  savedOrder: encodeURI(orderDetails.id.toString()),
			  paymentTransaction: encodeURI(
				orderDetails.payment_transaction.id?.toString()
			  ),
			},
		  });
		}
	  };

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
			<div>
			{orderDetails.status !== "PAID" &&
                  (orderDetails.payment_transaction === null ? (
                    <div className="flex justify-between mx-5 mt-3">
                      <span className="font-semibold uppercase text-gray-1500 items-center">
                        pay for your order
                      </span>
                      <button
                        onClick={() => handelpayForOrder()}
                        className="theme-btn-1 btn btn-effect-1 animated_green text-uppercase puttom__disable "
                      >Pay</button>
                    </div>
                  ) : orderDetails.payment_transaction?.can_completed ===
                    false ? (
                    <span className="px-5 font-bold text-lg">
                      payment {orderDetails.payment_transaction?.status}
                    </span>
                  ) : orderDetails.payment_transaction?.can_completed ? (
                    <div className="flex justify-between mx-5 mt-3">
                      <span className="font-semibold uppercase text-gray-1500 items-center">
                        complete pay for your order
                      </span>
                      <button
                        onClick={() => handelComletetheOrder()}
                        className="theme-btn-1 btn btn-effect-1 animated_green text-uppercase puttom__disable"
                      >complete</button>
                    </div>
                  ) : null)}
			</div>
		</div>
  )
}

export default MainSection

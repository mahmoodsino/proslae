import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import { TokenAtom } from "../../../../helpers/recoil";
import OrderDetailsAtom from "../../../../helpers/recoil/order/OrderDetailsAtom";
import { getOrderById } from "../../../../helpers/server/services";
import FormSection from "./FormSection";
import OrderReview from "./OrderReview";

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
  return (
    <div className="checkout_Container">
      <div style={{display:"flex",justifyContent:"center"}} >
        <span style={{fontWeight:"600",display:"block"}} >Checkout</span>
        <div className="checkout_border"></div>
      </div>
      <div className="checkout_section">
        <div  className="form_Section "><FormSection /></div>
        <div className="checkout_med_section ">
          <OrderReview />
          <div style={{marginLeft:"3.5rem",marginRight:"3.5rem"}} >
            <div className="checkout_details__">
              <div className="checkout_details_info">
                <span>Subtotal</span>
                <span>${orderDetails.sub_total}</span>
              </div>
              <div className="checkout_details_info">
                <span>Shipping fee</span>
                <span>${orderDetails.delivery_fee}</span>
              </div>
              <div className="checkout_details_info">
                <span>Tax</span>
                <span>%{orderDetails.tax}</span>
              </div>
            </div>
            <div className="checkout_Payment">
              <span>TOTAL</span>
              <span style={{fontWeight:"bold"}} className="font-bold">${orderDetails.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;

import React from "react";
import { useRecoilState } from "recoil";
import OrderDetailsAtom from "../../../../helpers/recoil/order/OrderDetailsAtom";

const OrderReview = () => {
  const [orderDetails, setOrderDetails] = useRecoilState(OrderDetailsAtom);

  return (
    <div className="orderReview_Container">
      <h1 className="order_review_title">Order Review</h1>
      <div className={`order_review_main`}>
        <div>
          {orderDetails.items?.map((item, i) => {
            return (
              <div key={i} className="order_review_main_card">
                <div className="">
                  <div className="order_review_card ">
                    <span className="order_review_text">x{item?.quantity}</span>
                    <div className="order_review_img_container border ">
                      {item.product?.image?.id ? (
                        <img
                          style={{
                            width: "5rem",
                            height: "5rem",
                            objectFit: "contain",
                          }}
                          src={item.product?.image?.path}
                          alt=""
                        />
                      ) : (
                        <img src="alternative.png" alt="" />
                      )}
                    </div>
                    <div className="order_review_title">
                      <span style={{ fontWeight: "600", display: "block" }}>
                        {item?.variation?.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="order_review_Price">$ {item?.price}</h1>
                </div>
              </div>
            );
          })}
        </div>{" "}
      </div>
    </div>
  );
};

export default OrderReview;

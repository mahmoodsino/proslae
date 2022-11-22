import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import {
  calSubTotal,
  failed,
  canceled,
  processing,
  pending,
  delivered,
} from "../../helpers/Common";
import { TrackOrderAtom } from "../../helpers/recoil";

function returnStatus(orderNumber: any) {
  let orderStatus = "";
  if (orderNumber === 0) orderStatus = pending;
  if (orderNumber === 1) orderStatus = processing;
  if (orderNumber === 2) orderStatus = delivered;
  if (orderNumber === 3) orderStatus = canceled;
  if (orderNumber === 4) orderStatus = failed;
  return orderStatus;
}

function Header() {
  return (
    <thead>
      <tr>
        <th>Order</th>
        <th>Date</th>
        <th>Status</th>
        <th>Total</th>
        <th>Details</th>
      </tr>
    </thead>
  );
}

function Row() {
  const [ordersState, setOrdersState] = useRecoilState(TrackOrderAtom)
  const {push} =useRouter()

  const handleOrder = (id:number) => {
    push({
      pathname: "/order",
      query: { savedOrder: encodeURI(id.toString()) },
    });
  };

  return (
    <>
    {ordersState?.map((item,i) => {
      return (
        <tr key={i}>
          <td>{item.id}</td>
          <td>{item.created_at}</td>
          <td>{item.status}</td>
          <td>{item.items?.length}</td>
          <td>
            <button className="btn_" onClick={() => handleOrder(item.id)}>
              View
            </button>
          </td>
        </tr>

      )
    })}
    </>
  );
}

const OrdersTable = () => {
  return (
    <table className="table">
      <Header />
      <tbody>
        <Row />
      </tbody>
    </table>
  );
};

export default OrdersTable;

import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import { TrackOrderAtom } from "../../../../helpers/recoil";
import { TokenAtom } from "../../../../helpers/recoil/token";
import { getOrders } from "../../../../helpers/server/services";
import OrdersTable from "../../../tables/OrdersTable";
import CircleProgressBar from "../../progress-bar";

const OrdersPanel = () => {
  const [ordersState, setOrdersState] = useRecoilState(TrackOrderAtom)
  const [loading,setLoading]=useState(false)
  const [token,setToken]=useRecoilState(TokenAtom)
  const { addToast } = useToasts();

  

  useEffect(() => {
    const getData= async ()=>{
      setLoading(true)
      const res = await getOrders(token)
      if(res===null){
        addToast("some thing wrong happend,", { appearance: "error" });
      }else{
        setOrdersState(res.result)
      }
      setLoading(false)
    }
    getData()
  },[])

  return (
    <div className="table-responsive">
      {!loading ? 
      <OrdersTable />
    :
    <div style={{display:"flex",justifyContent:"center"}}>
      <CircleProgressBar height={60} />
    </div>  
    }
    </div>
  );
};

export default OrdersPanel;

import React, { useEffect, useState } from "react";
import { HeaderBaseComponent } from "../../../headers";
import MobileMenuBTN from "../../../../components/buttons/MobileMenuBTN";
import CartMenu from "../../../cart/CartMenu";
import { getAbouUsInfo } from "../../../../helpers/server/services";
import CircleProgressBar from "../../progress-bar";

const MainSection = () => {
    const [loading,setLoading]=useState(false)
    const [aboutus, setAboutus] = useState("");

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
          const res = await getAbouUsInfo();
          if(res===null){
    
          }else{
            setAboutus(res.data);
          }
          setLoading(false)
        };
        getData();
      }, []);
  return (
    <div>
      <HeaderBaseComponent />
      <MobileMenuBTN />
      <CartMenu />
      {loading ? (
				<div className="loader">
					<CircleProgressBar  height={60} />
				</div>
			) : (
				<div className="mt-50 mb-50 container px-100">
					{aboutus
						? aboutus
						: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
										incididunt ut labore`}
				</div>
			)}

    </div>
  );
};

export default MainSection;

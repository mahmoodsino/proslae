import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AddressAtom, TokenAtom } from "../../../../helpers/recoil";
import { getAddress } from "../../../../helpers/server/services";
import AddressCard from "../../../cards/AddressCard";
import AddressesDialog from "../../../dialogs/AddressesDialog";
import CircleProgressBar from "../../progress-bar";

const AddressPanel = () => {
  const [openDialog, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token,setToken]=useRecoilState(TokenAtom)
  const [address,setAddress]=useRecoilState(AddressAtom)



  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const res = await getAddress(token);
      if (res === null) {
      } else {
        setAddress(res.result);
      }
      setLoading(false)
    };
    if (token.length > 1) {
      getData();
    }
  }, [token]);

  const handleAddressDialog = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      {openDialog && (
        <AddressesDialog
          open={openDialog}
          setOpen={setOpen}
        />
      )}
      {loading ? (
        <div style={{display:"flex", justifyContent:"center"}}>
        <CircleProgressBar height={60} />
      </div>
      ) : (
        <>
          <div className="text-right">
            <button className="btn1 btn-regular" onClick={handleAddressDialog}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-circle-fill add_icon"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
              <span>New Address</span>
            </button>
          </div>
          <div className="row">
            <AddressCard />
          </div>
        </>
      )}
    </div>
  );
};

export default AddressPanel;

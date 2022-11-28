import Link from "next/link";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import { confirmDialog } from "../../helpers/Common";
import { AddressAtom, TokenAtom } from "../../helpers/recoil";
import { deleteAddress, getAddress } from "../../helpers/server/services";
import { AddressType } from "../../helpers/types";
import AddressesDialog from "../dialogs/AddressesDialog";
import CircleProgressBar from "../layouts/progress-bar";

const AddressCard = () => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useRecoilState(AddressAtom);
  const [editAddres, setEditAddres] = useState<AddressType>({} as AddressType);
  const [token, setToken] = useRecoilState(TokenAtom);
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  const handleEditAddress = (address: AddressType) => {
    setOpen(true);

    setEditAddres(address);
  };

  const removeAddress = (id: number) => {
    confirmDialog(
      "Remove Address",
      `Sure to remove {name} address?`,
      async (callback: any) => {
        if (callback) {
          setLoading(true);
          const res = await deleteAddress(token, id);
          if (res === null) {
            addToast("Something wrong happened!", { appearance: "error" });
          } else {
            addToast("adderss deleted", { appearance: "success" });
          }

          const ress = await getAddress(token);
          if (ress === null) {
          } else {
            setAddress(ress.result);
          }
          setLoading(false);
        }
      }
    );
  };

  return (
    <>
      {open && (
        <AddressesDialog
          open={open}
          setOpen={setOpen}
          addresses={editAddres}
          address={address}
        />
      )}
      {!loading ? (
        address.map((item, i) => {
          return (
            <div key={i} className="col-md-6 col-12 learts-mb-30">
              <div className="address-card">
                <h4 className="address_header">
                  <strong>{item.name}</strong>
                  <small className="ml-4">
                    <Link href="#" onClick={() => handleEditAddress(item)}>
                      <i className="fas fa-edit"></i>
                    </Link>
                  </small>
                  <small
                    className="icon_remove"
                    onClick={() => removeAddress(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      fill="currentColor"
                      className="bi bi-x-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                  </small>
                </h4>
                <address>
                  <p>data</p>
                  <p>
                    {item.address}, {item.city_name}
                  </p>
                  <p>Post Code: {item.post_code}</p>
                </address>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircleProgressBar height={60} />
        </div>
      )}
    </>
  );
};

export default AddressCard;

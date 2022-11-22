import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { atom, useRecoilState } from "recoil";
import { selctedMethodAtom, ShippingAddressIdAtom } from "../../helpers/recoil";
import BaseGreenBTN from "../buttons/BaseGreenBTN";
import { DropdownMotion } from "../motions";

const delivaryMethods: string[] = ["PICKUP", "DELIVERY"];

interface Props {
  setDialog: any;
  setDropdown: any;
}

function Dropdown({ setDialog, setDropdown }: Props) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const [selectedMethod, setSelectedMethod] = useRecoilState(selctedMethodAtom);

  const handleDialog = () => {
    setDialog((prevState: any) => !prevState);
  };
  const handleItem = (method: any) => {
    setDropdown(false);
    setSelectedMethod(method);
  };

  return (
    <>
      {delivaryMethods.map((method, index) => {
        return (
          <label key={index} onClick={() => handleItem(method)}>
            {method}
          </label>
        );
      })}
    </>
  );
}

const SelectDelivaryType = () => {
  const [selectedMethod, setSelectedMethod] = useRecoilState(selctedMethodAtom);
  const [shippingAddressId, setShippingAddressId] = useRecoilState(
    ShippingAddressIdAtom
  );
  const [dropdown, setDropdown] = useState(false);
  const [newAddressDialog, setDialog] = useState(false);

  useEffect(() => {
    if (selectedMethod === "PICKUP") {
      setShippingAddressId(-1);
    }
  }, [selectedMethod]);
  const handleClickAddresses = () => {
    setDropdown((prevState) => !prevState);
  };

  return (
    <>
      <div className="dropdown">
        <div className="btn_container">
          <h4 className="title-1">Delivary Method</h4>
          <BaseGreenBTN
            className="w-full"
            title={selectedMethod}
            handleClick={handleClickAddresses}
          />
        </div>

        <DropdownMotion
          className="dropdown-content side_bar"
          hasOverlay={false}
          lockScroll={true}
          isShow={dropdown}
        >
          <Dropdown setDropdown={setDropdown} setDialog={setDialog} />
        </DropdownMotion>
      </div>
    </>
  );
};

export default SelectDelivaryType;

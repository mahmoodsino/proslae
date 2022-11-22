import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import { AddressAtom, ShippingAddressIdAtom, TokenAtom } from '../../helpers/recoil';
import AddressesDialog from '../dialogs/AddressesDialog';
import BaseGreenBTN from "../buttons/BaseGreenBTN"
import { DropdownMotion } from '../motions';
import { useMediaQuery } from 'react-responsive';
import { getAddress } from '../../helpers/server/services';
import { AddressType } from '../../helpers/types';


interface Props {
    setDialog:any
    setselectedAddress:any
    setDropdown:any
}



function Dropdown({  setDialog,setselectedAddress,setDropdown }:Props) {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });
    const [address,setAddress]=useRecoilState(AddressAtom)
    const [shippingAddressId, setShippingAddressId] = useRecoilState(
      ShippingAddressIdAtom
    );
 
    const handleDialog = () => {
      setDialog((prevState:any) => !prevState);
    };
    const handleItem = (address:any) => {
        setselectedAddress(address)
        setShippingAddressId(address.id)
    }
  
    return (
      <>
        {address.map((address, index) => {
          return (
            <label key={index} onClick={() => handleItem(address)}>
              {address?.name} - {address.city_name}, {address.country_name}
            </label>
          );
        })}
  
        <div className={isTabletOrMobile ? "w-10 mt-20" : ""}>
          <BaseGreenBTN
            title="Add New Address"
            handleClick={handleDialog}
            className="w-full"
          />
        </div>
      </>
    );
  }

const CartAddress = () => {
    const ref = useRef();
    const [dropdown, setDropdown] = useState(false);
    const [newAddressDialog, setDialog] = useState(false);
    const [address,setAddress]=useRecoilState(AddressAtom)
    const [selectedAddress,setSelectedAddress]=useState<AddressType>({}as AddressType) 


    useEffect(() => {
        if(address){
            setSelectedAddress(address[0])
        }
    },[address])


    const handleClickAddresses = () => {
        setDropdown((prevState) => !prevState);
      };


      const handleItem = () => {
        handleClickAddresses();
      };
  return (
    <>
    {newAddressDialog && (
      <AddressesDialog
        open={newAddressDialog}
        setOpen={setDialog}
      />
    )}
    <div className="dropdown" >
      <div className="btn_container">
        <h4 className="title-1">Select Address</h4>
        <BaseGreenBTN
          className="w-full"
          title={
            selectedAddress?.name
          }
          handleClick={handleClickAddresses}
        />
      </div>
      
      <DropdownMotion
        className="dropdown-content side_bar"
        hasOverlay={false}
        lockScroll={true}
        isShow={dropdown}
      >
        <Dropdown
        setDropdown={setDropdown}
        setselectedAddress={setSelectedAddress}
          setDialog={setDialog}
        />
      </DropdownMotion>
    </div>
  </>
  )
}

export default CartAddress

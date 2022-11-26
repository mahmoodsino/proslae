import React, { useEffect, useState } from "react";
import { FormEvent } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import { TokenAtom } from "../../../../helpers/recoil";
import { UserAtom } from "../../../../helpers/recoil/user";
import { handelUpdateUserInfo } from "../../../../helpers/server/services";
import CheckoutBTN from "../../../buttons/CheckoutBTN";
import SimpleFileInput from "../../../inputs/SimpleFileInput";
import SimpleInput from "../../../inputs/SimpleInput";
import CircleProgressBar from "../../progress-bar";

const CUSTOMER = "customer";
const ORGANIZATION = "organization";

const AccountDetails = () => {
  const [userInfo, setUserInfo] = useRecoilState(UserAtom);
  const [token,setToken] = useRecoilState(TokenAtom)
  const { addToast } = useToasts();
  const [loading,setLoading]=useState(false)
  const [userData, setUserData] = useState({
    first_name: "",
    last_name:"",
    email: "",
    phone: "",
    description: "",
    license_file: "",
    updated_license_file: "",
    license_file_base64: "",
    is_organization: 0,
  });

  useEffect(() => {
    setUserData((prevState) => ({
        ...prevState,
        first_name:userInfo.first_name,
        last_name:userInfo.last_name,
        email:userInfo.email,
        phone:userInfo.full_phone_number
    }));
  },[userInfo])

  const validateInputs = () => {
    if (
      userData.is_organization === 1 &&
      (!userData.first_name || userData.last_name || !userData.phone || !userData.description)
    )
      return false;
    if (
      userData.is_organization === 0 &&
      (!userData.first_name || userData.last_name || !userData.phone)
    )
      return false;
    return true;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "updated_license_file") {
      let reader = new FileReader();
      reader.onload = (ev: any) => {
        setUserData((prevState: any) => ({
          ...prevState,
          license_file_base64: ev.target.result,
          updated_license_file: e.target.files[0],
        }));
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      return;
    }
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRemoveSelectedLicense = () => {
    setUserData((prevState) => ({
      ...prevState,
      updated_license_file: "",
      license_file_base64: "",
    }));
  };

  function getBaseInputs() {
    return (
      <>
        <div className="col-md-6">
          <SimpleInput
            type="text"
            hint="first Name"
            name="first_name"
            value={userData.first_name}
            handleChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <SimpleInput
            type="email"
            hint="Email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
            disabled={true}
          />
        </div>
        <div className="col-md-6">
          <SimpleInput
            type="text"
            hint="last Name"
            name="last_name"
            value={userData.last_name}
            handleChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <SimpleInput
            type="text"
            hint="phone"
            name="phone"
            value={userData.phone}
            handleChange={handleChange}
          />
        </div>
      </>
    );
  }

  function renderInputs() {
    if (userData.is_organization === 0) return getBaseInputs();
    return (
      <>
        {getBaseInputs()}
        <div className="col-md-6">
          <label>Description</label>
          <textarea
            name="description"
            value={userData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-md-6 cancel_img">
          <label>Licence</label> <br />
          {userData.license_file_base64 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-circle-fill icon_remove"
              viewBox="0 0 16 16"
              onClick={handleRemoveSelectedLicense}
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          )}
          <img
            src={
              userData.license_file_base64
                ? userData.license_file_base64
                : `${userData.license_file}`
            }
            alt="#"
            className="border border-blue"
            width="350px"
            height="350px"
          />
          <div className="mt-10">
            <SimpleFileInput
              title="Update license"
              handleChange={handleChange}
              name="updated_license_file"
            />
          </div>
        </div>
      </>
    );
  }

  // const handleSaveChange = async () => {
  //   if (!validateInputs()) {
  //     addToast("Please fill all information!", { appearance: "warning" });
  //     return;
  //   }
  //   // let data = {
  //   //   name: userData.full_name,
  //   //   phone: userData.phone,
  //   //   type: userData.is_organization === 1 ? ORGANIZATION : CUSTOMER,
  //   // };
  // };

  const handelSubmit  = async (e:FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setLoading(true)
    const res = await handelUpdateUserInfo({token:token,email:userData.email ,firstName:userData.first_name,lastName:userData.last_name})
    if(res === null){
            addToast("some thing wrong happend", { appearance: "error" });
            setLoading(false)
    }else{
      addToast("data updated successfully", { appearance: "success" });
      setLoading(false)
    }

  }

  return (
    <div>
      <div className="ltn__form-box">
        <form onSubmit={handelSubmit}>
          <div className="row mb-50">{renderInputs()}</div>
          <div className="btn-wrapper">
            {!loading ? 
            <CheckoutBTN type="submit" title="Save Changes"/> : 
            <div style={{display:"flex" , justifyContent:"center"}}>
              <CircleProgressBar height={60} /> 
            </div>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;

import { useRouter } from "next/router";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import {
  setToken,
  setUser,
  STORE,
  INDIVIDUAL,
  LOGIN_COMPONENT,
  REGISTER_STEP2_COMPONENT,
  REGISTER_STEP1_COMPONENT,
} from "../../../../helpers/Common";
import LogRegisterAtom from "../../../../helpers/recoil/log-register/LogRegisterAtom";
import UserTypeAtom from "../../../../helpers/recoil/log-register/UserTypeAtom";
import { handelRegister, handelRegisterAsStore } from "../../../../helpers/server/services";
import SimpleBTN from "../../../buttons/SimpleBTN";
import SimpleInput from "../../../inputs/SimpleInput";
import CircleProgressBar from "../../progress-bar";
import { storeMassegeAtom } from "./LoginForm";
import RegisterStep2 from "./RegisterStep2";

const RegisterForm = () => {
  const [userType, setUserType] = useRecoilState(UserTypeAtom);
  const { addToast } = useToasts();

  const [userData, setUserData] = useState<any>({
    user_type: userType,
    first_name: "",
    last_name: "",
    postalCode: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    description: "",
    attachment: "",
    passwords_not_match: false,
  });
  const [logORregister, setLogORregister] = useRecoilState(LogRegisterAtom);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [storeMassege,setStoreMasseg]=useRecoilState(storeMassegeAtom)

  function validateCustomer() {
    if (
      !userData.email &&
      !userData.password &&
      !userData.confirm_password &&
      !userData.first_name &&
      !userData.last_name
    ) {
      setUserData((prevState: any) => ({
        ...prevState,
        email: null,
        password: null,
        confirm_password: null,
        first_name: null,
        last_name: null,
      }));
      return false;
    }
    if (!userData.first_name) {
      setUserData((prevState: any) => ({
        ...prevState,
        first_name: null,
      }));
      return false;
    }
    if (!userData.last_name) {
      setUserData((prevState: any) => ({
        ...prevState,
        last_name: null,
      }));
      return false;
    }
    if (!userData.email) {
      setUserData((prevState: any) => ({
        ...prevState,
        email: null,
      }));
      return false;
    }
    if (!userData.password) {
      setUserData((prevState: any) => ({
        ...prevState,
        password: null,
      }));
      return false;
    }
    if (!userData.confirm_password) {
      setUserData((prevState: any) => ({
        ...prevState,
        confirm_password: null,
      }));
      return false;
    }
    return true;
  }

  function validateOrganization() {
    if (
      !userData.email &&
      !userData.password &&
      !userData.confirm_password &&
      !userData.first_name &&
      !userData.last_name &&
      !userData.description &&
      !userData.attachment
    ) {
      setUserData({
        email: null,
        password: null,
        confirm_password: null,
        first_name: null,
        last_name: null,
        description: null,
        attachment: null,
      });
      return false;
    }
    if (!userData.first_name) {
      setUserData((prevState: any) => ({
        ...prevState,
        first_name: null,
      }));
      return false;
    }
    if (!userData.last_name) {
      setUserData((prevState: any) => ({
        ...prevState,
        last_name: null,
      }));
      return false;
    }
    if (!userData.email) {
      setUserData((prevState: any) => ({
        ...prevState,
        email: null,
      }));
      return false;
    }
    if (!userData.password) {
      setUserData((prevState: any) => ({
        ...prevState,
        password: null,
      }));
      return false;
    }
    if (!userData.confirm_password) {
      setUserData((prevState: any) => ({
        ...prevState,
        confirm_password: null,
      }));
      return false;
    }
    if (!userData.attachment) {
      setUserData((prevState: any) => ({
        ...prevState,
        attachment: null,
      }));
      return false;
    }
    if (!userData.description) {
      setUserData((prevState: any) => ({
        ...prevState,
        description: null,
      }));
      return false;
    }
    return true;
  }

  function validateInputs() {
    if (userData.user_type === INDIVIDUAL) return validateCustomer();
    if (userData.user_type === STORE) return validateOrganization();
  }

  const renderErrorMessage = (field: any) => {
    return (
      <div className="error_">
        <img
          src="/img/error.svg"
          alt=""
          width="18px"
          height="18px"
          className="mr-1"
        />
        <span>{field} is required</span>
      </div>
    );
  };

  const renderPasswordsNotMatch = () => {
    return (
      <div className="error_">
        <img
          src="/img/error.svg"
          alt=""
          width="18px"
          height="18px"
          className="mr-1"
        />
        <span>Passwords do not match</span>
      </div>
    );
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "attachment") {
      setUserData((prevState: any) => ({
        ...prevState,
        [name]: e.target.files[0],
      }));
      return;
    }
    setUserData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBack = () => {
    setLogORregister(2);
  };

  const handleNext = () => {
    setLogORregister(4);
  };

  const baseInputs = (
    <>
      {userData.first_name === null && renderErrorMessage("first Name")}
      <SimpleInput
        name="first_name"
        hint="first Name*"
        value={userData.first_name}
        handleChange={handleChange}
      />
      {userData.last_name === null && renderErrorMessage("last Name")}
      <SimpleInput
        name="last_name"
        hint="last Name*"
        value={userData.last_name}
        handleChange={handleChange}
      />
      {userData.email === null && renderErrorMessage("Email")}
      <SimpleInput
        name="email"
        hint="Email*"
        type="email"
        value={userData.email}
        handleChange={handleChange}
      />
      <div className="postal-code">
        <div className="postal">
          <SimpleInput
            name="postalCode"
            hint="+123"
            value={userData.postalCode}
            handleChange={handleChange}
          />
        </div>
        <div className="phone">
          <SimpleInput
            name="phone"
            hint="Phone"
            value={userData.phone}
            handleChange={handleChange}
          />
        </div>
      </div>
      {userData.password === null && renderErrorMessage("Password")}
      <SimpleInput
        name="password"
        hint="Password*"
        type="password"
        className="sss"
        value={userData.password}
        handleChange={handleChange}
      />
      {userData.confirm_password === null &&
        renderErrorMessage("Confirm Password")}
      <SimpleInput
        name="confirm_password"
        hint="Confirm Password*"
        type="password"
        value={userData.confirm_password}
        handleChange={handleChange}
      />
      {userData.passwords_not_match && renderPasswordsNotMatch()}
    </>
  );

  const renderInputs = () => {
    if (
      userData.user_type === STORE &&
      logORregister === REGISTER_STEP2_COMPONENT
    )
      return (
        <RegisterStep2
          handleChange={handleChange}
          userData={userData}
          renderErrorMessage={renderErrorMessage}
        />
      );
    else return baseInputs;
  };

  const checkPasswordsMatch = () => {
    if (
      userData.password.toLowerCase() !==
      userData.confirm_password.toLowerCase()
    ) {
      setUserData((prevState: any) => ({
        ...prevState,
        passwords_not_match: true,
      }));
      return false;
    }
    return true;
  };

  const registerUser = async () => {
    if (!validateInputs()) return;
    if (!checkPasswordsMatch()) return;
    setLoading(true);

    if(userData.user_type === INDIVIDUAL){
      const res = await handelRegister(
        userData.first_name,
        userData.last_name,
        userData.email,
        userData.password,
        userData.postalCode,
        userData.phone
      );
      if (res === 400) {
        addToast("Username or password is not valid!", { appearance: "error" });
        setLoading(false);
  
        return;
      }
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
        setLoading(false);
  
        return;
      }
      if (res) {
        localStorage.setItem("token", res.result.token);
        localStorage.setItem("id", res.result.user.id);
        localStorage.setItem("email", res.result.user.email);
        localStorage.setItem("first_name", res.result.user.first_name);
        localStorage.setItem("last_name", res.result.user.last_name);
        localStorage.setItem("type", "user");
        setLoading(false);
  
        window.location.href ="./";
      }
    }else{
      const res = await handelRegisterAsStore( userData.first_name,
        userData.last_name,
        userData.email,
        userData.password,
        userData.postalCode,
        userData.phone,
        userData.description,
        userData.attachment)
        console.log(res);
        
        if (res === 400) {
          addToast("Username or password is not valid!", { appearance: "error" });
          setLoading(false);
    
          return;
        }
        if (res === null) {
          addToast("Something wrong happened!", { appearance: "error" });
          setLoading(false);
    
          return;
        }
        if (res) {
          if(res.result.token){
            localStorage.setItem("token", res.result.token);
            localStorage.setItem("id", res.result.user.id);
            localStorage.setItem("email", res.result.user.email);
            localStorage.setItem("first_name", res.result.user.first_name);
            localStorage.setItem("last_name", res.result.user.last_name);
            localStorage.setItem("type", "user");
            window.location.href ="./";
          }else{
            setStoreMasseg(true)
            setLogORregister(2);
          }

          setLoading(false);

          
    
        }
    }
  };

  const renderButtons = () => {
    if (
      userData.user_type === INDIVIDUAL ||
      (userData.user_type === STORE &&
        logORregister === REGISTER_STEP2_COMPONENT)
    )
      return (
        <div className="flex_register">
          <SimpleBTN
            title="Back"
            btnStyle="btn-light"
            className="mr-3"
            handleClick={handleBack}
          />
          <SimpleBTN title="Create Account" handleClick={registerUser} />
        </div>
      );
    if (
      userData.user_type === STORE &&
      logORregister === REGISTER_STEP1_COMPONENT
    ) {
      return (
        <>
          <SimpleBTN
            title="Back"
            btnStyle="btn-light"
            className="mr-3"
            handleClick={handleBack}
          />
          <SimpleBTN
            title="Next"
            btnStyle="btn-light"
            handleClick={handleNext}
          />
        </>
      );
    }
  };

  return (
    <div>
      <form>
        {renderInputs()}
        {loading ? (
         <div style={{display:"flex", justifyContent:"center"}}>
         <CircleProgressBar height={60} />
       </div>
        ) : (
          <div className="text-right">
            <div>{renderButtons()}</div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;

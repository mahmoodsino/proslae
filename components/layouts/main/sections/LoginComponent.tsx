import React from "react";
import { useRecoilState } from "recoil";
import LogRegisterAtom from "../../../../helpers/recoil/log-register/LogRegisterAtom";
import UserTypeAtom from "../../../../helpers/recoil/log-register/UserTypeAtom";
import LoginForm from "./LoginForm";
import { STORE, INDIVIDUAL } from "../../../../helpers/Common";

const LoginComponent = () => {
  const [logORregister, setLogORregister] = useRecoilState(LogRegisterAtom);
  const [userType, setUserType] = useRecoilState(UserTypeAtom);

  const handelRegister = () => {
    if (userType === INDIVIDUAL) {
      setLogORregister(3);
    } else if (userType === STORE) {
      setLogORregister(3);
    }
  };



  
  
  

  return (
    <div className="form-box login-box">
      <img src="/img/logo.svg" alt="" className="logo" />
      <p className="welcome">
        Welcome Back, Please login <br /> to your account.
      </p>
      <LoginForm />
      <div className="or">OR</div>
      <button
        className="btn1 justify-content-center"
        onClick={() => handelRegister()}
      >
        Create New Account
      </button>
    </div>
  );
};

export default LoginComponent;

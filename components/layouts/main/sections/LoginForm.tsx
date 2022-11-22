import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { atom, useRecoilState } from "recoil";
import { STORE } from "../../../../helpers/Common";
import LogRegisterAtom from "../../../../helpers/recoil/log-register/LogRegisterAtom";
import UserTypeAtom from "../../../../helpers/recoil/log-register/UserTypeAtom";
import { handelLogin } from "../../../../helpers/server/services";
import SimpleBTN from "../../../buttons/SimpleBTN";
import SimpleInput from "../../../inputs/SimpleInput";
import CircleProgressBar from "../../progress-bar";


export const storeMassegeAtom = atom({
  key:"storeMassegeAtom",
  default:false
})

const LoginForm = () => {
  const [userData, setUserData] = useState<any>({
    email: "",
    password: "",
  });

  const [logORregister, setLogORregister] = useRecoilState(LogRegisterAtom);
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const {push}=useRouter()
  const [storeMassege,setStoreMasseg]=useRecoilState(storeMassegeAtom)
  const [userType, setUserType] = useRecoilState(UserTypeAtom);

  function validateInputs() {
    if (!userData.email && !userData.password) {
      setUserData({
        email: null,
        password: null,
      });
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
    return true;
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

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setUserData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!validateInputs()) return;
    const data = {
      email: userData.email,
      password: userData.password,
    };
	setLoading(true)
    const res = await handelLogin(userData.password, userData.email);
	if (!res.ok) {
		addToast(res?.message, { appearance: "error" });
		setLoading(false);
	  }
    console.log(res);
    
    if (res?.token) {
      setLoading(false);
      localStorage.setItem("token", res.token);
      localStorage.setItem("id", res.user.id);
      localStorage.setItem("email", res.user.email);
      localStorage.setItem("type", res.user.type);
      localStorage.setItem("first_name", res.user.first_name);
      localStorage.setItem("last_name", res.user.last_name);
	  window.location.href="/"
    }else{
      setStoreMasseg(true)
      setLoading(false);

    }
  };

  const handleBack = () => {
    setLogORregister(1);
  };

  const handleForgetPassword = () => {
    setLogORregister(5);
  };

  return (
    <form>
      {userData.email === null && renderErrorMessage("Email")}
      <SimpleInput
        name="email"
        hint="Email*"
        type="email"
        value={userData.email}
        handleChange={handleChange}
      />
      {userData.password === null && renderErrorMessage("Password")}
      <span className="relative_">
        <SimpleInput
          name="password"
          hint="Password*"
          type="password"
          value={userData.password}
          handleChange={handleChange}
        />
      </span>
      <div className="row">
        <div className="col-xl-6 col-12">
          <div className="go-to-btn mt-12 pl-3">
            <Link href="#" onClick={handleForgetPassword}>
              <small>Forgotten Password?</small>
            </Link>
          </div>
        </div>
        <div className="col-xl-6 col-12">
          {loading ? (
            <div style={{display:"flex", justifyContent:"center"}}>
            <CircleProgressBar height={60} />
          </div>
          ) : (
            <div className="text-right">
              <SimpleBTN
                title="Back"
                btnStyle="btn-light"
                className="mr-3"
                handleClick={handleBack}
              />
              <SimpleBTN
                title="Login"
                handleClick={handleLogin}
                type="submit"
              />
            </div>
          )}
        </div>
        {storeMassege &&userType === STORE && 
          <span style={{whiteSpace:"nowrap", marginLeft:"15px",fontSize:"15px",fontWeight:"bold",color:"red"}}>you have create an account wait for aprove</span>
        }
      </div>
    </form>
  );
};

export default LoginForm;

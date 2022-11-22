import { useRecoilState } from "recoil";
import { GUEST, INDIVIDUAL, STORE } from "../../../../helpers/Common";
import LogRegisterAtom from "../../../../helpers/recoil/log-register/LogRegisterAtom";
import UserTypeAtom from "../../../../helpers/recoil/log-register/UserTypeAtom";
import CheckCard from "../../../cards/CheckCard";

const MainComponent = () => {
  const [logORregister, setLogORregister] = useRecoilState(LogRegisterAtom);
  const [userType, setUserType] = useRecoilState(UserTypeAtom);
  return (
    <div className="enter-box">
      <img src="/img/logo.svg" alt="" className="logo" />

      <p className="welcome">
        Welcome Back, Please login <br /> to your account.
      </p>

      <div className="btns">
        <div onClick={() => (setLogORregister(2), setUserType(INDIVIDUAL))}>
          <CheckCard title={INDIVIDUAL} />
        </div>
        <div onClick={() => (setLogORregister(2), setUserType(STORE))}>
          <CheckCard title={STORE} />
        </div>
        <div className="or">OR</div>
        <CheckCard title={GUEST} />
      </div>
    </div>
  );
};

export default MainComponent;

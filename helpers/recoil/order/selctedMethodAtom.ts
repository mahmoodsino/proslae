import { atom } from "recoil";

const selctedMethodAtom = atom({
    key: "selctedMethodAtom",
    default: "PICKUP",
  });

  export default selctedMethodAtom;
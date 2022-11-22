import { atom } from "recoil";
import variationsDetailsType from "../../types/variationsDetailsType";

const VariationsAtom = atom<variationsDetailsType>({
    key:"VariationsAtom",
    default:{} as variationsDetailsType
})

export default VariationsAtom
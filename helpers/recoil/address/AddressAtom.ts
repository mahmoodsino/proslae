import { atom } from "recoil";
import AdderssType from "../../types/AddressType";

const AddressAtom = atom<AdderssType[]>({
    key:"AddressAtom",
    default:[]
})

export default AddressAtom
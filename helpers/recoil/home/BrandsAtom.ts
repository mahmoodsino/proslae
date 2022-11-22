import { atom } from "recoil";
import { BrandsType } from "../../types";

const BrandsAtom = atom<BrandsType[]>({
    key:"BrandsAtom",
    default:[]
})
export default BrandsAtom
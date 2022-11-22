import { atom } from "recoil";
import { SliderType } from "../../types";

const SliderAtom = atom<SliderType[]>({
    key:"SliderAtom",
    default:[]
})

export default SliderAtom
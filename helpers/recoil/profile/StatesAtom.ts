import { atom } from "recoil";
import { CountriesType } from "../../types";

const StatesAtom = atom<CountriesType[]>({
    key:"StatesAtom",
    default:[]
})

export default StatesAtom
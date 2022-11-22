import { atom } from "recoil";
import { CountriesType } from "../../types";

const CountriesAtom = atom<CountriesType[]>({
    key:"CountriesAtom",
    default :[]
})

export default CountriesAtom
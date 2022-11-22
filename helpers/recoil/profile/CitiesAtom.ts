import { atom } from "recoil";
import { CountriesType } from "../../types";

const CitiesAtom = atom<CountriesType[]>({
    key:"CitiesAtom",
    default:[]
})

export default CitiesAtom
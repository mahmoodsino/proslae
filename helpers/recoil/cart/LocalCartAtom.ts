import { atom } from "recoil";
import LocalCartItemType from "../../types/LocalCartItemType";

const LocalCartAtom = atom<LocalCartItemType[]>({
    key:"LocalCartAtom",
    default:[]
})

export default LocalCartAtom
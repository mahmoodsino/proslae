import { atom } from "recoil";
import { CategoriesType } from "../../types";

const CategoriesAtom = atom<CategoriesType[]>({
    key:"CategoriesAtom",
    default:[]
})

export default CategoriesAtom;
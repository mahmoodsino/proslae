import { atom } from "recoil";
import { CategoriesType } from "../../types";

const FeaturedCategoriesAtom = atom<CategoriesType[]>({
    key:"FeaturedCategoriesAtom",
    default:[]
})

export default FeaturedCategoriesAtom
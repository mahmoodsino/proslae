import { atom } from "recoil";
import { ProductsType } from "../../types";

const FeaturedProductAtom = atom<ProductsType[]>({
    key:"FeaturedProductAtom",
    default:[]
})

export default FeaturedProductAtom
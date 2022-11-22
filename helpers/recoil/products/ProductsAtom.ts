import { atom } from "recoil";
import { ProductsType } from "../../types";

const ProductsAtom = atom<ProductsType[]>({
    key:"ProductsAtom",
    default:[]
})

export default ProductsAtom
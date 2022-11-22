import { atom } from "recoil";
import FetchedItemsType from "../../types/FetchedItemsType";

const CartItemsAtom = atom<FetchedItemsType[]>({
    key:"CartItemsAtom",
    default:[]
})

export default CartItemsAtom
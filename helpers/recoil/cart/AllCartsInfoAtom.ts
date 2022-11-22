import { atom } from "recoil";
import CartType from "../../types/CartType";

const AllCartsInfoAtom = atom<CartType>({
    key: "AllCartsInfoAtom",
    default: {
        cost_points: 0,
        customer_points: 0,
        delivery_fee: "",
        earned_points: 0,
        items: [],
        sub_total_price: 0,
        tax: "",
        total_price: 0
    }
})

export default AllCartsInfoAtom
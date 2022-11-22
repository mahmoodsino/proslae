import { atom } from "recoil";
import { OrderDetailsTyps } from "../../types";

const OrderDetailsAtom = atom<OrderDetailsTyps>({
    key:"OrderDetailsAtom",
    default:{} as OrderDetailsTyps
})
export default OrderDetailsAtom
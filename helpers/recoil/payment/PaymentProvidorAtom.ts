import { atom } from "recoil";
import PaymentProviderType from "../../types/PaymentProviderType";

const PaymentProvidorAtom = atom<PaymentProviderType[]>({
    key:"PaymentProvidorAtom",
    default:[]
})

export default PaymentProvidorAtom
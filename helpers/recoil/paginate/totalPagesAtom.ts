import { atom } from "recoil";

const totalPagesAtom= atom<number>({
    key:"totalPagesAtom",
    default:0
})

export default totalPagesAtom
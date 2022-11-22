import { atom } from "recoil";

const RemveFromCartAtom = atom<(item:any) => any>({
    key:"RemveFromCartAtom",
    default:(item:any) => console.log("default function")
})

export default RemveFromCartAtom
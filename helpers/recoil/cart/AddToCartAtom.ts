import { atom } from "recoil";

const AddToCartAtom = atom<(item:any) => any>({
    key:"AddToCartAtom",
    default: (item:any) => console.log("default function")
})

export default AddToCartAtom
import { atom } from "recoil";
import { UserType } from "../../types";

const UserAtom = atom<UserType>({
    key:"UserAtom",
    default:{}as UserType
})

export default UserAtom
import { atom } from "recoil";
import TrackOrderType from "../../types/TrackOrderType";

const TrackOrderAtom  = atom<TrackOrderType[]>({
    key:"TrackOrderAtom",
    default:[]
})
export default TrackOrderAtom
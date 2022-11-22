import { atom } from "recoil";
import DetailsType from "../../types/DetailsType";

const DetailsAtom = atom<DetailsType>({
    key:"DetailsAtom",
    default:{
        product: {
            avg_rate:0,
            brand: {
                id: -1,
                name: "",
                side_img:"",
                cover:"",
                img:""
            },
            brand_id: -1,
            company: {
                id: -1,
                logo: "",
                name: "",
            },
            company_id: -1,
            display_order:0,
            seo_keywords:"",
            custome_properties: [],
            description: "",
            id: -1,
            images: [],
            name: "",
            seo_description: '',
            seo_title: "",
            short_description: "",
            slug: "",
            tracking_type:0
        },
        variations: []
    }
})

export default DetailsAtom
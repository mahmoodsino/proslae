import BrandType from "./BrandsType"
import CompanyType from "./CompanyType"
import ImagesType from "./ImagesType"
import variationType from "./variationType"

type CartProductType = {
    avg_rate:number,
    brand:BrandType
    brand_id:number
    company:CompanyType
    company_id:number
    display_order:number
    id:number
    image:ImagesType
    in_wishlist:boolean
    name:string
    short_description:string
    slug:string
    variation:variationType
    tracking_type:number

} 

export default CartProductType
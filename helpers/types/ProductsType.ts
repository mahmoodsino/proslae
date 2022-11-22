import BrandType from "./BrandsType"
import CompanyType from "./CompanyType"
import ImagesType from "./ImagesType"
import ProductVariationType from "./ProductVariationType"

type ProductsType = {
    id: number,
    created_at: null,
    name:string,
    slug:string,
    display_order: number,
    short_description: string,
    company_id: number,
    brand_id: number,
    tracking_type: number,
    brand: BrandType
    company:CompanyType
    images: ImagesType[]
    avg_rate: number,
    variation:ProductVariationType
}


export default ProductsType
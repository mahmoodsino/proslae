import BrandType from "./BrandsType"
import CompanyType from "./CompanyType"
import customePropertiesType from "./customePropertiesType"
import ImagesType from "./ImagesType"

interface productDetailsType { 
    avg_rate:number,
    brand:BrandType,
    brand_id:number,
    company:CompanyType,
    company_id:number,
    custome_properties:customePropertiesType[],
    description:string,
    display_order:number,
    id:number,
    images:ImagesType[],
    name:string,
    seo_description:string,
    seo_keywords:string,
    seo_title:string,
    short_description:string,
    slug:string,
    tracking_type:number

}

export default productDetailsType
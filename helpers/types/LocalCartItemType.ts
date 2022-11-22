import ProductsType from "./ProductsType"
import variationType from "./variationType"

interface LocalCartItemType {
    type:number
    id?:number,
    available_quantity?:number,
    product_id:number,
    variation_id:number,
    branch_id:number,
    quantity:number,
    description?:string
    product?:ProductsType,
    price?:number,
    variation?:variationType
    title?:string
}
export default LocalCartItemType;
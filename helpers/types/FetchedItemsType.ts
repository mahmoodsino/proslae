import CartProductType from "./CartProductType"
import variationsDetailsType from "./variationsDetailsType"

interface FetchedItemsType {
    type:number
    id?:number,
    actual_quantity?:number,
    available_quantity?:number,
    product_id:number,
    variation_id:number,
    branch_id:number,
    quantity:number,
    description?:string
    product?:CartProductType,
    price?:number,
    variation?:variationsDetailsType
    title?:string,
    in_stock?:number
}
export default FetchedItemsType
import attributesType from "./attributesType";
import ImagesType from "./ImagesType";

interface variationsDetailsType {
    attributes: attributesType[],
    available_quantity: number,
    branch_id: number
    display_order: number,
    id: number
    images: ImagesType[],
    in_stock: number
    is_default: number,
    name: string,
    new_price: number
    points: number,
    price: number,
    sku: string,
    slug: string
}

export default variationsDetailsType
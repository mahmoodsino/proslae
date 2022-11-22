import FetchedItemsType from "./FetchedItemsType"

interface CartType {
    cost_points:number,
    customer_points:number,
    delivery_fee:string,
    earned_points:number,
    items:FetchedItemsType[],
    sub_total_price:number,
    tax:string,
    total_price:number
}
export default CartType
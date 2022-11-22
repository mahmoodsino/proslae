import OrderItemsType from "./OrderItemsType"

interface TrackOrderType {
    id: number,
    created_at:string,
    number: string,
    total: number,
    earning: number,
    payment_status: number,
    status: string,
    branch_id: number,
    country_name: string,
    city_name: string,
    post_code: number,
    delivery_date: string,
    description: string,
    items: OrderItemsType[]
}

export default TrackOrderType
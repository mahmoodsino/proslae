import FetchedItemsType from "./FetchedItemsType"
import PaymentTransactionsType from "./PaymentTransactionsType"

interface OrderDetailsTyps {
    branch_id: number
    created_at: string
    delivery_date: string
    delivery_fee: number
    description: string
    discount: number
    earning: number
    email: string
    first_name: string
    id: number
    address: {
        address: string
        build_number: string
        city_name: string
        name: string
        post_code: string
        street: null
    },
    last_name: string
    number: string
    payment_transaction: PaymentTransactionsType|null;
    items: FetchedItemsType[]
    phone: number
    pickup_address: null
    status: string
    sub_total: number
    tax: number
    total: number
    user_id: number
}

export default OrderDetailsTyps
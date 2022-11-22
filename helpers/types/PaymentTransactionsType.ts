interface PaymentTransactionsType {
    id: number,
    model_id: number,
    model_type: string,
    amount: number,
    status: string,
    can_completed: boolean,
    payment_way_status:string,
}

export default PaymentTransactionsType
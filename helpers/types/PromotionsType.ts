interface PromotionsType {
    id: number,
    name: string,
    short_description: string,
    image: string,
    type: string,
    amount_type: number,
    fixed_amount: number,
    percentage_amount: number,
    start_date: string,
    end_date: string,
    remaining_time: number
}

export default PromotionsType
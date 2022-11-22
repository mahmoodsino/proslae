import ProductsType from "./ProductsType"
import PromotionsType from "./PromotionsType"

type AllPromotionsType = {
    special_promotion:PromotionsType,
    featured_promotions:PromotionsType[]
    products:ProductsType[]
}
export default AllPromotionsType
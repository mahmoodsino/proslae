type CategoriesType = {
    id: number,
    created_at: string,
    name: string,
    parent_id: number,
    side_img: string,
    categories: CategoriesType[]
}

export default CategoriesType;
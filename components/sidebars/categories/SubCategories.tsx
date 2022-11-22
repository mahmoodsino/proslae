import { useRouter } from 'next/router';
import React from 'react'
import { useRecoilState } from 'recoil';
import { CategoriesType } from '../../../helpers/types'
import QueryFiltersAtom from "../../../helpers/recoil/products/FiltersQueryAtom";


interface Props {
    category : CategoriesType
}

const SubCategories = ({category}:Props) => {
	const [queryFilter, setQueryFilter] = useRecoilState(QueryFiltersAtom);
	const {push}=useRouter()

	const clickCategory = (category:CategoriesType) => {
		setQueryFilter(prev => {
			return(
			  {...prev,SelectedCategories:[category.id]}
			)
		  })
		  push({
			pathname: '/products',
			query: { category:category.id},
		});

	};
  return (
    <ul className="sub_categories_container">
			{category.categories.map((subCategory, index) => {
				return (
					<label key={index} className="sub_category_item">
						<li onClick={() => clickCategory(subCategory)} style={{cursor:"pointer"}}>{subCategory.name}</li>
					</label>
				);
			})}
		</ul>
  )
}

export default SubCategories

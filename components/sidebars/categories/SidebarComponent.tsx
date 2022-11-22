import React, { useState } from 'react'
import { Plus, Minus } from 'tabler-icons-react';
import { useMediaQuery } from 'react-responsive';
import { useToasts } from 'react-toast-notifications';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import CategoriesAtom from '../../../helpers/recoil/home/CategoriesAtom';
import { CategoriesType } from '../../../helpers/types';
import SubCategories from './SubCategories';
import QueryFiltersAtom from "../../../helpers/recoil/products/FiltersQueryAtom";
import { useRouter } from 'next/router';

const variants = {
	hidden: {
		y: 0,
		opacity: 0,
		transition: { duration: 0.3 },
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.3 },
	},
};


const SidebarComponent = () => {
	const [openedCategory, setOpenedCategory] = useState(-1);
	const { addToast } = useToasts();
    const [selectedCategory,setSelectedCategory]=useState<CategoriesType>({} as CategoriesType)
	const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
	const [categories,setCategories]=useRecoilState(CategoriesAtom)
	const [queryFilter, setQueryFilter] = useRecoilState(QueryFiltersAtom);
	const {push}=useRouter()



	const clickCategory = (category:CategoriesType) => {
		setSelectedCategory(category)
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


    const renderArrow = (index:number, category:CategoriesType) => {
		return index === openedCategory ? (
			<Minus
				size="18"
				onClick={() => {
					setOpenedCategory(-1);
				}}
			/>
		) : (
			category.categories?.length > 0 && (
				<Plus
					size="18"
					onClick={() => {
						setOpenedCategory(index);
					}}
				/>
			)
		);
	};

  return (
    <ul className="side_bar_height side_bar">
			{categories.map((category_, index) => {
				return (
					<div key={category_.id}>
						<li className="parent_list_item">
							<div
								className={category_.id !== selectedCategory?.id ? `list_item` : `list_item selected_list_item`}
								onClick={() => clickCategory(category_)}
							>
								<span>{category_.name}</span>
							</div>
							{renderArrow(index, category_)}
						</li>
						{index === openedCategory ? (
							<AnimatePresence exitBeforeEnter>
								<motion.div
									animate={index === openedCategory ? 'visible' : 'hidden'}
									variants={variants}
									initial="hidden"
									exit="hidden"
								>
									<SubCategories category={category_} />
								</motion.div>
							</AnimatePresence>
						) : null}
					</div>
				);
			})}
		</ul>
  )
}

export default SidebarComponent

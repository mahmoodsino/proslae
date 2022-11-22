import React,{useState} from 'react'
import { useMediaQuery } from 'react-responsive';
import { useToasts } from 'react-toast-notifications';
import { useRecoilState } from 'recoil';
import BrandsAtom from '../../../helpers/recoil/home/BrandsAtom';
import { BrandsType } from '../../../helpers/types';
import QueryFiltersAtom from "../../../helpers/recoil/products/FiltersQueryAtom";
import { useRouter } from 'next/router';



const BrandsComponent = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const [selectedBrand,setSelectedBrand]=useState<BrandsType>({} as BrandsType)
	const [loaded, setLoaded] = useState(false);
	const [brands,setBrands]=useRecoilState(BrandsAtom)
	const [queryFilter, setQueryFilter] = useRecoilState(QueryFiltersAtom);
	const {push}=useRouter()


    const handleClick = async (brand:BrandsType) => {
			setQueryFilter(prev => {
			return(
			  {...prev,SelectedBrands:[brand.id]}
			)
		  })
		  push({
			pathname: '/products',
			query: { brand:brand.id},
		});
	};

  return (
    <ul className="side_bar_height side_bar">
			{brands.map((brand, index) => {
				return (
					<li
						key={index}
						className={brand.id === selectedBrand.id ? 'brand_item selected_brand_item' : 'brand_item'}
						onClick={() => {
							handleClick(brand);
						}}
					>
						<div className="brand_name">
							<span>{brand.name}</span>
						</div>
						<img
							src={
								loaded && brand.img 
									? brand.img
									: '/img/no_image.jpg'
							}
							alt=""
							onLoad={() => setLoaded(true)}
						/>
					</li>
				);
			})}
		</ul>
  )
}

export default BrandsComponent

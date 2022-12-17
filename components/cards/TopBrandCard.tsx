import Link from "next/link";
import React, { useState } from "react";
import BrandType from "../../helpers/types/BrandsType";
import QueryFiltersAtom from "../../helpers/recoil/products/FiltersQueryAtom";
import { useRouter } from 'next/router';
import { useRecoilState } from "recoil";

interface Props {
  brand: BrandType;
}

const TopBrandCard = ({ brand }: Props) => {
  const [loaded, setLoaded] = useState(false);
	const [queryFilter, setQueryFilter] = useRecoilState(QueryFiltersAtom);
	const {push}=useRouter()


  const handleLoadImage = () => {
    setLoaded(true);
  };

  const clickBrand = () => {
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
    <div style={{height:"294px"}} className="col-12 mb-30">
      <div style={{height:"294px"}} className="ltn__category-item ltn__category-item-2 text-center image__">
        <img
          src={brand.img ? brand.img : "/alternative.png"}
          alt=""
          width="100%"
          onLoad={handleLoadImage}
        />
        <div className="ltn__category-item-name">
          <h5 style={{height:"45px",fontWeight:""}} className="line-clamp____2">{brand.name}</h5>
          <h5>
            <Link href={`/products?brand=${brand.id}`} onClick={clickBrand}>
              Browse
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default TopBrandCard;

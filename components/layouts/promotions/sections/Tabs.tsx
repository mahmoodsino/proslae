import React from 'react';
import PromotionsType from '../../../../helpers/types/PromotionsType';
import Tab from './Tab';

interface Props {
    promotions:PromotionsType[]
    promotion:PromotionsType
	setSelectedPromotion:any
}

export default function Tabs({ promotions, promotion,setSelectedPromotion }:Props) {
	const tabs = promotions?.map((promotion_, index) => {
		return <Tab setSelectedPromotion={setSelectedPromotion} selectedPromotion={promotion} promotion={promotion_} key={index}  />;
	});

	return (
		<div className="ltn__tab-menu ltn__tab-menu-2 ltn__tab-menu-top-right-- text-uppercase text-center">
			<div className="nav">{tabs}</div>
		</div>
	);
}

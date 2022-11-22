import Link from "next/link";
import React from "react";
import PromotionsType from "../../../../helpers/types/PromotionsType";

interface Props {
    promotion:PromotionsType
    selectedPromotion:PromotionsType
    setSelectedPromotion:any
}

export default function Tab({ promotion, selectedPromotion,setSelectedPromotion }:Props) {
  

  return (
    <Link
      href=""
      className={`${selectedPromotion?.id === promotion?.id && "active show"}`}
      data-toggle="tab"
      onClick={() => setSelectedPromotion(promotion)}
    >
      {promotion.name}
    </Link>
  );
}

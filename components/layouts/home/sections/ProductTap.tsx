import Link from "next/link";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import FeaturedCategoriesAtom from "../../../../helpers/recoil/home/FeaturedCategoriesAtom";
import { CategoriesType } from "../../../../helpers/types";

const ProductTap = () => {
  const [featuredCategory, setFeaturedCategory] = useRecoilState(
    FeaturedCategoriesAtom
  );
  const [selected, setSelected] = useState<CategoriesType>(
    {} as CategoriesType
  );

  const handleClick = (category: CategoriesType) => {
    setSelected(category);
  };
  return (
    <div className="ltn__tab-menu ltn__tab-menu-2 ltn__tab-menu-top-right-- text-uppercase text-center">
      <div className="tab_flex">
        {featuredCategory.map((item, i) => {
          return (
              <a
              key={i}
                className={selected.id === item.id ? "active show" : ""}
                data-toggle="tab"
                onClick={() => handleClick(item)}
              >
              {item.name}

              </a>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTap;

import React, { FormEvent, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import { Minus, Plus } from "tabler-icons-react";
import { BrandsType, CategoriesType } from "../../../../helpers/types";
import QueryFiltersAtom from "../../../../helpers/recoil/products/FiltersQueryAtom";
import { motion, AnimatePresence } from "framer-motion";
import SimpleBTN from "../../../buttons/SimpleBTN";
import CategoryModal from "./CategoryModal";
import { useRouter } from "next/router";
import SearchAtom from "../../../../helpers/recoil/home/SearchAtom";
import { handelFilterProduct } from "../../../../helpers/server/services";
import { useToasts } from "react-toast-notifications";

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
interface Props {
  category: CategoriesType;
}
let SleBran: number[] = [];

const CategoriesBrands = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [openedCategory, setOpenedCategory] = useState(-1);
  const [queryFilter, setQueryFilter] = useRecoilState(QueryFiltersAtom);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useRecoilState(SearchAtom)
  const { addToast } = useToasts();
  const {replace,query} = useRouter()
  const [productsCategorey, setProductsCategory] = useState<CategoriesType[]>([])
  const [brands, setBrands] = useState<BrandsType[]>([])

  useEffect(() => {
    const getData = async () => {
      const res = await handelFilterProduct();
      if(res===null){
        addToast("Something wrong happened!", { appearance: "error" });      }
        else{
          setProductsCategory(res.result.categories);
          setBrands(res.result.brands);

      }
    };
    getData();
  }, []);


  const renderCategories = () => {
    return (
      <ul className="side_bar_height side_bar">
        {productsCategorey.map((category_, index) => {
          return (
            <div  key={category_.id}>
              <li style={{listStyleType:"none",display:"flex",alignItems:"center"}}>
                <div className={`list_item`}>
                  <input
                    onChange={() => clickCategory(category_.id)}
                    checked={
                      queryFilter.SelectedCategories.findIndex(
                        (categorey) => categorey === category_.id
                      ) > -1
                        ? true
                        : false
                    }
                    type="checkbox"
                    className="mr-1"
                  />
                  <span className="span-width___">{category_.name}</span>
                </div>

                {renderArrow(index, category_)}
              </li>
              {index === openedCategory ? (
                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    animate={index === openedCategory ? "visible" : "hidden"}
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
    );
  };

  const SubCategories = ({ category }: Props) => {
    return (
      <ul className="sub_categories_container">
        {category.categories.map((subCategory, index) => {
          return (
            <li style={{listStyleType:"none"}} key={index}>
              <div className={`list_item`}>
                <input
                
                  onChange={() => clickCategory(subCategory.id)}
                  checked={
                    queryFilter.SelectedCategories.findIndex(
                      (categorey) => categorey === subCategory.id
                    ) > -1
                      ? true
                      : false
                  }
                  type="checkbox"
                  className="mr-2"
                />
                <span className="span-width___">{subCategory.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const clickCategory = (Clikcategory: number) => {
    let selCategory: number[] = queryFilter.SelectedCategories;
    const index = selCategory.findIndex(
      (category) => category === Clikcategory
    );
    if (index < 0) {
      selCategory = [...queryFilter.SelectedCategories, Clikcategory];
    } else if (index >= 0) {
      selCategory = selCategory.filter((item) => item !== Clikcategory);
    }
    let QueryCategory = selCategory.map(item => item).join("-")
    replace({query: { ...query, category: QueryCategory }},
   undefined,{scroll:false}
   );
    setQueryFilter((prev) => {
      return {
        ...prev,
        SelectedCategories: selCategory,
      };
    });
  };

  const renderArrow = (index: number, category: CategoriesType) => {
    return index === openedCategory ? (
      <Minus
        className="mr-2___"
        size="18"
        onClick={() => {
          setOpenedCategory(-1);
        }}
      />
    ) : (
      category.categories?.length > 0 && (
        <Plus
          className="mr-2___"
          size="18"
          onClick={() => {
            setOpenedCategory(index);
          }}
        />
      )
    );
  };

  const renderBrands = () => {
    return (
      <ul className=" side_bar">
        {brands.map((brands, index) => {
          return (
            <div key={brands.id}>
              <li style={{listStyleType:"none"}}>
                <div className={`list_item`}>
                  <input
                    onChange={() => clickBrand(brands.id)}
                    checked={
                      queryFilter.SelectedBrands.findIndex(
                        (brand) => brand === brands.id
                      ) > -1
                        ? true
                        : false
                    }
                    type="checkbox"
                    className="mr-2"
                  />
                  <span className="line-clamp____ span-width___">
                    {brands.name}
                  </span>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    if (typeof query.brand !== undefined) {
      //@ts-ignore
      const q = query?.brand?.split("-");
      q?.map((item: string) => {
        let index: number = SleBran.findIndex((find) => find === +item);
        if (index < 0 && +item != 0) {
          SleBran = [...SleBran, +item];
        }
      });
    }
    setQueryFilter((prev) => {
      return {
        ...prev,
        SelectedBrands: SleBran,
      };
    });
  }, [query.brand]);

  const clickBrand = (brandId: number) => {
    const index = SleBran.findIndex((brand) => brand === brandId);
    if (index < 0) {
      SleBran = [...SleBran, brandId];
    } else if (index >= 0) {
      SleBran = SleBran.filter((item) => item !== brandId);
    }
    let queryBrand = SleBran.map((item) => item).join("-");
    replace(
      {query: { ...query, brand: queryBrand },},
      undefined,{scroll: false,}
    );
    setQueryFilter((prev) => {
      return {
        ...prev,
        SelectedBrands: SleBran,
      };
    });
  };

  const toggleDialog = () => {
    setOpen(true);
  };

  const handelSearch = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setQueryFilter((prev) => {
      return { ...prev, search: search };
    });
    replace({ query: { ...query, search: search } }, undefined, {
      scroll: false,
    });
  };

  

  return (
    <div style={{zIndex:10000000}}>
      {open && <CategoryModal open={open} setOpen={setOpen} categories={renderCategories()} brands={renderBrands()}/>}

      <div className="ltn__search-widget no_outline mt-20">
        <form onSubmit={handelSearch}>
          <input
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            type="text"
            name="search"
            placeholder="Search by keywords..."
          />
          <button type="submit" className="no_outline">
            <i className="fas fa-search no_outline"></i>
          </button>
        </form>
      </div>
      {!isMobile ? (
        <>
          <div className="widget ltn__menu-widget">
            <strong className="ltn__widget-title">Categories</strong>
            <div className="max-height-categories">{renderCategories()}</div>
          </div>
          <div className="widget ltn__menu-widget ">
            <strong className="ltn__widget-title">Brands</strong>
            <div className="max-height-categories">{renderBrands()}</div>
          </div>
        </>
      ) : (
        <div className="mt-20">
          <SimpleBTN title="Filter" handleClick={toggleDialog} />
        </div>
      )}
    </div>
  );
};

export default CategoriesBrands;

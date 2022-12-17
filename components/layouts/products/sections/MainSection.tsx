import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import TopAreaPages from "../../pages-top-area/TopAreaPages";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import CircleProgressBar from "../../progress-bar";
import { getProducts, handelFilterProduct } from "../../../../helpers/server/services";
import { useRecoilState } from "recoil";
import {
  ProductsAtom,
  TokenAtom,
  totalPagesAtom,
} from "../../../../helpers/recoil";
import QueryFiltersAtom from "../../../../helpers/recoil/products/FiltersQueryAtom";
import Products from "./Products";
import CategoriesBrands from "./CategoriesBrands";
import CategoryModal from "./CategoryModal";
import Paginations from "../../../pagination/Paginations";
import CartMenu from "../../../cart/CartMenu";
import MoveTopBTN from "../../../buttons/MoveTopBTN";
import FixedCart from "../../../cart/FixedCart";
import BottomCart from "../../../cart/BottomCart";
import { useRouter } from "next/router";
import CartMobileMenu from "../../../cart/CartMobileMenu";

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

const MainSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useRecoilState(ProductsAtom);
  const [queryFilter, setQueryFilter] = useRecoilState(QueryFiltersAtom);
  const [token, seToken] = useRecoilState(TokenAtom);
  const [totalPages, setTotalPages] = useRecoilState(totalPagesAtom);
  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>;

  const { query,replace } = useRouter();




  useEffect(() => {
    if (typeof query.page !== "undefined") {
      setQueryFilter((prev) => {
        return (
          //@ts-ignore
          { ...prev, page: +query.page }
        );
      });
    }
  }, [query.page]);

  useEffect(() => {
    if (typeof query.search !== "undefined") {
      setQueryFilter((prev) => {
        return { ...prev, search: query.search };
      });
    }
  }, [query.search]);

  useEffect(() => {
    let selCategory: number[] = queryFilter.SelectedCategories;

    if (typeof query.category !== "undefined") {
      //@ts-ignore
      const q = query?.category?.split("-");
      q.map((item: string) => {
        let index: number = selCategory.findIndex((find) => find === +item);
        if (index < 0 && +item != 0) {
          selCategory = [...selCategory, +item];
        }
      });
    }
    setQueryFilter((prev) => {
      return {
        ...prev,
        SelectedCategories: selCategory,
      };
    });
  }, [query.category]);

  useEffect(() => {
    const leave = () => {
      setQueryFilter({
        SelectedBrands: [],
        SelectedCategories: [],
        page: 1,
        search: "",
        promotion:1
      });
    };
    return () => {
      leave();
    };
  }, []);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await getProducts({
        Brands: queryFilter.SelectedBrands,
        categoryId: queryFilter.SelectedCategories,
        page: queryFilter.page,
        //@ts-ignore
        product_name: queryFilter.search,
        token: token,
      });
      if (res === null) {
        setLoading(false);
      } else {
        setProducts(res.result.items);
        setTotalPages(res.result.pages_count);
        setLoading(false);
      }
    };
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      getData();
    }, 1000);
  }, [queryFilter]);

  const renderProducts = () => {
    return <Products />;
  };

  const paginate = (pageNumber: number) => {
    replace(
      {query: { ...query, page:pageNumber }},
      undefined,
      {scroll: true,}
    );
    setQueryFilter((prev) => {
      return { ...prev, page: pageNumber };
    });
  };

  return (
    <div>
      <CartMenu />
      <CartMobileMenu />

      <MoveTopBTN />
      {token && !isMobile ? <FixedCart /> : token && isMobile && <BottomCart />}

      <TopAreaPages title="Products" isMini={true} />
      <motion.div
        className="ltn__product-area ltn__product-gutter mb-120"
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-5 col-lg-3 left-filters">
              <div className="ltn__shop-options">
                <h2 className="section-title sm">Filters</h2>
                <div>
                  <CategoriesBrands />
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-7 col-lg-9 mt-40">
              <>
                {!loading ? (
                  <div className="tab-content">
                    {renderProducts()}
                    <Paginations paginate={paginate} />
                  </div>
                ) : (
                  <div style={{display:"flex", justifyContent:"center"}}>
                    <CircleProgressBar height={60} />
                  </div>
                )}
                {/* <Pagination where={where} product={product} search={search} /> */}
              </>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MainSection;

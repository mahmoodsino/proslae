import React from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { ProductsAtom } from "../../../../helpers/recoil/products";
import GridProduct from "../../../cards/GridProduct";

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

const Products = () => {
  const [products, setProducts] = useRecoilState(ProductsAtom);

  const data = products?.map((product, index) => {
    return <GridProduct key={index} product={product} />;
  });

  return (
    <motion.div variants={variants} initial="hidden" animate="visible">
      <div className="row">{data}</div>
    </motion.div>
  );
};

export default Products;

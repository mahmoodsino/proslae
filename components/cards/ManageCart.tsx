import Link from "next/link";
import React from "react";
import { ProductsType } from "../../helpers/types";

interface Props {
  product?:ProductsType
}

const ManageCart = ({product}:Props) => {
  const renderLinks = () => {
    return (
      <li>
        <Link href="#" title="Quick View">
          <i className="far fa-eye"></i>
        </Link>
      </li>
    );
  };
  return (
    <div className="product-hover-action">
      <ul>{renderLinks()}</ul>
    </div>
  );
};

export default ManageCart;

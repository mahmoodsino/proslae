import Link from "next/link";
import React from "react";


import { ShoppingCart } from "tabler-icons-react";

export default function AddToCartBTN({ title, handleClick }) {
  return (
    <Link
      to="#"
      className="theme-btn-1 btn btn-effect-1 animated_green"
      title={title}
      onClick={handleClick}
    >
      <ShoppingCart className="mr-1" />
      <span>{title}</span>
    </Link>
  );
}

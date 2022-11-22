import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  className: String;
  type: "button" | "submit" | "reset" | undefined
}

export default function AddAddressBTN({ title, className ,type}: Props) {
  return (
    <button className={`theme-btn-1 btn btn-effect-1 animated_green text-uppercase ${
      className ? className : ""
    }`} type={type}>
      {title}
    </button>
  );
}

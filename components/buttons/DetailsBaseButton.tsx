import React, { MouseEvent, ReactNode } from 'react'

interface Props {
    type?: "submit" | "button";
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    className: string | undefined;
    children?: ReactNode;
    disabled?: boolean;}
  

const DetailsBaseButton = ({ onClick,disabled, title, className, type, children }:Props) => {
  return (
    <button
    disabled={disabled}

      type={type ? type : "button"}
      onClick={onClick}
      className={`${
        className ? className : ""
      }`}
    >
      {title}
      {children}
    </button>
  )
}

export default DetailsBaseButton

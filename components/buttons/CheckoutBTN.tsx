import Link from 'next/link'
import React from 'react'

interface Props {
    title?:String,
    handleClick?:any
    disabled?:any
    type?:any
}

const CheckoutBTN = ({handleClick,disabled,title,type}:Props) => {
  return (
    <button type={type} disabled={disabled}  className="theme-btn-1 btn btn-effect-1 animated_green text-uppercase puttom__disable"  onClick={handleClick}>
			{title}
		</button>
  )
}

export default CheckoutBTN

import React from 'react'

interface Props {
    title?:string,
    handleClick?:any
    type?:any
    btnStyle?:string
    className?:string
}

const SimpleBTN = ({ title, handleClick, type = 'button', btnStyle = 'btn-regular', className = '' }:Props) => {
  return (
    <button className={`btn1 ${btnStyle} ${className}`} onClick={handleClick} type={type}>
			{title}
		</button>
  )
}

export default SimpleBTN

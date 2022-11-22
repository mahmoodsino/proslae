import React from "react";

interface Props {
    name?:string,
    type?:any
    hint?:any
    handleChange?:any
    className?:string,
    value?:any
    disabled?:boolean
    register?:any

}

const SimpleInput = ({ name, hint, type = 'text', handleChange, className = '', value, disabled ,register}:Props) => {
  return (
    <input
      type={type ? type : "text"}
      name={name}
      placeholder={hint}
      onChange={handleChange}
      className={"input1 " + className}
      value={value}
      {...register && {...register(name)}}
      disabled={disabled ? disabled : false}
    />
  );
};

export default SimpleInput;

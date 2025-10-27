import React, { InputHTMLAttributes } from 'react'

interface InputCustom extends InputHTMLAttributes<HTMLInputElement>{
  item: string;
}

const InputCustom = ({ item, ...props }: InputCustom) => {

  return (
    <React.Fragment>
      <input {...props} />
    </React.Fragment>
  )
}

export default InputCustom
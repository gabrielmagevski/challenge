import React, { InputHTMLAttributes } from 'react'

interface InputCustom extends InputHTMLAttributes<HTMLInputElement>{
  item: string;
}

const InputCustom = React.memo(({ item, ...props }: InputCustom) => {
  return (
    <React.Fragment>
      <input {...props} />
    </React.Fragment>
  )
})

export default InputCustom
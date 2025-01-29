import React from 'react'
import './Input.css'

function Input({name, type, placeholder, value=undefined, onChangeHandle, isRequired=true, props}) {
  return (
    <input
     name={name}
     type={type} 
     placeholder={placeholder}
     value={value} 
     onChange={(e) => onChangeHandle(e)}  
     required={isRequired}
     {...props}
     className='input_field'
    />
  )
}

export default React.memo(Input)
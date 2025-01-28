import React from 'react'

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
    />
  )
}

export default React.memo(Input)
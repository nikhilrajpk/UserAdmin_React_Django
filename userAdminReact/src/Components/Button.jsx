import React from 'react'

function Button({label, onClickHandle=null, type}) {
  return (
    <button type={type} onClick={onClickHandle} >{label}</button>
  )
}

export default Button
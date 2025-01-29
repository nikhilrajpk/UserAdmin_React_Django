import React from 'react'
import './Button.css'

function Button({label, onClickHandle=null, type}) {
  return (
    <button type={type} onClick={onClickHandle} className='btn'>{label}</button>
  )
}

export default React.memo(Button)
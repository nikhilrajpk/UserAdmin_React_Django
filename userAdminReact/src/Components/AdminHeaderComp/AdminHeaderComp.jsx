import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../Input'
import Logout from '../Logout'
import './AdminHeaderComp.css'

function AdminHeaderComp({value, onChangeHandle}) {
  return (
    <header className='admin_header'>
        < Link to={'/admin-home'} >
            <h2>ADMIN HOME</h2>
        </Link>

        < Input type={'text'}
         placeholder={'Search user...'}
         value={value} 
         onChangeHandle={onChangeHandle} 
         isRequired={false}  
        />

        < Logout />
    </header>
  )
}

export default React.memo(AdminHeaderComp)
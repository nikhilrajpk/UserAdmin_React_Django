import React from 'react'
import './Header.css'
import Logout from '../Logout'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
        < Link to={'/user-home'} >
            <h2>HOME</h2>
        </Link>
        <div className='right_top'>
          < Link to={'/user-profile'}>
              <h1 className='profile_btn'>👤</h1>
          </Link>
          < Logout />
        </div>
    </header>
  )
}

export default Header
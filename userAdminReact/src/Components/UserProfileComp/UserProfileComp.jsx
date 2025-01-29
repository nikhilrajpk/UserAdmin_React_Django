import React from 'react'
import './UserProfileComp.css'
import { useSelector } from 'react-redux'
import Button from '../Button'
import { Link } from 'react-router-dom'

function UserProfileComp() {
    const userDetails = useSelector((state)=> state.user.user)
    console.log(userDetails)

  return (
    <div className='user_profile_container'>
        {   <div className='user_profile_details'>
                <img 
                    src={`http://127.0.0.1:8000${userDetails?.user_profile}`} 
                    alt={userDetails?.username} 
                    className='user_profile_img'
                />
                <h4>Username : {userDetails?.username}</h4> <hr />
                <h4>Email : {userDetails?.email}</h4> <hr />
                <h4>First Name : {userDetails?.first_name}</h4> <hr />
                <h4>Last Name : {userDetails?.last_name}</h4> <hr />
                <h4>Phone number : {userDetails?.phone}</h4> <hr />
                <h4>Address : {userDetails?.address}</h4> <hr />
            </div>
        }
        < Link >
            < Button type={'button'} label={'Edit Profile'} />
        </Link>
    </div>
  )
}

export default UserProfileComp
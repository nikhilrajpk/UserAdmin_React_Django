import React from 'react'
import Header from '../HeaderComp/Header'
// import { useSelector } from 'react-redux'

function HomePage() {
    // const user = useSelector((state)=> state.user.user)
  return (
    <div>
        < Header />
        {/* {
            Object.entries(user).map(([key, value])=>(
                <p key={key}>{key} : {value}</p>
            ))
        } */}
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROCA1n9GNJe_4hQ98v5kOikwiMMbQ9YDO6mA&s"
        alt="home image"
        style={{width:'100%'}}
        />
    </div>
  )
}

export default HomePage
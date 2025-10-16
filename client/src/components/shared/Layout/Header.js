import React from 'react'
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import {useSelector} from 'react-redux'
const Header = () => {
const {user} = useSelector((state)=>state.auth)

  return (
<>
    <nav className='navbar'>
        <div className='container-fluid'>
            <div className='navbar-brand'><BiSolidDonateBlood color='red' />Blood Axis</div>
        <ul className='navbar-nav flex-row'>
          <li className='nav-item mx-3'>
            <p className='nav-link'><FaUserCircle color='green' />WELCOME {user }</p>
          </li>
           <li className='nav-item mx-3'> 
       <button
  style={{
    height: '50px',
    width: '70px',
    display: 'block',
    margin: '0 auto'
  }}
  className='btn btn-danger'
>
  Logout
</button>
          </li>
        </ul>
        
        </div>
    </nav>
</>
  )
}

export default Header
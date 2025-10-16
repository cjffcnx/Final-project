import React from 'react'
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Header = () => {
const navigate=useNavigate()

const {user} = useSelector((state)=>state.auth)
//Logout handler
const handleLogout=()=>{
    localStorage.clear();
    toast.success('Logout Successfully')
    navigate('/login');

}

  return (
<>
    <nav className='navbar'>
        <div className='container-fluid'>
            <div className='navbar-brand'><BiSolidDonateBlood color='red' />Blood Axis</div>
        <ul className='navbar-nav flex-row'>
          <li className='nav-item mx-3'>
            <p className='nav-link'><FaUserCircle color='green' />WELCOME</p>
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
 onClick={handleLogout}>
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
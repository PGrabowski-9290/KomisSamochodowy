import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Nav = () => {
  const { auth,setAuth } = useAuth()

  const navigate = useNavigate()
  const isLogin = auth.userId

  const handleLogOut = () => {
     setAuth({})
     navigate('/')
  }

 
  return (
    <>
      <nav className='mainMenu'>
        <div className='logo'>
          <Link to='/'>
            <img src='' alt='LOGO_KOMIS'/>
          </Link>
        </div>
        
        {/* menu */}

        <div className='menu'> 
          <span className='menu-item'>
            {!isLogin? <Link to='/auth'>Zaloguj</Link> : <Link to='/' onClick={handleLogOut}>Wyloguj</Link> }
          </span>
          <span className='menu-item'>
            <Link to='/offers'>Oferty</Link>
          </span>
        </div>
      </nav>
    </>
  )
}

export default Nav
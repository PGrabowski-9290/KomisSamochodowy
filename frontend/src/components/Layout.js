import { Outlet } from 'react-router-dom'
import React from 'react'
import Nav from './Nav'

const Layout = () => {


  return (
    
    <main className='main'>
      <Nav />
      <section className='page'>
        <Outlet />
      </section>
      
    </main>
  )
}

export default Layout
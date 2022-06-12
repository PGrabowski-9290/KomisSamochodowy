import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Auth from './pages/Auth.page'
import Home from './pages/Home.page'
import Offers from './pages/Offers.page'
import OffertPage from './pages/OffertPage.page'
import Reserve from './pages/Reserve.page'
import RequireAuth from './components/RequireAuth'
import Unauthorized from './pages/Unauthorized.page'
import Notfound from './pages/NotFound'

const ROLES = {
  'User': 3,
  "Editor": 2,
  "Admin": 1
}

const App = () => { 
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<Auth />}/>
        <Route path="offers" element={<Offers />}/>
        <Route path="offert" element={<OffertPage />}/>
        <Route path="unauthorized" element={<Unauthorized />}/>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor, ROLES.User]}/> }>
          <Route path='reserve' element={<Reserve />}/>
        </Route>

        <Route path='*' element={<Notfound />}/>
      </Route>
    </Routes>
  )
}

export default App
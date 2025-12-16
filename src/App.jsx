import React, {useEffect, useState} from 'react'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'

import Dashboard from './Dashboard'
import Login from './Login'
import About from './About'
import Contact from './Contact'
import Navbar from './Navbar'
import LandingPage from './LandingPage' // We'll create this component

export default function App(){
  const [grievances, setGrievances] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    if (stored && stored !== 'undefined' && stored !== 'null') {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error('Error parsing user from localStorage:', e)
        localStorage.removeItem('user') // Clean up invalid data
        return null
      }
    }
    return null
  })

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{ if(token) axios.defaults.headers.common.Authorization = `Bearer ${token}` }, [token])

  function fetchList(){
    axios.get(`${import.meta.env.VITE_API_URL}/api/grievances`)
      .then(res => setGrievances(res.data))
      .catch(console.error)
  }

  function logout(){
    setToken('')
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common.Authorization
    navigate('/')
  }

  function handleLoggedIn(data) {
    const { token, user } = data
    setToken(token)
    setUser(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    navigate('/dashboard')
  }

  // Determine if the navbar should be visible
  // const showNavbar = location.pathname === '/' || location.pathname === '/dashboard';
  // const showNavbar = ['/', '/login'].includes(location.pathname);
  const showNavbar = ['/', '/login', '/about', '/contact'].includes(location.pathname);



  return (
    <>
      {showNavbar && <Navbar user={user} onLogout={logout} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          user ? <Navigate to="/dashboard" /> : <LandingPage />
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={
          user ? <Navigate to="/dashboard" /> : <Login initialEmail={localStorage.getItem('rememberEmail') || ''} onLoggedIn={handleLoggedIn} />
        } />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          user ? <Dashboard user={user} onLogout={logout} /> : <Navigate to="/login" />
        } />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
      </Routes>
    </>
  )
}

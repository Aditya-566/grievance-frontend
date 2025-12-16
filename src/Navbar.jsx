import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from './ThemeContext'

export default function Navbar({ user, onLogout }) {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    setMobileMenuOpen(false)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container" onClick={() => isMobileMenuOpen && setMobileMenuOpen(false)}>
        <div className="navbar-brand">
          <h2 className="brand-text">Grievance Tracker</h2>
        </div>

        <div className="navbar-menu">
          <button
            className="theme-toggle-btn nav-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <NavLink to="/" className="nav-link">
            <span className="nav-icon">🏠</span>
            Home
          </NavLink>

          <NavLink to="/about" className="nav-link">
            <span className="nav-icon">ℹ️</span>
            About
          </NavLink>

          <NavLink to="/contact" className="nav-link">
            <span className="nav-icon">📞</span>
            Contact
          </NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className="nav-link">
                <span className="nav-icon">📊</span>
                Dashboard
              </NavLink>

              <div className="user-menu">
                <span className="user-greeting">
                  <span className="nav-icon">👤</span>
                  {user.name || user.email}
                </span>
                <button className="logout-btn" onClick={handleLogout}>
                  <span className="nav-icon">🚪</span>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <NavLink to="/login" className="nav-link login-btn">
              <span className="nav-icon">🔐</span>
              Login
            </NavLink>
          )}
        </div>

        <div className="navbar-mobile-toggle" onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(!isMobileMenuOpen); }}>
          <span className="hamburger">☰</span>
        </div>
      </div>
    </nav>
  )
}
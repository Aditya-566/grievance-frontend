import React from 'react'

export default function Navbar({ user, onLogout, onNavigate }) {
  const handleLogout = () => {
    onLogout()
    onNavigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2 className="brand-text">Grievance Tracker</h2>
        </div>

        <div className="navbar-menu">
          <button className="nav-link" onClick={() => onNavigate('/')}>
            <span className="nav-icon">🏠</span>
            Home
          </button>

          <button className="nav-link" onClick={() => onNavigate('/about')}>
            <span className="nav-icon">ℹ️</span>
            About
          </button>

          <button className="nav-link" onClick={() => onNavigate('/contact')}>
            <span className="nav-icon">📞</span>
            Contact
          </button>

          {user ? (
            <>
              <button className="nav-link" onClick={() => onNavigate('/dashboard')}>
                <span className="nav-icon">📊</span>
                Dashboard
              </button>

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
            <button className="nav-link login-btn" onClick={() => onNavigate('/login')}>
              <span className="nav-icon">🔐</span>
              Login
            </button>
          )}
        </div>

        <div className="navbar-mobile-toggle">
          <span className="hamburger">☰</span>
        </div>
      </div>
    </nav>
  )
}
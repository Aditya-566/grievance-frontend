import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Login({ onLoggedIn, initialEmail }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState(initialEmail || '')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const API = import.meta.env.VITE_API_URL

  // Check for token in URL (from Google OAuth redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (token) {
      // Clear URL
      window.history.replaceState({}, document.title, window.location.pathname)
      // Store token and get user data
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      // Fetch user data
      axios.get(`${API}/api/auth/me`)
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data.user))
          onLoggedIn && onLoggedIn(res.data.user)
        })
        .catch(err => {
          console.error('Failed to get user data:', err)
          setError('Authentication failed. Please try again.')
        })
    }
  }, [API, onLoggedIn])

  async function submit(e) {
    e.preventDefault()
    setError('')
    const errs = {}
    if (!email) errs.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Enter a valid email'
    if (!password) errs.password = 'Password is required'
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (isSignUp && !name) errs.name = 'Name is required'
    setFieldErrors(errs)
    if (Object.keys(errs).length) return

    setLoading(true)
    try {
      if (isSignUp) {
        // Register new user
        await axios.post(`${API}/api/auth/register`, {
          email,
          password,
          name
        })
        // After registration, automatically log them in
        const res = await axios.post(`${API}/api/auth/login`, {
          email,
          password
        })

        // ✅ SAVE TOKEN + USER
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))

        onLoggedIn && onLoggedIn(res.data.user)
      } else {
        // Login existing user
        const res = await axios.post(`${API}/api/auth/login`, {
          email,
          password
        })

        // ✅ SAVE TOKEN + USER
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))

        onLoggedIn && onLoggedIn(res.data.user)
      }
    } catch (err) {
      console.error('Login/Register error:', err)
      const status = err?.response?.status
      if (!err.response) {
        setError('Network error: Unable to connect to server. Please check if the backend is running.')
      } else if (isSignUp) {
        if (status === 409) setError('This email is already registered. Please sign in instead.')
        else if (status === 400) setError(err.response?.data?.error || 'Invalid input. Please check your details.')
        else setError(err.response?.data?.error || 'Registration failed. Please try again.')
      } else {
        if (status === 401) setError('Invalid email or password')
        else if (status === 400) setError(err.response?.data?.error || 'Email and password are required')
        else if (status === 500) setError('Server error. Please try again later.')
        else setError(err.response?.data?.error || 'Login failed. Please check your credentials.')
      }
    } finally { setLoading(false) }
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-orb orb-left"></div>
        <div className="login-orb orb-right"></div>
        <div className="login-orb orb-center"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      <div className="login-container">
        <div className="login-card" data-tilt>
          <div className="login-header">
            <div className="login-icon-wrapper">
              <div className="login-icon">
                {isSignUp ? '✨' : '🔐'}
              </div>
            </div>
            <h1 className="login-title">
              <span className="title-highlight">{isSignUp ? 'Create Account' : 'Welcome Back'}</span>
            </h1>
            <p className="login-subtitle">
              {isSignUp
                ? 'Sign up with your email to get started'
                : 'Sign in to continue to your dashboard'}
            </p>
          </div>

          <form onSubmit={submit} className="login-form">
            {isSignUp && (
              <div className="field-row login-field">
                <label htmlFor="login-name" className="field-label">
                  <span className="label-icon">👤</span>
                  Name
                </label>
                <div className="input-wrapper">
                  <input
                    id="login-name"
                    className={"login-input " + (fieldErrors.name ? 'input-error' : '')}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your name"
                    type="text"
                    autoFocus={isSignUp}
                  />
                  {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
                </div>
              </div>
            )}

            <div className="field-row login-field">
              <label htmlFor="login-email" className="field-label">
                <span className="label-icon">📧</span>
                Email
              </label>
              <div className="input-wrapper">
                <input
                  id="login-email"
                  className={"login-input " + (fieldErrors.email ? 'input-error' : '')}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  autoFocus={!isSignUp}
                />
                {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
              </div>
            </div>

            <div className="field-row login-field">
              <label htmlFor="login-password" className="field-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <div className="input-wrapper password-wrapper">
                <input
                  id="login-password"
                  className={"login-input " + (fieldErrors.password ? 'input-error' : '')}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
                {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
              </div>
            </div>

            {error && (
              <div className="alert alert-error login-alert">
                <span className="alert-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-actions login-actions">
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </span>
                ) : (
                  <span>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </button>
            </div>

            <div className="google-signin-section">
              <div className="divider">
                <span>or</span>
              </div>
              <button
                type="button"
                className="google-signin-btn"
                onClick={() => window.location.href = `${API}/api/auth/google`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="login-toggle">
              <button
                type="button"
                className="toggle-link"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setFieldErrors({})
                }}
              >
                {isSignUp ? (
                  <>
                    Already have an account? <span className="toggle-highlight">Sign in</span>
                  </>
                ) : (
                  <>
                    Don't have an account? <span className="toggle-highlight">Sign up</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

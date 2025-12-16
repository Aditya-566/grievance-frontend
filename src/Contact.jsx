import React, { useState } from 'react'
import { useTheme } from './context/ThemeContext';
import './styles/Contact.css';

const contactInfoItems = [
  {
    icon: '📧',
    title: 'Email Support',
    lines: ['adityasharmapc1@gmail.com', 'We respond within 24 hours'],
  },
  {
    icon: '📞',
    title: 'Phone Support',
    lines: ['+91 9814421501', 'Mon-Fri, 9AM-6PM EST'],
  },
  {
    icon: '📍',
    title: 'Office Address',
    lines: ['123 Grievance Street', 'Management City, MC 12345'],
  },
];

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const SUCCESS_MESSAGE_TIMEOUT = 3000;

export default function Contact({ onBack }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [submitted, setSubmitted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the data to a backend
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setFormData(INITIAL_FORM_STATE); // Reset form fields
    setTimeout(() => {
      setSubmitted(false);
    }, SUCCESS_MESSAGE_TIMEOUT);
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <div className="header-top">
            <button className="back-btn" onClick={onBack}>
              ← Back to Home
            </button>
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
          <h1 className="contact-title">
            <span className="title-highlight">Contact Us</span>
          </h1>
          <p className="contact-subtitle">
            Have questions or need support? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            {contactInfoItems.map((item) => (
              <div className="info-card" key={item.title}>
                <div className="info-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                {item.lines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us how we can help you..."
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                {submitted ? 'Message Sent! ✓' : 'Send Message'}
              </button>

              {submitted && (
                <div className="success-message">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
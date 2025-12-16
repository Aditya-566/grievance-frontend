import React, { useState } from 'react'

export default function Contact({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

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
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="contact-page">
      <div className="contact-background">
        <div className="contact-orb orb-left"></div>
        <div className="contact-orb orb-right"></div>
        <div className="contact-orb orb-center"></div>
      </div>

      <div className="contact-container">
        <div className="contact-header">
          <button className="back-btn" onClick={onBack}>
            ← Back to Home
          </button>
          <h1 className="contact-title">
            <span className="title-highlight">Contact Us</span>
          </h1>
          <p className="contact-subtitle">
            Have questions or need support? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email Support</h3>
              <p>adityasharmapc1@gmail.com</p>
              <p>We respond within 24 hours</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Phone Support</h3>
              <p>+91 9814421501</p>
              <p>Mon-Fri, 9AM-6PM EST</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Office Address</h3>
              <p>123 Grievance Street</p>
              <p>Management City, MC 12345</p>
            </div>
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
import React, { useState } from 'react'
import { useTheme } from './ThemeContext';
import { Link } from 'react-router-dom';

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

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { theme, toggleTheme } = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error for the field being edited
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setFormData(INITIAL_FORM_STATE); // Reset form fields
    setErrors({}); // Clear errors on successful submission
    setTimeout(() => {
      setSubmitted(false);
    }, SUCCESS_MESSAGE_TIMEOUT);
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <div className="header-top">
            <Link to="/" className="back-btn">
              ← Back to Home
            </Link>
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
                  placeholder="Your full name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}                  
                  placeholder="your.email@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}                  
                  placeholder="What's this about?"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && <span id="subject-error" className="error-message">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}                  
                  placeholder="Tell us how we can help you..."
                  rows="5"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                ></textarea>
                {errors.message && <span id="message-error" className="error-message">{errors.message}</span>}
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
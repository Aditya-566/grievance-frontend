import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  function quickSignIn() {
    navigate('/login');
  }

  return (
    <div className="landing-page">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      <div className="container hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">✨ Modern Grievance Management</div>
            <h1 className="hero-title">
              <span className="title-gradient">Grievance Tracker</span>
              <br />
              Clear, Fast, Transparent
            </h1>
            <p className="hero-subtitle">
              Submit issues, track progress, and resolve concerns with a simple workflow designed for teams and institutions.
            </p>

            <div className="topics">
              <div className="topic-card" data-tilt>
                <div className="topic-icon">📝</div>
                <strong>Easy Submission</strong>
                <div className="muted-small">Create grievances quickly with title and description.</div>
              </div>
              <div className="topic-card" data-tilt>
                <div className="topic-icon">📊</div>
                <strong>Status Tracking</strong>
                <div className="muted-small">Open, Resolved, or Rejected — stay informed with real-time updates.</div>
              </div>
              <div className="topic-card" data-tilt>
                <div className="topic-icon">⚙️</div>
                <strong>Admin Actions</strong>
                <div className="muted-small">Admins can resolve, reject, or re-open items with audit-friendly actions.</div>
              </div>
              <div className="topic-card" data-tilt>
                <div className="topic-icon">📈</div>
                <strong>Analytics</strong>
                <div className="muted-small">Dashboard stats and filters help you prioritize work.</div>
              </div>
            </div>

            <div className="cta-section">
              <button className="cta-btn" onClick={quickSignIn}>
                <span>Sign in — Get started</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="cta-btn-secondary" onClick={() => navigate('/about')}>
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
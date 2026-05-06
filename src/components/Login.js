import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="auth-card animate-fade-in w-100" style={{ maxWidth: 440 }}>
        <div className="text-center mb-5">
          <div className="d-inline-block p-3 rounded-circle mb-3" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h2 className="fw-bold" style={{ color: 'var(--text-main)', letterSpacing: '-0.5px' }}>Welcome Back</h2>
          <p className="text-muted">Enter your details to access your tasks</p>
        </div>
        
        {error && (
          <div className="alert border-0 py-3 mb-4 text-center" style={{ backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '500' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label small fw-bold text-uppercase tracking-wider text-muted">Username</label>
            <input 
              className="form-control form-control-modern" 
              placeholder="Your username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })} 
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-bold text-uppercase tracking-wider text-muted">Password</label>
            <input 
              className="form-control form-control-modern" 
              type="password" 
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} 
              required
            />
          </div>
          <button className="btn btn-modern btn-modern-primary w-100 mt-2 mb-4">
            Sign In Now
          </button>
        </form>
        
        <div className="text-center">
          <p className="mb-0 text-muted small">
            Don't have an account? <Link to="/register" className="text-decoration-none fw-bold" style={{ color: 'var(--primary-color)' }}>Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
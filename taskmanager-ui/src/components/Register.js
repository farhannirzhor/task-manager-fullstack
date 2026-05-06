import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      setMsg('Success! Account created successfully.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMsg(err.response?.data || 'Error occurred during registration');
    }
  };

  const isSuccess = msg.includes('Success');

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="auth-card animate-fade-in w-100" style={{ maxWidth: 420 }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: 'var(--primary-color)' }}>Create Account</h2>
          <p className="text-muted">Start organizing your productivity</p>
        </div>
        
        {msg && (
          <div className="alert border-0 py-3 mb-4" style={{ 
            backgroundColor: isSuccess ? 'var(--success-bg)' : 'var(--error-bg)', 
            color: isSuccess ? 'var(--success-text)' : 'var(--error-text)', 
            borderRadius: '12px' 
          }}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label small fw-semibold text-muted">Username</label>
            <input 
              className="form-control form-control-modern" 
              placeholder="Pick a username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })} 
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-semibold text-muted">Email Address</label>
            <input 
              className="form-control form-control-modern" 
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} 
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-semibold text-muted">Password</label>
            <input 
              className="form-control form-control-modern" 
              type="password" 
              placeholder="Create a strong password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} 
              required
            />
          </div>
          <button className="btn btn-modern btn-modern-primary w-100 mt-2 mb-4">
            Sign Up
          </button>
        </form>
        
        <p className="mb-0 text-center text-muted small">
          Already have an account? <Link to="/login" className="text-decoration-none fw-bold" style={{ color: 'var(--primary-color)' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
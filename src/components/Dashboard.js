import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async (e) => {
    e.preventDefault();
    await API.post('/tasks', { title, description });
    setTitle(''); setDescription('');
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await API.put(`/tasks/${task.id}`, { ...task, completed: !task.completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="App">
      <nav className="navbar-modern">
        <div className="container d-flex justify-content-between align-items-center px-4">
          <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', borderRadius: 12, color: 'white' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
            </div>
            <h4 className="mb-0 fw-bold" style={{ color: 'var(--text-main)', letterSpacing: '-1px' }}>TaskFlow</h4>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-none d-sm-flex flex-column align-items-end me-2">
              <span className="text-muted small fw-bold">PRO ACCOUNT</span>
              <span className="fw-bold" style={{ fontSize: '0.9rem' }}>{username}</span>
            </div>
            <button className="btn btn-sm btn-modern" style={{ background: '#fee2e2', color: '#ef4444' }} onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>

      <main className="main-content container animate-fade-in" style={{ maxWidth: 900 }}>
        <div className="row g-4">
          {/* Left Column: Add Task */}
          <div className="col-lg-4">
            <div className="auth-card p-4 h-100">
              <h5 className="fw-bold mb-4" style={{ color: 'var(--primary-color)' }}>New Task</h5>
              <form onSubmit={addTask}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted text-uppercase">Title</label>
                  <input className="form-control form-control-modern" placeholder="What needs to be done?"
                    value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted text-uppercase">Description</label>
                  <textarea 
                    className="form-control form-control-modern" 
                    placeholder="Add details..."
                    rows="3"
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                  />
                </div>
                <button className="btn btn-modern btn-modern-primary w-100 py-3">
                  Create Task
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Task List */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0 text-white">Active Tasks</h4>
              <span className="badge-vibrant text-white">{tasks.length} Total</span>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-5 auth-card">
                <div className="mb-3 opacity-20" style={{ fontSize: '4rem' }}>🏝️</div>
                <h5 className="fw-bold text-muted">All caught up!</h5>
                <p className="text-muted small">Enjoy your free time or start a new task.</p>
              </div>
            ) : (
              <div className="task-list">
                {tasks.map(task => (
                  <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                    <div className="d-flex align-items-center gap-3">
                      <div className="custom-checkbox">
                        <input 
                          type="checkbox" 
                          className="form-check-input"
                          style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer', accentColor: 'var(--success-color)' }}
                          checked={task.completed}
                          onChange={() => toggleTask(task)} 
                        />
                      </div>
                      <div>
                        <h6 className={`mb-0 fw-bold ${task.completed ? 'completed-task-text' : ''}`}>
                          {task.title}
                        </h6>
                        {task.description && (
                          <p className="text-muted small mb-0 mt-1">{task.description}</p>
                        )}
                      </div>
                    </div>
                    <button 
                      className="btn btn-link text-danger p-2 border-0 opacity-50 hover-opacity-100"
                      onClick={() => deleteTask(task.id)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <header className="page-header">
        <h1>Project Management Utility</h1>
        <p>Manage SDLC phases and tasks with a simple Kanban-style workflow.</p>
      </header>
      <div className="grid-2" style={{ marginTop: '2rem' }}>
        <Link to="/users" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Users</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Add and manage team members. Assign them to tasks from the dashboard.
          </p>
          <span className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>Manage Users →</span>
        </Link>
        <Link to="/tasks" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Tasks Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            View all tasks across phases: To Do → In Progress → Review → Done. Move tasks and view history.
          </p>
          <span className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>Open Dashboard →</span>
        </Link>
        <Link to="/my-tasks" className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>My Tasks</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            See tasks assigned to you. Pick a user to filter by assignee.
          </p>
          <span className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>View My Tasks →</span>
        </Link>
      </div>
    </>
  );
}

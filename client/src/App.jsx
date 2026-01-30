import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import TasksPage from './pages/TasksPage';
import MyTasksPage from './pages/MyTasksPage';

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="container nav-inner">
          <NavLink to="/" className="nav-brand" style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)' }}>
            Project Management
          </NavLink>
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>Users</NavLink>
            <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>Tasks Dashboard</NavLink>
            <NavLink to="/my-tasks" className={({ isActive }) => isActive ? 'active' : ''}>My Tasks</NavLink>
          </div>
        </div>
      </nav>
      <main style={{ flex: 1, padding: '1.5rem 0' }}>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/my-tasks" element={<MyTasksPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

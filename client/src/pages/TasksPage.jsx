import { useState, useEffect } from 'react';
import { tasksApi, usersApi } from '../services/api';
import TaskHistoryModal from '../components/TaskHistoryModal';

const PHASES = ['To Do', 'In Progress', 'Review', 'Done'];
const PHASE_SLUG = (p) => p.toLowerCase().replace(/\s+/g, '-');

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [historyTask, setHistoryTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    phase: 'To Do',
    assignedTo: '',
    priority: 'Medium',
  });

  const fetchTasks = async () => {
    try {
      setError('');
      const data = await tasksApi.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (_) {}
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const getTasksByPhase = (phase) =>
    tasks.filter((t) => t.phase === phase);

  const moveTask = async (taskId, newPhase) => {
    try {
      setError('');
      await tasksApi.update(taskId, { phase: newPhase });
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await tasksApi.create({
        ...form,
        assignedTo: form.assignedTo || undefined,
      });
      setForm({ title: '', description: '', phase: 'To Do', assignedTo: '', priority: 'Medium' });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    try {
      await tasksApi.delete(id);
      fetchTasks();
      if (historyTask?._id === id) setHistoryTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const openHistory = async (task) => {
    const full = await tasksApi.getOne(task._id);
    setHistoryTask(full);
  };

  return (
    <>
      <header className="page-header">
        <h1>Tasks Dashboard</h1>
        <p>Kanban view of SDLC phases. Move tasks between columns; click “History” for full audit.</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card-header" style={{ marginBottom: '1rem' }}>
        <h2>All Tasks</h2>
        <button type="button" className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>New Task</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Task title" required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Phase</label>
                <select value={form.phase} onChange={(e) => setForm({ ...form, phase: e.target.value })}>
                  {PHASES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Assign to</label>
              <select value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
                <option value="">— None —</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Create Task</button>
          </form>
        </div>
      )}

      {loading ? (
        <p className="empty-state">Loading tasks…</p>
      ) : (
        <div className="kanban">
          {PHASES.map((phase) => (
            <div key={phase} className={`kanban-column c-phase-${PHASE_SLUG(phase)}`}>
              <h3>{phase}</h3>
              <div className="kanban-tasks">
                {getTasksByPhase(phase).map((task) => (
                  <div key={task._id} className="kanban-task">
                    <h4>{task.title}</h4>
                    {task.description && <p>{task.description}</p>}
                    <div className="kanban-task-meta">
                      <span className={`priority priority-${(task.priority || 'medium').toLowerCase()}`}>
                        {task.priority || 'Medium'}
                      </span>
                      {task.assignedTo && (
                        <span>{typeof task.assignedTo === 'object' ? task.assignedTo.name : 'Assigned'}</span>
                      )}
                    </div>
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {PHASES.filter((p) => p !== phase).map((p) => (
                        <button key={p} type="button" className="btn btn-ghost btn-sm" onClick={() => moveTask(task._id, p)}>
                          → {p}
                        </button>
                      ))}
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => openHistory(task)}>History</button>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(task._id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {historyTask && (
        <TaskHistoryModal task={historyTask} onClose={() => setHistoryTask(null)} />
      )}
    </>
  );
}

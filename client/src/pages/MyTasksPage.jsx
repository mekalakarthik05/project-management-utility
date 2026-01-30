import { useState, useEffect } from 'react';
import { tasksApi, usersApi } from '../services/api';
import TaskHistoryModal from '../components/TaskHistoryModal';

export default function MyTasksPage() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [historyTask, setHistoryTask] = useState(null);

  useEffect(() => {
    usersApi.getAll().then(setUsers).catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      setTasks([]);
      return;
    }
    setLoading(true);
    setError('');
    tasksApi.getByUser(selectedUserId)
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedUserId]);

  const openHistory = async (task) => {
    const full = await tasksApi.getOne(task._id);
    setHistoryTask(full);
  };

  const selectedUser = users.find((u) => u._id === selectedUserId);

  return (
    <>
      <header className="page-header">
        <h1>My Tasks</h1>
        <p>View tasks assigned to a user. Select a user to see their current assignments.</p>
      </header>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Select user</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            style={{ maxWidth: '320px' }}
          >
            <option value="">— Choose a user —</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {!selectedUserId ? (
        <p className="empty-state">Select a user above to see their assigned tasks.</p>
      ) : loading ? (
        <p className="empty-state">Loading…</p>
      ) : tasks.length === 0 ? (
        <p className="empty-state">No tasks assigned to {selectedUser?.name || 'this user'}.</p>
      ) : (
        <>
          <h2 className="section-title">Tasks assigned to {selectedUser?.name}</h2>
          <div className="grid-2">
            {tasks.map((task) => (
              <div key={task._id} className="card">
                <h3 style={{ marginBottom: '0.5rem' }}>{task.title}</h3>
                {task.description && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{task.description}</p>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', background: 'var(--surface-hover)', borderRadius: '4px', fontSize: '0.85rem' }}>{task.phase}</span>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem', background: task.priority === 'High' ? 'rgba(239,68,68,0.2)' : task.priority === 'Low' ? 'rgba(34,197,94,0.2)' : 'rgba(234,179,8,0.2)' }}>{task.priority || 'Medium'}</span>
                </div>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => openHistory(task)}>View History</button>
              </div>
            ))}
          </div>
        </>
      )}

      {historyTask && (
        <TaskHistoryModal task={historyTask} onClose={() => setHistoryTask(null)} />
      )}
    </>
  );
}

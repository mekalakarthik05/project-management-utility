import { useState, useEffect } from 'react';
import { usersApi } from '../services/api';

const ROLES = ['Developer', 'Designer', 'Manager', 'QA', 'Other'];

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', role: 'Developer' });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setError('');
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await usersApi.update(editingId, form);
        setEditingId(null);
      } else {
        await usersApi.create(form);
      }
      setForm({ name: '', email: '', role: 'Developer' });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (u) => {
    setForm({ name: u.name, email: u.email, role: u.role || 'Developer' });
    setEditingId(u._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await usersApi.delete(id);
      fetchUsers();
      if (editingId === id) {
        setEditingId(null);
        setForm({ name: '', email: '', role: 'Developer' });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', email: '', role: 'Developer' });
  };

  return (
    <>
      <header className="page-header">
        <h1>Manage Users</h1>
        <p>Add and edit team members. Use them when assigning tasks.</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h2>{editingId ? 'Edit User' : 'Add User'}</h2>
          {editingId && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={cancelEdit}>Cancel</button>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@example.com"
              required
              disabled={!!editingId}
            />
            {editingId && <small style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Email cannot be changed</small>}
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update User' : 'Add User'}
          </button>
        </form>
      </div>

      <h2 className="section-title">All Users</h2>
      {loading ? (
        <p className="empty-state">Loading users…</p>
      ) : users.length === 0 ? (
        <p className="empty-state">No users yet. Add one above.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role || 'Developer'}</td>
                  <td>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => handleEdit(u)}>Edit</button>
                    <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: '0.5rem' }} onClick={() => handleDelete(u._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

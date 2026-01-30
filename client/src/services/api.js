const API_BASE = '/api';
const API_KEY = import.meta.env.VITE_API_KEY || 'dev-api-key';

const headers = () => ({
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY,
});

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: { ...headers(), ...options.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}

export const usersApi = {
  getAll: () => request('/users'),
  getOne: (id) => request(`/users/${id}`),
  create: (body) => request('/users', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/users/${id}`, { method: 'DELETE' }),
};

export const tasksApi = {
  getAll: (params) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/tasks${qs}`);
  },
  getByUser: (userId) => request(`/tasks/user/${userId}`),
  getOne: (id) => request(`/tasks/${id}`),
  create: (body) => request('/tasks', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
};

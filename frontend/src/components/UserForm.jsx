import React, { useEffect, useState } from 'react';
import { Users } from '../services/api';

const API_BASE = "http://localhost:4000/api";

const empty = { name: '', email: '', role: 'user', status: 'active', bio: '', avatarUrl: '', password: '' };

export default function UserForm({ onCreated }) {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const on = (e) => {
      if (e.detail?.type === 'edit-user') setForm({ ...e.detail.user, password: '' });
    };
    window.addEventListener('um:bus', on);
    return () => window.removeEventListener('um:bus', on);
  }, []);

  async function submit(e) {
    e.preventDefault(); setLoading(true); setMessage('');
    try {
      if (form._id) {
        const { _id, password, ...rest } = form; // block password updates here
        await Users.update(_id, rest);
        setMessage('Updated ✔');
      } else {
        if (!form.password) throw new Error('Password is required for new users');
        await Users.create(form);
        setMessage('Created ✔');
      }
      setForm(empty);
      onCreated?.();
    } catch (err) { setMessage(err.response?.data?.error || err.message); }
    finally { setLoading(false); }
  }

  function onChange(k, v) { setForm(f => ({ ...f, [k]: v })); }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="input" placeholder="Full name" value={form.name} onChange={e=>onChange('name', e.target.value)} required />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={e=>onChange('email', e.target.value)} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  <select
    className="input text-black bg-white"
    value={form.role}
    onChange={e=>onChange('role', e.target.value)}
  >
    <option value="user">User</option>
    <option value="manager">Manager</option>
    <option value="admin">Admin</option>
  </select>

  <select
    className="input text-black bg-white"
    value={form.status}
    onChange={e=>onChange('status', e.target.value)}
  >
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
    <option value="banned">Banned</option>
  </select>
</div>

      <input className="input" placeholder="Avatar URL (https://)" value={form.avatarUrl} onChange={e=>onChange('avatarUrl', e.target.value)} />
      <textarea className="input h-28" placeholder='About (bio) — e.g. "Lead admin ensuring platform reliability. Added for incident response and governance."' value={form.bio} onChange={e=>onChange('bio', e.target.value)} />

      {!form._id && (
        <input className="input" type="password" placeholder="Password (min 6)" value={form.password} onChange={e=>onChange('password', e.target.value)} />
      )}

      <div className="flex items-center gap-3">
        <button disabled={loading} className="btn btn-primary min-w-28">{loading ? 'Saving…' : (form._id ? 'Update' : 'Create')}</button>
        {form._id && (
          <button type="button" className="btn" onClick={()=>setForm(empty)}>Cancel</button>
        )}
        {message && <span className="text-sm text-white/70">{message}</span>}
      </div>
    </form>
  );
}

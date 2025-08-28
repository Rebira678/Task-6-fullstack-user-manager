import React, { useEffect, useMemo, useState } from 'react';
import { Users } from '../services/api.js';
import UserForm from '../components/UserForm.jsx';
import UserList from '../components/UserList.jsx';
import AboutModal from '../components/AboutModal.jsx';

const ROLE_FILTERS = ['all', 'admin', 'manager', 'user'];

export default function Home() {
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('all');
  const [aboutUser, setAboutUser] = useState(null);

  async function refresh() {
    const list = await Users.list(query);
    setUsers(list);
  }

  useEffect(() => { refresh(); }, [query]);

  const filtered = useMemo(() => {
    if (!users) return users;
    if (role === 'all') return users;
    return users.filter(u => (u.role || '').toLowerCase() === role);
  }, [users, role]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Create / Update Form */}
      <section id="create" className="lg:col-span-1 card-glass rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-1">Create / Edit Profile</h2>
        <p className="text-white/60 mb-4">
          Add new users or click a card to edit. Use the filters to slice your directory by role.
        </p>
        <UserForm onCreated={refresh} />
      </section>
      {/* List & Filters */}
      <section id="list" className="lg:col-span-2 card-glass rounded-3xl p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div>
            <div className="text-xl font-semibold">Directory</div>
            <p className="text-white/60 text-sm">Search and filter users. Click “About” on a card to see why they’re on the team.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              className="input w-full sm:w-auto sm:min-w-[200px] sm:max-w-md"
              placeholder="Search name, email, role…"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
            <div className="flex gap-2">
              {ROLE_FILTERS.map(r => (
                <button
                  key={r}
                  onClick={()=>setRole(r)}
                  className={`btn ${role===r ? 'btn-primary text-white' : 'text-black bg-white/10'} capitalize`}

                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <UserList users={filtered} onChanged={refresh} onAbout={setAboutUser} />
        </div>
      </section>

      {/* About Modal */}
      {aboutUser && (
        <AboutModal user={aboutUser} onClose={()=>setAboutUser(null)} />
      )}
    </div>
    
  );
}





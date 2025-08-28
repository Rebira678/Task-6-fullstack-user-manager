import React from 'react';
import UserCard from './UserCard.jsx';

export default function UserList({ users, onChanged, onAbout }) {
  if (users === null) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-3xl card-glass skeleton h-40" />
        ))}
      </div>
    );
  }

  if (!users.length) {
    return <div className="text-white/60 mt-6">No users match your filters.</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
      {users.map(u => (
        <UserCard key={u._id} user={u} onChanged={onChanged} onAbout={onAbout} />
      ))}
    </div>
  );
}

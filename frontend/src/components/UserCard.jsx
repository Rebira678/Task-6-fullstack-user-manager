import React from 'react';
import { Users } from '../services/api';
import { UserRound, Mail, Trash2, Info } from 'lucide-react';

export default function UserCard({ user, onChanged, onAbout }) {
  const roleColor = {
    admin: 'from-amber-400 to-pink-500',
    manager: 'from-emerald-400 to-cyan-500',
    user: 'from-primary-400 to-indigo-500'
  }[user.role] || 'from-slate-300 to-slate-500';

  const statusDot = {
    active: 'bg-emerald-400',
    inactive: 'bg-yellow-400',
    banned: 'bg-rose-500'
  }[user.status];

  async function onDelete() {
    if (!confirm('Delete this user?')) return;
    await Users.remove(user._id);
    onChanged?.();
  }

  function dispatchEdit() {
    const ev = new CustomEvent('um:bus', { detail: { type: 'edit-user', user } });
    window.dispatchEvent(ev);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="relative card-glass card-hover rounded-3xl p-4">
      <div className="absolute right-4 top-4 flex flex-col items-end gap-1">
         <span className={`h-2.5 w-2.5 rounded-full ${statusDot}`} />
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white capitalize">
         {user.status}
        </span>
      </div>


      <div className="flex items-center gap-4">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} className="h-14 w-14 rounded-2xl object-cover" />
        ) : (
          <div className="h-14 w-14 rounded-2xl grid place-items-center bg-white/10">
            <UserRound />
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="font-semibold truncate">{user.name}</div>
            <div className={`text-[10px] rounded-full px-2 py-0.5 bg-gradient-to-tr ${roleColor}`}>{user.role}</div>
          </div>
          <div className="text-sm text-white/70 truncate flex items-center gap-2"><Mail size={14} /> {user.email}</div>
          {user.bio && <p className="mt-1 text-white/70 text-sm line-clamp-2">{user.bio}</p>}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <button onClick={dispatchEdit} className="btn">Edit</button>
        <button onClick={onDelete} className="btn bg-rose-500/80 hover:bg-rose-500"><Trash2 size={16} /></button>
        <button onClick={()=>onAbout?.(user)} className="btn"><Info size={16} /> <span className="ml-1">About</span></button>
      </div>
    </div>
  );
}

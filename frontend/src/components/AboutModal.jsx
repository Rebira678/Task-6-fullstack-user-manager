import React from 'react';

export default function AboutModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="bg-white/10 border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h3 className="text-2xl font-bold">{user.name}</h3>
        <p className="text-white/70">{user.email}</p>
        <div className="mt-4">
          <div className="badge capitalize">{user.role}</div>
        </div>
        <p className="mt-6 leading-relaxed text-white/90">
          {user.bio || 'No “About” text yet. Edit this user and add a short description.'}
        </p>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="btn btn-primary">Close</button>
        </div>
      </div>
    </div>
  );
}

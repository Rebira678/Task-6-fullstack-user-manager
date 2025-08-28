import User from '../models/user.model.js';

export const createUser = async (payload) => {
  const user = await User.create(payload);
  const obj = user.toObject();
  delete obj.password;
  return obj;
};

export const listUsers = async (q = '') => {
  const query = q
    ? { $or: [
        { name: new RegExp(q, 'i') },
        { email: new RegExp(q, 'i') },
        { role: new RegExp(q, 'i') }
      ] }
    : {};
  const users = await User.find(query).sort({ createdAt: -1 }).lean();
  return users.map(u => { delete u.password; return u; });
};

export const getUser = async (id) => {
  const user = await User.findById(id).lean();
  if (!user) { const e = new Error('User not found'); e.status = 404; throw e; }
  delete user.password; return user;
};

export const updateUser = async (id, payload) => {
  if (payload.password) delete payload.password; // block password changes here
  const user = await User.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
  if (!user) { const e = new Error('User not found'); e.status = 404; throw e; }
  delete user.password; return user;
};

export const removeUser = async (id) => {
  const user = await User.findByIdAndDelete(id).lean();
  if (!user) { const e = new Error('User not found'); e.status = 404; throw e; }
  delete user.password; return user;
};

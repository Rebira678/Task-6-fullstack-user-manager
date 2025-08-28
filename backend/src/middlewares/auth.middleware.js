import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const useAuth = String(process.env.USE_AUTH || 'true') === 'true';

export function requireAuth(optional = !useAuth) {
  return async (req, res, next) => {
    try {
      if (optional) return next();
      const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);
      if (!token) { const e = new Error('Auth token missing'); e.status = 401; throw e; }
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.id).lean();
      if (!user) { const e = new Error('User not found'); e.status = 401; throw e; }
      req.user = { id: user._id.toString(), role: user.role };
      next();
    } catch (err) { err.status = err.status || 401; next(err); }
  };
}

export function requireRole(role) {
  return (req, _res, next) => {
    if (!req.user) { const e = new Error('Not authenticated'); e.status = 401; return next(e); }
    if (req.user.role !== role && req.user.role !== 'admin') { const e = new Error('Forbidden'); e.status = 403; return next(e); }
    next();
  };
}

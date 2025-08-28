import { Router } from 'express';
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js';
import * as ctrl from '../controllers/users.controller.js';

const r = Router();

// Check if auth should be used
const useAuth = process.env.USE_AUTH === "true";

// Auth routes (always available)
r.post('/auth/register', ctrl.register);
r.post('/auth/login', ctrl.login);
r.post('/auth/logout', ctrl.logout);

// Users CRUD

// GET /users
r.get(
  '/users',
  useAuth ? requireAuth() : (req, res, next) => next(),
  ctrl.list
);

// POST /users
r.post(
  '/users',
  useAuth ? [requireAuth(), requireRole('manager')] : (req, res, next) => next(),
  ctrl.create
);

// GET /users/:id
r.get(
  '/users/:id',
  useAuth ? requireAuth() : (req, res, next) => next(),
  ctrl.get
);

// PUT /users/:id
r.put(
  '/users/:id',
  useAuth ? requireAuth() : (req, res, next) => next(),
  ctrl.update
);

// DELETE /users/:id
r.delete(
  '/users/:id',
  useAuth ? [requireAuth(), requireRole('manager')] : (req, res, next) => next(),
  ctrl.remove
);

export default r;

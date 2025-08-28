import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  validate,
  userCreateSchema,
  userUpdateSchema,
  authSchema,
} from "../utils/validate.js";
import * as service from "../services/user.service.js";

export const register = async (req, res, next) => {
  try {
    const data = validate(userCreateSchema, req.body);
    const exists = await User.findOne({ email: data.email });
    if (exists) {
      const e = new Error("Email already in use");
      e.status = 409;
      throw e;
    }
    const user = await User.create(data);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    const obj = user.toObject();
    delete obj.password;
    res.status(201).json(obj);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = validate(authSchema, req.body);
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      const e = new Error("Invalid credentials");
      e.status = 401;
      throw e;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    const obj = user.toObject();
    delete obj.password;
    res.json(obj);
  } catch (err) {
    next(err);
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
};

export const create = async (req, res, next) => {
  try {
    const data = validate(userCreateSchema, req.body);
    const u = await service.createUser(data);
    res.status(201).json(u);
  } catch (err) {
    next(err);
  }
};
export const list = async (req, res, next) => {
  try {
    const users = await service.listUsers(req.query.q);
    res.json(users);
  } catch (err) {
    next(err);
  }
};
export const get = async (req, res, next) => {
  try {
    const user = await service.getUser(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
  try {
    const data = validate(userUpdateSchema, req.body);
    const u = await service.updateUser(req.params.id, data);
    res.json(u);
  } catch (err) {
    next(err);
  }
};
export const remove = async (req, res, next) => {
  try {
    const u = await service.removeUser(req.params.id);
    res.json(u);
  } catch (err) {
    next(err);
  }
};

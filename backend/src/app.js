import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import usersRouter from './routes/users.routes.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 200 });
app.use(limiter);

app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api', usersRouter);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

app.use(notFound);
app.use(errorHandler);

export default app;


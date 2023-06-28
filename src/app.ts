import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import swaggerApp from './middleware/swagger';
import apiRouter from './routes/api';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use('/', swaggerApp);

// Routes
app.use('/api', apiRouter);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

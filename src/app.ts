import express, { Application } from 'express';
import cors from 'cors';
import playerRoutes from './routes/player.routes';
import statisticsRoutes from './routes/statistics.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { requestLogger } from './middlewares/logger.middleware';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Health check endpoint
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Tennis Players API is running',
    version: '1.0.0',
    endpoints: {
      players: '/api/players',
      statistics: '/api/statistics',
    },
  });
});

// API Routes
app.use('/api/players', playerRoutes);
app.use('/api/statistics', statisticsRoutes);

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

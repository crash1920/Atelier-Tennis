import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import playerRoutes from './routes/player.routes';
import statisticsRoutes from './routes/statistics.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { requestLogger } from './middlewares/logger.middleware';
import { swaggerSpec } from './config/swagger';

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
      documentation: '/api-docs',
    },
  });
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Tennis API Documentation',
}));

// API Routes
app.use('/api/players', playerRoutes);
app.use('/api/statistics', statisticsRoutes);

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

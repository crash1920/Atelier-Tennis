import { Router } from 'express';
import { statisticsController } from '../controllers/statistics.controller';

const router = Router();

// Task 3: Get statistics
router.get('/', (req, res, next) => statisticsController.getStatistics(req, res, next));

export default router;

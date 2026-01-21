import { Router } from 'express';
import { statisticsController } from '../controllers/statistics.controller';

const router = Router();

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Get player statistics
 *     description: Retrieve aggregated statistics including country with most wins, average BMI, and median height
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Statistics calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Statistics'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', (req, res, next) => statisticsController.getStatistics(req, res, next));

export default router;

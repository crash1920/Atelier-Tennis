import { Router } from 'express';
import { playerController } from '../controllers/player.controller';
import { validateBody } from '../middlewares/validation.middleware';
import { createPlayerSchema } from '../schemas/player.schema';

const router = Router();

/**
 * @swagger
 * /api/players:
 *   get:
 *     summary: Get all tennis players
 *     description: Retrieve a list of all tennis players sorted by world ranking
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: List of players retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Player'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', (req, res, next) => playerController.getAllPlayers(req, res, next));

/**
 * @swagger
 * /api/players/{id}:
 *   get:
 *     summary: Get player by ID
 *     description: Retrieve detailed information about a specific tennis player
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Player unique identifier
 *         example: 52
 *     responses:
 *       200:
 *         description: Player found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Player'
 *       404:
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', (req, res, next) => playerController.getPlayerById(req, res, next));

/**
 * @swagger
 * /api/players:
 *   post:
 *     summary: Create a new player
 *     description: Add a new tennis player to the database
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Player created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Player'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', validateBody(createPlayerSchema), (req, res, next) => playerController.createPlayer(req, res, next));

export default router;

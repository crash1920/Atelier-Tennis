import { Router } from 'express';
import { playerController } from '../controllers/player.controller';

const router = Router();

// Task 1: Get all players sorted by rank
router.get('/', (req, res, next) => playerController.getAllPlayers(req, res, next));

// Task 2: Get player by ID
router.get('/:id', (req, res, next) => playerController.getPlayerById(req, res, next));

// Task 4: Create new player
router.post('/', (req, res, next) => playerController.createPlayer(req, res, next));

export default router;

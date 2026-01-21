import { Request, Response, NextFunction } from 'express';
import { playerService } from '../services/player.service';
import { CreatePlayerDTO } from '../schemas/player.schema';

export class PlayerController {
  getAllPlayers(_req: Request, res: Response, next: NextFunction): void {
    try {
      const players = playerService.getAllPlayers();
      res.json({
        success: true,
        data: players,
        count: players.length,
      });
    } catch (error) {
      next(error);
    }
  }

  getPlayerById(req: Request, res: Response, next: NextFunction): void {
    try {
      const idParam = req.params.id;
      if (typeof idParam !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Invalid player ID format',
          status: 400,
        });
        return;
      }
      const id = parseInt(idParam, 10);

      if (Number.isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Invalid player ID format',
          status: 400,
        });
        return;
      }

      const player = playerService.getPlayerById(id);

      if (!player) {
        res.status(404).json({
          success: false,
          error: 'Not Found',
          message: `Player with ID ${id} not found`,
          status: 404,
        });
        return;
      }

      res.json({
        success: true,
        data: player,
      });
    } catch (error) {
      next(error);
    }
  }

  createPlayer(req: Request, res: Response, next: NextFunction): void {
    try {
      const playerData: CreatePlayerDTO = req.body;
      const newPlayer = playerService.createPlayer(playerData);

      res.status(201).json({
        success: true,
        data: newPlayer,
      });
    } catch (error) {
      // Handle duplicate player error
      if (error instanceof Error && error.message.includes('already exists')) {
        res.status(409).json({
          success: false,
          error: 'Conflict',
          message: error.message,
          status: 409,
        });
        return;
      }
      next(error);
    }
  }
}

export const playerController = new PlayerController();

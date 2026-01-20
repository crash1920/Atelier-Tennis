import { Request, Response, NextFunction } from 'express';
import { statisticsService } from '../services/statistics.service';
import { playerService } from '../services/player.service';

export class StatisticsController {
  getStatistics(_req: Request, res: Response, next: NextFunction): void {
    try {
      const players = playerService.getPlayers();
      const statistics = statisticsService.calculateStatistics(players);

      res.json({
        success: true,
        data: statistics,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const statisticsController = new StatisticsController();

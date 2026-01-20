import { playerService } from '../../src/services/player.service';
import { CreatePlayerDTO } from '../../src/models/player.model';

describe('PlayerService', () => {
  describe('getAllPlayers', () => {
    it('should return all players sorted by rank', () => {
      const players = playerService.getAllPlayers();

      expect(players.length).toBeGreaterThan(0);

      // Check if sorted by rank (ascending)
      for (let i = 0; i < players.length - 1; i += 1) {
        expect(players[i].data.rank).toBeLessThanOrEqual(players[i + 1].data.rank);
      }
    });

    it('should return player with rank 1 as first', () => {
      const players = playerService.getAllPlayers();
      expect(players[0].data.rank).toBe(1);
    });
  });

  describe('getPlayerById', () => {
    it('should return a player for valid ID', () => {
      const player = playerService.getPlayerById(52);

      expect(player).not.toBeNull();
      expect(player?.firstname).toBe('Novak');
      expect(player?.lastname).toBe('Djokovic');
    });

    it('should return null for invalid ID', () => {
      const player = playerService.getPlayerById(99999);
      expect(player).toBeNull();
    });
  });

  describe('createPlayer', () => {
    it('should create a new player with valid data', () => {
      const newPlayerData: CreatePlayerDTO = {
        firstname: 'Roger',
        lastname: 'Federer',
        sex: 'M',
        country: {
          code: 'SUI',
        },
        data: {
          rank: 3,
          points: 3000,
          weight: 85000,
          height: 185,
          age: 40,
        },
      };

      const initialCount = playerService.getPlayers().length;
      const newPlayer = playerService.createPlayer(newPlayerData);

      expect(newPlayer.id).toBeDefined();
      expect(newPlayer.firstname).toBe('Roger');
      expect(newPlayer.lastname).toBe('Federer');
      expect(playerService.getPlayers().length).toBe(initialCount + 1);
    });

    it('should generate shortname if not provided', () => {
      const newPlayerData: CreatePlayerDTO = {
        firstname: 'Andy',
        lastname: 'Murray',
        sex: 'M',
        country: {
          code: 'GBR',
        },
        data: {
          rank: 5,
          points: 2500,
          weight: 84000,
          height: 190,
          age: 35,
        },
      };

      const newPlayer = playerService.createPlayer(newPlayerData);
      expect(newPlayer.shortname).toBe('A.MUR');
    });

    it('should throw error for missing firstname', () => {
      const invalidData = {
        lastname: 'Test',
        sex: 'M',
        country: { code: 'USA' },
        data: { rank: 1, points: 1000, weight: 80000, height: 180, age: 25 },
      } as CreatePlayerDTO;

      expect(() => playerService.createPlayer(invalidData)).toThrow('Validation failed');
    });

    it('should throw error for invalid sex', () => {
      const invalidData = {
        firstname: 'Test',
        lastname: 'Player',
        sex: 'X' as 'M' | 'F',
        country: { code: 'USA' },
        data: { rank: 1, points: 1000, weight: 80000, height: 180, age: 25 },
      };

      expect(() => playerService.createPlayer(invalidData)).toThrow('sex must be either M or F');
    });

    it('should throw error for missing country code', () => {
      const invalidData = {
        firstname: 'Test',
        lastname: 'Player',
        sex: 'M',
        country: {},
        data: { rank: 1, points: 1000, weight: 80000, height: 180, age: 25 },
      } as CreatePlayerDTO;

      expect(() => playerService.createPlayer(invalidData)).toThrow('country.code is required');
    });

    it('should throw error for invalid rank', () => {
      const invalidData = {
        firstname: 'Test',
        lastname: 'Player',
        sex: 'M' as 'M' | 'F',
        country: { code: 'USA' },
        data: { rank: 0, points: 1000, weight: 80000, height: 180, age: 25 },
      };

      expect(() => playerService.createPlayer(invalidData)).toThrow('rank must be a positive number');
    });

    it('should throw error for negative weight', () => {
      const invalidData = {
        firstname: 'Test',
        lastname: 'Player',
        sex: 'M' as 'M' | 'F',
        country: { code: 'USA' },
        data: { rank: 1, points: 1000, weight: -1000, height: 180, age: 25 },
      };

      expect(() => playerService.createPlayer(invalidData)).toThrow('weight must be a positive number');
    });
  });
});

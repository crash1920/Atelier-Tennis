import { StatisticsService } from '../../src/services/statistics.service';
import { Player } from '../../src/models/player.model';

describe('StatisticsService', () => {
  let statisticsService: StatisticsService;

  beforeEach(() => {
    statisticsService = new StatisticsService();
  });

  const mockPlayers: Player[] = [
    {
      id: 1,
      firstname: 'Test',
      lastname: 'Player1',
      shortname: 'T.P1',
      sex: 'M',
      country: { code: 'USA', picture: '' },
      picture: '',
      data: {
        rank: 1,
        points: 1000,
        weight: 80000, // 80kg
        height: 180, // 180cm -> BMI = 24.69
        age: 25,
        last: [1, 1, 1, 1, 1], // 100% win rate
      },
    },
    {
      id: 2,
      firstname: 'Test',
      lastname: 'Player2',
      shortname: 'T.P2',
      sex: 'F',
      country: { code: 'FRA', picture: '' },
      picture: '',
      data: {
        rank: 2,
        points: 900,
        weight: 60000, // 60kg
        height: 170, // 170cm -> BMI = 20.76
        age: 23,
        last: [1, 0, 1, 0, 0], // 40% win rate
      },
    },
    {
      id: 3,
      firstname: 'Test',
      lastname: 'Player3',
      shortname: 'T.P3',
      sex: 'M',
      country: { code: 'USA', picture: '' },
      picture: '',
      data: {
        rank: 3,
        points: 800,
        weight: 75000, // 75kg
        height: 185, // 185cm -> BMI = 21.91
        age: 28,
        last: [1, 1, 0, 1, 0], // 60% win rate
      },
    },
  ];

  describe('calculateStatistics', () => {
    it('should calculate all statistics correctly', () => {
      const stats = statisticsService.calculateStatistics(mockPlayers);

      expect(stats).toHaveProperty('countryWithHighestWinRatio');
      expect(stats).toHaveProperty('averageBMI');
      expect(stats).toHaveProperty('medianHeight');
    });
  });

  describe('getCountryWithHighestWinRatio', () => {
    it('should identify country with highest win ratio', () => {
      const stats = statisticsService.calculateStatistics(mockPlayers);

      // USA: (5+3)/10 = 0.8, FRA: 2/5 = 0.4
      expect(stats.countryWithHighestWinRatio.country).toBe('USA');
      expect(stats.countryWithHighestWinRatio.winRatio).toBe(0.8);
    });
  });

  describe('calculateAverageBMI', () => {
    it('should calculate average BMI correctly', () => {
      const stats = statisticsService.calculateStatistics(mockPlayers);

      // BMIs: 24.69, 20.76, 21.91
      // Average: (24.69 + 20.76 + 21.91) / 3 = 22.45
      expect(stats.averageBMI).toBeCloseTo(22.45, 1);
    });

    it('should return 0 for empty player array', () => {
      const stats = statisticsService.calculateStatistics([]);
      expect(stats.averageBMI).toBe(0);
    });
  });

  describe('calculateMedianHeight', () => {
    it('should calculate median for odd number of players', () => {
      const stats = statisticsService.calculateStatistics(mockPlayers);

      // Heights: 170, 180, 185 -> median = 180
      expect(stats.medianHeight).toBe(180);
    });

    it('should calculate median for even number of players', () => {
      const evenPlayers = mockPlayers.slice(0, 2);
      const stats = statisticsService.calculateStatistics(evenPlayers);

      // Heights: 170, 180 -> median = (170 + 180) / 2 = 175
      expect(stats.medianHeight).toBe(175);
    });

    it('should return 0 for empty player array', () => {
      const stats = statisticsService.calculateStatistics([]);
      expect(stats.medianHeight).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle single player statistics', () => {
      const singlePlayer = [mockPlayers[0]];
      const stats = statisticsService.calculateStatistics(singlePlayer);

      expect(stats.averageBMI).toBeGreaterThan(0);
      expect(stats.medianHeight).toBe(180);
      expect(stats.countryWithHighestWinRatio.country).toBe('USA');
    });

    it('should handle players with no games played', () => {
      const noGamesPlayer: Player = {
        ...mockPlayers[0],
        data: { ...mockPlayers[0].data, last: [] },
      };
      const stats = statisticsService.calculateStatistics([noGamesPlayer]);

      expect(stats.countryWithHighestWinRatio.winRatio).toBe(0);
    });
  });
});

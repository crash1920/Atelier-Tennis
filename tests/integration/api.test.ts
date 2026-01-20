import request from 'supertest';
import app from '../../src/app';

describe('Tennis API Integration Tests', () => {
  describe('GET /', () => {
    it('should return API info', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Tennis Players API');
    });
  });

  describe('GET /api/players', () => {
    it('should return all players sorted by rank', async () => {
      const response = await request(app).get('/api/players');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.count).toBeGreaterThan(0);

      // Verify sorting by rank
      const { data: players } = response.body;
      for (let i = 0; i < players.length - 1; i += 1) {
        expect(players[i].data.rank).toBeLessThanOrEqual(players[i + 1].data.rank);
      }
    });
  });

  describe('GET /api/players/:id', () => {
    it('should return a player for valid ID', async () => {
      const response = await request(app).get('/api/players/52');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(52);
      expect(response.body.data.firstname).toBe('Novak');
    });

    it('should return 404 for non-existent ID', async () => {
      const response = await request(app).get('/api/players/99999');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Not Found');
    });

    it('should return 400 for invalid ID format', async () => {
      const response = await request(app).get('/api/players/abc');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid player ID format');
    });
  });

  describe('POST /api/players', () => {
    it('should create a new player with valid data', async () => {
      const newPlayer = {
        firstname: 'John',
        lastname: 'Doe',
        sex: 'M',
        country: {
          code: 'USA',
        },
        data: {
          rank: 100,
          points: 500,
          weight: 75000,
          height: 180,
          age: 28,
        },
      };

      const response = await request(app)
        .post('/api/players')
        .send(newPlayer);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.firstname).toBe('John');
      expect(response.body.data.id).toBeDefined();
    });

    it('should return 400 for missing required fields', async () => {
      const invalidPlayer = {
        firstname: 'John',
        // Missing lastname
        sex: 'M',
      };

      const response = await request(app)
        .post('/api/players')
        .send(invalidPlayer);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Validation failed');
    });

    it('should return 400 for invalid sex value', async () => {
      const invalidPlayer = {
        firstname: 'John',
        lastname: 'Doe',
        sex: 'X',
        country: { code: 'USA' },
        data: {
          rank: 100,
          points: 500,
          weight: 75000,
          height: 180,
          age: 28,
        },
      };

      const response = await request(app)
        .post('/api/players')
        .send(invalidPlayer);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/statistics', () => {
    it('should return statistics with correct structure', async () => {
      const response = await request(app).get('/api/statistics');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('countryWithHighestWinRatio');
      expect(response.body.data).toHaveProperty('averageBMI');
      expect(response.body.data).toHaveProperty('medianHeight');
    });

    it('should calculate statistics correctly', async () => {
      const response = await request(app).get('/api/statistics');

      const { data } = response.body;

      // Verify countryWithHighestWinRatio structure
      expect(data.countryWithHighestWinRatio).toHaveProperty('country');
      expect(data.countryWithHighestWinRatio).toHaveProperty('winRatio');
      expect(typeof data.countryWithHighestWinRatio.country).toBe('string');
      expect(typeof data.countryWithHighestWinRatio.winRatio).toBe('number');

      // Verify averageBMI is a positive number
      expect(typeof data.averageBMI).toBe('number');
      expect(data.averageBMI).toBeGreaterThan(0);

      // Verify medianHeight is a positive number
      expect(typeof data.medianHeight).toBe('number');
      expect(data.medianHeight).toBeGreaterThan(0);
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/api/unknown');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('not found');
    });
  });
});

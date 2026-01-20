import * as fs from 'fs';
import * as path from 'path';
import { Player, PlayersData, CreatePlayerDTO } from '../models/player.model';

class PlayerService {
  private players: Player[] = [];

  private nextId: number = 1;

  constructor() {
    this.loadPlayers();
  }

  private loadPlayers(): void {
    const dataPath = path.join(__dirname, '../data/headtohead.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data: PlayersData = JSON.parse(rawData);
    this.players = data.players;

    // Set nextId to be higher than the highest existing ID
    if (this.players.length > 0) {
      const maxId = Math.max(...this.players.map((p) => p.id));
      this.nextId = maxId + 1;
    }
  }

  getAllPlayers(): Player[] {
    // Sort players by rank (ascending - lower rank is better)
    return [...this.players].sort((a, b) => a.data.rank - b.data.rank);
  }

  getPlayerById(id: number): Player | null {
    const player = this.players.find((p) => p.id === id);
    return player || null;
  }

  createPlayer(playerData: CreatePlayerDTO): Player {
    // Validate required fields
    this.validatePlayerData(playerData);

    // Create new player with generated ID
    const newPlayer: Player = {
      id: this.nextId,
      firstname: playerData.firstname,
      lastname: playerData.lastname,
      shortname: playerData.shortname || `${playerData.firstname.charAt(0)}.${playerData.lastname.substring(0, 3).toUpperCase()}`,
      sex: playerData.sex,
      country: {
        code: playerData.country.code,
        picture: playerData.country.picture || `https://tenisu.latelier.co/resources/${playerData.country.code}.png`,
      },
      picture: playerData.picture || '',
      data: {
        rank: playerData.data.rank,
        points: playerData.data.points,
        weight: playerData.data.weight,
        height: playerData.data.height,
        age: playerData.data.age,
        last: playerData.data.last || [],
      },
    };

    this.players.push(newPlayer);
    this.nextId += 1;

    return newPlayer;
  }

  private validatePlayerData(playerData: CreatePlayerDTO): void {
    const errors: string[] = [];

    if (!playerData.firstname || playerData.firstname.trim() === '') {
      errors.push('firstname is required');
    }

    if (!playerData.lastname || playerData.lastname.trim() === '') {
      errors.push('lastname is required');
    }

    if (!playerData.sex || !['M', 'F'].includes(playerData.sex)) {
      errors.push('sex must be either M or F');
    }

    if (!playerData.country || !playerData.country.code) {
      errors.push('country.code is required');
    }

    if (!playerData.data) {
      errors.push('data is required');
    } else {
      if (typeof playerData.data.rank !== 'number' || playerData.data.rank < 1) {
        errors.push('data.rank must be a positive number');
      }

      if (typeof playerData.data.points !== 'number' || playerData.data.points < 0) {
        errors.push('data.points must be a non-negative number');
      }

      if (typeof playerData.data.weight !== 'number' || playerData.data.weight <= 0) {
        errors.push('data.weight must be a positive number (in grams)');
      }

      if (typeof playerData.data.height !== 'number' || playerData.data.height <= 0) {
        errors.push('data.height must be a positive number (in cm)');
      }

      if (typeof playerData.data.age !== 'number' || playerData.data.age < 1) {
        errors.push('data.age must be a positive number');
      }
    }

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
  }

  getPlayers(): Player[] {
    return this.players;
  }
}

// Export singleton instance
export const playerService = new PlayerService();

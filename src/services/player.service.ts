import * as fs from 'fs';
import * as path from 'path';
import { Player, PlayersData } from '../models/player.model';
import { CreatePlayerDTO } from '../schemas/player.schema';

class PlayerService {
  private players: Player[] = [];

  private nextId: number = 1;

  private dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../data/headtohead.json');
    this.loadPlayers();
  }

  private loadPlayers(): void {
    const rawData = fs.readFileSync(this.dataPath, 'utf-8');
    const data: PlayersData = JSON.parse(rawData);
    this.players = data.players;

    // Set nextId to be higher than the highest existing ID
    if (this.players.length > 0) {
      const maxId = Math.max(...this.players.map((p) => p.id));
      this.nextId = maxId + 1;
    }
  }

  private saveToFile(): void {
    const data: PlayersData = {
      players: this.players,
    };
    fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2), 'utf-8');
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
    // Check for duplicate player
    const existingPlayer = this.players.find(
      (p) => p.firstname.toLowerCase() === playerData.firstname.toLowerCase() &&
        p.lastname.toLowerCase() === playerData.lastname.toLowerCase()
    );

    if (existingPlayer) {
      throw new Error(`Player ${playerData.firstname} ${playerData.lastname} already exists with ID ${existingPlayer.id}`);
    }

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

    // Save to file after adding the player
    this.saveToFile();

    return newPlayer;
  }

  getPlayers(): Player[] {
    return this.players;
  }
}

// Export singleton instance
export const playerService = new PlayerService();

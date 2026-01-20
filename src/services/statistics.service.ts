import { Player, Statistics } from '../models/player.model';

export class StatisticsService {
  calculateStatistics(players: Player[]): Statistics {
    return {
      countryWithHighestWinRatio: this.getCountryWithHighestWinRatio(players),
      averageBMI: this.calculateAverageBMI(players),
      medianHeight: this.calculateMedianHeight(players),
    };
  }

  private getCountryWithHighestWinRatio(players: Player[]): { country: string; winRatio: number } {
    const countryStats = new Map<string, { wins: number; total: number }>();

    players.forEach((player) => {
      const countryCode = player.country.code;
      const stats = countryStats.get(countryCode) || { wins: 0, total: 0 };

      player.data.last.forEach((result) => {
        stats.total += 1;
        stats.wins += result;
      });

      countryStats.set(countryCode, stats);
    });

    let highestRatio = 0;
    let topCountry = '';

    countryStats.forEach((stats, country) => {
      if (stats.total > 0) {
        const ratio = stats.wins / stats.total;
        if (ratio > highestRatio) {
          highestRatio = ratio;
          topCountry = country;
        }
      }
    });

    return {
      country: topCountry,
      winRatio: Math.round(highestRatio * 10000) / 10000, // Round to 4 decimal places
    };
  }

  private calculateAverageBMI(players: Player[]): number {
    if (players.length === 0) return 0;

    const totalBMI = players.reduce((sum, player) => {
      const bmi = this.calculateBMI(player.data.weight, player.data.height);
      return sum + bmi;
    }, 0);

    return Math.round((totalBMI / players.length) * 100) / 100; // Round to 2 decimal places
  }

  private calculateBMI(weightInGrams: number, heightInCm: number): number {
    const weightInKg = weightInGrams / 1000;
    const heightInM = heightInCm / 100;
    return weightInKg / (heightInM * heightInM);
  }

  private calculateMedianHeight(players: Player[]): number {
    if (players.length === 0) return 0;

    const heights = players.map((p) => p.data.height).sort((a, b) => a - b);
    const mid = Math.floor(heights.length / 2);

    if (heights.length % 2 === 0) {
      // Even number of players - average of two middle values
      return (heights[mid - 1] + heights[mid]) / 2;
    }

    // Odd number of players - middle value
    return heights[mid];
  }
}

export const statisticsService = new StatisticsService();

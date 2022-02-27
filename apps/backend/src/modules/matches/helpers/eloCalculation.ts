import { PlayerRanking } from 'src/modules/matches/models/MatchCreateSingleInput.model';

import { TeamRanking } from '../models/MatchCreateTeamInput.model';

export interface PlayerRankingWithElo extends PlayerRanking {
  elo: number;
}

export interface TeamRankingWithElo extends TeamRanking {
  avgElo: number;
}

// https://de.wikipedia.org/wiki/Elo-Zahl#Anpassung_der_Elo-Zahl
export enum Result {
  WIN = 1,
  DEUCE = 0.5,
  LOSS = 0,
}

export const k = 40;

// https://de.wikipedia.org/wiki/Elo-Zahl#Anpassung_der_Elo-Zahl
export const eloDelta = (k: 40 | 20 | 10, result: Result, expectedScore: number) =>
  Math.round(k * (result - expectedScore));

// https://de.wikipedia.org/wiki/Elo-Zahl#Erwartungswert
export const calculateExpectedScores = (elo1: number, elo2: number) => {
  const e1 = 1 / (1 + 10 ** ((elo2 - elo1) / 400));

  return { e1, e2: 1 - e1 };
};

export const buildTuples = <T extends { rank: number }>(rankings: T[]) => {
  if (rankings.length < 2) {
    throw new Error('Amount has to be bigger than 2');
  }

  let tuples: T[][] = [];

  for (let i = 0; i < rankings.length; i += 1) {
    for (let j = i + 1; j < rankings.length; j += 1) {
      const orderedTuple = [rankings[i], rankings[j]].sort((a, b) => a.rank - b.rank);
      tuples = [...tuples, orderedTuple];
    }
  }

  return tuples;
};

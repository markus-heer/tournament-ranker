import { PrismaClient } from '@prisma/client';

import { games } from './data/games';
import { matches } from './data/matches';
import { players } from './data/players';

export async function seedDb(prisma: PrismaClient): Promise<void> {
  await Promise.all(games.map(async (game) => prisma.game.create(game)));
  await Promise.all(players.map(async (player) => prisma.player.create(player)));
  await Promise.all(matches.map(async (match) => prisma.match.create(match)));
}

export async function clearDb(prisma: PrismaClient): Promise<void> {
  await prisma.matchRanking.deleteMany({});
  await prisma.match.deleteMany({});
  await prisma.player.deleteMany({});
  await prisma.game.deleteMany({});
}

import { PrismaClient } from '@prisma/client';

import { games } from './data/games';
import { players } from './data/players';

export async function seedDb(prisma: PrismaClient): Promise<void> {
  await Promise.all(games.map(async (game) => prisma.game.create(game)));
  await Promise.all(players.map(async (player) => prisma.player.create(player)));
}

export async function clearDb(prisma: PrismaClient): Promise<void> {
  await prisma.match.deleteMany({});
  await prisma.player.deleteMany({});
  await prisma.game.deleteMany({});
}

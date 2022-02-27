import { GameType, Prisma } from '@prisma/client';

export const games: Prisma.GameCreateArgs[] = [
  {
    data: {
      id: 'dart301',
      name: 'Dart 301',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      id: 'kicker',
      name: 'Kicker',
      gameType: GameType.TEAM,
    },
  },
];

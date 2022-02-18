import { GameType, Prisma } from '@prisma/client';

export const games: Prisma.GameCreateArgs[] = [
  {
    data: {
      name: 'Dart 301',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Schach',
      gameType: GameType.SINGLE,
    },
  },
];

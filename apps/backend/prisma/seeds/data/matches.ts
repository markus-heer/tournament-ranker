import { Prisma } from '@prisma/client';

export const matches: Prisma.MatchCreateArgs[] = [
  {
    data: {
      game: {
        connect: {
          name: 'Dart 301',
        },
      },
      matchResults: {
        createMany: {
          data: [
            {
              playerId: 'Peter',
              rank: 1,
              eloChange: 36,
            },
            {
              playerId: 'Marco',
              rank: 2,
              eloChange: -48,
            },
          ],
        },
      },
    },
  },
];

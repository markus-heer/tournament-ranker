import { Prisma } from '@prisma/client';

export const players: Prisma.PlayerCreateArgs[] = [
  'Basti',
  'Peter',
  'Oli',
  'Bobo',
  'Andi',
  'Markus',
  'Simon',
  'Marco',
  'Uli',
].map((name) => ({
  data: {
    id: name,
    name,
  },
}));

import { Prisma } from '@prisma/client';

export const players: Prisma.PlayerCreateArgs[] = [
  'Markus',
  'Angelos',
  'Bryan',
  'Eliza',
  'Jakob',
  'Gonzo',
  'Prakriti',
  'Richard',
  'Simon',
  'Sauti',
  'Tobi',
  'Ulrich',
  'Zarah',
].map((name) => ({
  data: {
    id: name,
    name,
  },
}));

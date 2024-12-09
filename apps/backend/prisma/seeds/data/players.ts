import { Prisma } from '@prisma/client';

export const players: Prisma.PlayerCreateArgs[] = [
  'Markus',
  'Angelos',
  'Basti',
  'Bryan',
  'Carla',
  'Eliza',
  'Jakob',
  'Max',
  'Paul',
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

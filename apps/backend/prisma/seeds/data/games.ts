import { GameType, Prisma } from '@prisma/client';

export const games: Prisma.GameCreateArgs[] = [
  {
    data: {
      name: 'Katzenquartett',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Super Six',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Slingshot Hockey',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Singstar',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Kicker',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Kicker',
      gameType: GameType.TEAM,
    },
  },
  {
    data: {
      name: 'Cornhole',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: '301 (Dart)',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Black Jack',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Hüpf mein Hütchen',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Bezzerwizzer',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Eigene Challenge',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Eigene Challenge',
      gameType: GameType.TEAM,
    },
  },
];

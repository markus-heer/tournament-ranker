import { GameType, Prisma } from '@prisma/client';

export const games: Prisma.GameCreateArgs[] = [
  {
    data: {
      name: '301 (Dart)',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Shanghai (Dart)',
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
      name: 'Tischtennis',
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
      name: 'Mario Party',
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
      name: 'Katzenquartett',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Unreal Tournament',
      gameType: GameType.SINGLE,
    },
  },
  {
    data: {
      name: 'Mucho Party',
      gameType: GameType.SINGLE,
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
      name: 'Cornhole',
      gameType: GameType.TEAM,
    },
  },
];

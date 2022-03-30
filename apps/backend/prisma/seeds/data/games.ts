import { GameType, Prisma } from '@prisma/client';

export const games: Prisma.GameCreateArgs[] = [
  {
    data: {
      name: 'Wikingerschach',
      gameType: GameType.TEAM,
    },
  },
  {
    data: {
      name: 'Dart 301',
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
      name: 'Reaktor',
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

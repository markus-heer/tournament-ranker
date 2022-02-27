/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: string;
};

export type GqlEloInfo = {
  __typename?: 'EloInfo';
  eloChange: Scalars['Float'];
  player: GqlPlayer;
  rank: Scalars['Float'];
};

export type GqlGame = {
  __typename?: 'Game';
  gameType: GqlGameType;
  id: Scalars['ID'];
  name: Scalars['String'];
  numberOfMatches: Scalars['Float'];
};

export type GqlGameCreateInput = {
  gameType: GqlGameType;
  name: Scalars['String'];
};

export enum GqlGameType {
  Single = 'SINGLE',
  Team = 'TEAM',
}

export type GqlMatch = {
  __typename?: 'Match';
  createdAt: Scalars['DateTime'];
  eloInfo: Array<GqlEloInfo>;
  game: GqlGame;
  id: Scalars['ID'];
  matchResults: Array<GqlMatchResult>;
};

export type GqlMatchCreateSingleInput = {
  gameId: Scalars['String'];
  playerRankings: Array<GqlPlayerRanking>;
};

export type GqlMatchCreateTeamInput = {
  gameId: Scalars['String'];
  teamRankings: Array<GqlTeamRanking>;
};

export type GqlMatchResult = {
  __typename?: 'MatchResult';
  eloChange: Scalars['Float'];
  id: Scalars['ID'];
  match: GqlMatch;
  player: GqlPlayer;
  rank: Scalars['Float'];
};

export type GqlMutation = {
  __typename?: 'Mutation';
  createGame: GqlGame;
  createPlayer: GqlPlayer;
  createSingleMatch: GqlMatch;
  createTeamMatch: GqlMatch;
  deleteGame: GqlGame;
  deleteMatch: GqlMatch;
  deletePlayer: GqlPlayer;
};

export type GqlMutationCreateGameArgs = {
  data: GqlGameCreateInput;
};

export type GqlMutationCreatePlayerArgs = {
  data: GqlPlayerCreateInput;
};

export type GqlMutationCreateSingleMatchArgs = {
  data: GqlMatchCreateSingleInput;
};

export type GqlMutationCreateTeamMatchArgs = {
  data: GqlMatchCreateTeamInput;
};

export type GqlMutationDeleteGameArgs = {
  id: Scalars['ID'];
};

export type GqlMutationDeleteMatchArgs = {
  id: Scalars['ID'];
};

export type GqlMutationDeletePlayerArgs = {
  id: Scalars['ID'];
};

export type GqlPlayer = {
  __typename?: 'Player';
  elo: Scalars['Float'];
  id: Scalars['ID'];
  name: Scalars['String'];
  numberOfMatches: Scalars['Float'];
};

export type GqlPlayerCreateInput = {
  name: Scalars['String'];
};

export type GqlPlayerRanking = {
  playerId: Scalars['ID'];
  rank: Scalars['Float'];
};

export type GqlQuery = {
  __typename?: 'Query';
  games: Array<GqlGame>;
  matchResults: Array<GqlMatchResult>;
  matches: Array<GqlMatch>;
  players: Array<GqlPlayer>;
};

export type GqlTeamRanking = {
  playerIds: Array<Scalars['ID']>;
  rank: Scalars['Float'];
};

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
};

export type GqlEloInfo = {
  __typename?: 'EloInfo';
  eloChange: Scalars['Float'];
  player: GqlPlayer;
};

export type GqlGame = {
  __typename?: 'Game';
  gameType: GqlGameType;
  id: Scalars['ID'];
  name: Scalars['String'];
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
  eloInfo: Array<GqlEloInfo>;
  game: GqlGame;
  id: Scalars['ID'];
  matchResults: Array<GqlMatchResult>;
};

export type GqlMatchCreateInput = {
  gameId: Scalars['String'];
  playerRankings: Array<GqlPlayerRanking>;
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
  createMatch: GqlMatch;
  createPlayer: GqlPlayer;
  deleteGame: GqlGame;
  deleteMatch: GqlMatch;
  deletePlayer: GqlPlayer;
};

export type GqlMutationCreateGameArgs = {
  data: GqlGameCreateInput;
};

export type GqlMutationCreateMatchArgs = {
  data: GqlMatchCreateInput;
};

export type GqlMutationCreatePlayerArgs = {
  data: GqlPlayerCreateInput;
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

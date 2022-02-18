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

export type GqlDesk = {
  __typename?: 'Desk';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type GqlDeskCreateInput = {
  name: Scalars['String'];
  roomId: Scalars['ID'];
};

export type GqlDeskUpdateInput = {
  name: Scalars['String'];
  roomId: Scalars['ID'];
};

export type GqlMutation = {
  __typename?: 'Mutation';
  createDesk: GqlDesk;
  createOffice: GqlOffice;
  createRoom: GqlRoom;
  deleteDesk: GqlDesk;
  deleteOffice: GqlOffice;
  deleteRoom: GqlRoom;
  updateDesk: GqlDesk;
  updateOffice: GqlOffice;
  updateRoom: GqlRoom;
};

export type GqlMutationCreateDeskArgs = {
  data: GqlDeskCreateInput;
};

export type GqlMutationCreateOfficeArgs = {
  data: GqlOfficeCreateInput;
};

export type GqlMutationCreateRoomArgs = {
  data: GqlRoomCreateInput;
};

export type GqlMutationDeleteDeskArgs = {
  id: Scalars['ID'];
};

export type GqlMutationDeleteOfficeArgs = {
  id: Scalars['ID'];
};

export type GqlMutationDeleteRoomArgs = {
  id: Scalars['ID'];
};

export type GqlMutationUpdateDeskArgs = {
  data: GqlDeskUpdateInput;
  id: Scalars['ID'];
};

export type GqlMutationUpdateOfficeArgs = {
  data: GqlOfficeUpdateInput;
  id: Scalars['ID'];
};

export type GqlMutationUpdateRoomArgs = {
  data: GqlRoomUpdateInput;
  id: Scalars['ID'];
};

export type GqlOffice = {
  __typename?: 'Office';
  id: Scalars['ID'];
  name: Scalars['String'];
  rooms: Array<GqlRoom>;
};

export type GqlOfficeCreateInput = {
  name: Scalars['String'];
};

export type GqlOfficeUpdateInput = {
  name: Scalars['String'];
};

export type GqlQuery = {
  __typename?: 'Query';
  desks: Array<GqlDesk>;
  offices: Array<GqlOffice>;
  rooms: Array<GqlRoom>;
};

export type GqlQueryDesksArgs = {
  roomId: Scalars['ID'];
};

export type GqlQueryRoomsArgs = {
  officeId: Scalars['ID'];
};

export type GqlRoom = {
  __typename?: 'Room';
  desks: Array<GqlDesk>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type GqlRoomCreateInput = {
  name: Scalars['String'];
  officeId: Scalars['ID'];
};

export type GqlRoomUpdateInput = {
  name: Scalars['String'];
  officeId: Scalars['ID'];
};

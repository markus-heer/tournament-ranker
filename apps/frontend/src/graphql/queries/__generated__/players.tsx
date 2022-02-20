/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullPlayerFragmentDoc } from '../../fragments/__generated__/fullPlayer';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlPlayersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GqlPlayersQuery = {
  __typename?: 'Query';
  players: Array<{ __typename?: 'Player'; id: string; name: string; elo: number }>;
};

export const PlayersDocument = gql`
  query players {
    players {
      ...fullPlayer
    }
  }
  ${FullPlayerFragmentDoc}
`;

/**
 * __usePlayersQuery__
 *
 * To run a query within a React component, call `usePlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayersQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlayersQuery(
  baseOptions?: Apollo.QueryHookOptions<GqlPlayersQuery, GqlPlayersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GqlPlayersQuery, GqlPlayersQueryVariables>(PlayersDocument, options);
}
export function usePlayersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GqlPlayersQuery, GqlPlayersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GqlPlayersQuery, GqlPlayersQueryVariables>(PlayersDocument, options);
}
export type PlayersQueryHookResult = ReturnType<typeof usePlayersQuery>;
export type PlayersLazyQueryHookResult = ReturnType<typeof usePlayersLazyQuery>;
export type PlayersQueryResult = Apollo.QueryResult<GqlPlayersQuery, GqlPlayersQueryVariables>;

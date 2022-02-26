/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullGameFragmentDoc } from '../../fragments/__generated__/fullGame';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlGamesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GqlGamesQuery = {
  __typename?: 'Query';
  games: Array<{
    __typename?: 'Game';
    id: string;
    name: string;
    gameType: Types.GqlGameType;
    numberOfMatches: number;
  }>;
};

export const GamesDocument = gql`
  query games {
    games {
      ...fullGame
    }
  }
  ${FullGameFragmentDoc}
`;

/**
 * __useGamesQuery__
 *
 * To run a query within a React component, call `useGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGamesQuery(
  baseOptions?: Apollo.QueryHookOptions<GqlGamesQuery, GqlGamesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GqlGamesQuery, GqlGamesQueryVariables>(GamesDocument, options);
}
export function useGamesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GqlGamesQuery, GqlGamesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GqlGamesQuery, GqlGamesQueryVariables>(GamesDocument, options);
}
export type GamesQueryHookResult = ReturnType<typeof useGamesQuery>;
export type GamesLazyQueryHookResult = ReturnType<typeof useGamesLazyQuery>;
export type GamesQueryResult = Apollo.QueryResult<GqlGamesQuery, GqlGamesQueryVariables>;

/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullMatchFragmentDoc } from '../../fragments/__generated__/fullMatch';
import { FullGameFragmentDoc } from '../../fragments/__generated__/fullGame';
import { FullEloInfoFragmentDoc } from '../../fragments/__generated__/fullEloInfo';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlMatchesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GqlMatchesQuery = {
  __typename?: 'Query';
  matches: Array<{
    __typename?: 'Match';
    id: string;
    createdAt: string;
    game: { __typename?: 'Game'; id: string; name: string; numberOfMatches: number };
    eloInfo: Array<{
      __typename?: 'EloInfo';
      rank: number;
      eloChange: number;
      player: { __typename?: 'Player'; id: string; name: string };
    }>;
  }>;
};

export const MatchesDocument = gql`
  query matches {
    matches {
      ...fullMatch
      game {
        ...fullGame
      }
      eloInfo {
        ...fullEloInfo
      }
    }
  }
  ${FullMatchFragmentDoc}
  ${FullGameFragmentDoc}
  ${FullEloInfoFragmentDoc}
`;

/**
 * __useMatchesQuery__
 *
 * To run a query within a React component, call `useMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMatchesQuery(
  baseOptions?: Apollo.QueryHookOptions<GqlMatchesQuery, GqlMatchesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GqlMatchesQuery, GqlMatchesQueryVariables>(MatchesDocument, options);
}
export function useMatchesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GqlMatchesQuery, GqlMatchesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GqlMatchesQuery, GqlMatchesQueryVariables>(MatchesDocument, options);
}
export type MatchesQueryHookResult = ReturnType<typeof useMatchesQuery>;
export type MatchesLazyQueryHookResult = ReturnType<typeof useMatchesLazyQuery>;
export type MatchesQueryResult = Apollo.QueryResult<GqlMatchesQuery, GqlMatchesQueryVariables>;

/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullOfficeFragmentDoc } from '../../fragments/__generated__/fullOffice';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlOfficesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GqlOfficesQuery = {
  __typename?: 'Query';
  offices: Array<{ __typename?: 'Office'; id: string; name: string }>;
};

export const OfficesDocument = gql`
  query offices {
    offices {
      ...fullOffice
    }
  }
  ${FullOfficeFragmentDoc}
`;

/**
 * __useOfficesQuery__
 *
 * To run a query within a React component, call `useOfficesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOfficesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOfficesQuery({
 *   variables: {
 *   },
 * });
 */
export function useOfficesQuery(
  baseOptions?: Apollo.QueryHookOptions<GqlOfficesQuery, GqlOfficesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GqlOfficesQuery, GqlOfficesQueryVariables>(OfficesDocument, options);
}
export function useOfficesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GqlOfficesQuery, GqlOfficesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GqlOfficesQuery, GqlOfficesQueryVariables>(OfficesDocument, options);
}
export type OfficesQueryHookResult = ReturnType<typeof useOfficesQuery>;
export type OfficesLazyQueryHookResult = ReturnType<typeof useOfficesLazyQuery>;
export type OfficesQueryResult = Apollo.QueryResult<GqlOfficesQuery, GqlOfficesQueryVariables>;

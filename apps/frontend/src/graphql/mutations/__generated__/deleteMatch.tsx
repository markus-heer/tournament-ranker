/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullMatchFragmentDoc } from '../../fragments/__generated__/fullMatch';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlDeleteMatchMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type GqlDeleteMatchMutation = {
  __typename?: 'Mutation';
  deleteMatch: { __typename?: 'Match'; id: string; createdAt: string };
};

export const DeleteMatchDocument = gql`
  mutation deleteMatch($id: ID!) {
    deleteMatch(id: $id) {
      ...fullMatch
    }
  }
  ${FullMatchFragmentDoc}
`;
export type GqlDeleteMatchMutationFn = Apollo.MutationFunction<
  GqlDeleteMatchMutation,
  GqlDeleteMatchMutationVariables
>;

/**
 * __useDeleteMatchMutation__
 *
 * To run a mutation, you first call `useDeleteMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMatchMutation, { data, loading, error }] = useDeleteMatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMatchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GqlDeleteMatchMutation,
    GqlDeleteMatchMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GqlDeleteMatchMutation, GqlDeleteMatchMutationVariables>(
    DeleteMatchDocument,
    options,
  );
}
export type DeleteMatchMutationHookResult = ReturnType<typeof useDeleteMatchMutation>;
export type DeleteMatchMutationResult = Apollo.MutationResult<GqlDeleteMatchMutation>;
export type DeleteMatchMutationOptions = Apollo.BaseMutationOptions<
  GqlDeleteMatchMutation,
  GqlDeleteMatchMutationVariables
>;

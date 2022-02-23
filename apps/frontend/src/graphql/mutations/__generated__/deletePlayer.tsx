/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlDeletePlayerMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type GqlDeletePlayerMutation = {
  __typename?: 'Mutation';
  deletePlayer: { __typename?: 'Player'; id: string };
};

export const DeletePlayerDocument = gql`
  mutation deletePlayer($id: ID!) {
    deletePlayer(id: $id) {
      id
    }
  }
`;
export type GqlDeletePlayerMutationFn = Apollo.MutationFunction<
  GqlDeletePlayerMutation,
  GqlDeletePlayerMutationVariables
>;

/**
 * __useDeletePlayerMutation__
 *
 * To run a mutation, you first call `useDeletePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlayerMutation, { data, loading, error }] = useDeletePlayerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePlayerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GqlDeletePlayerMutation,
    GqlDeletePlayerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GqlDeletePlayerMutation, GqlDeletePlayerMutationVariables>(
    DeletePlayerDocument,
    options,
  );
}
export type DeletePlayerMutationHookResult = ReturnType<typeof useDeletePlayerMutation>;
export type DeletePlayerMutationResult = Apollo.MutationResult<GqlDeletePlayerMutation>;
export type DeletePlayerMutationOptions = Apollo.BaseMutationOptions<
  GqlDeletePlayerMutation,
  GqlDeletePlayerMutationVariables
>;

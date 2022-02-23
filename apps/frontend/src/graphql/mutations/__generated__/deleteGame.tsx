/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlDeleteGameMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type GqlDeleteGameMutation = {
  __typename?: 'Mutation';
  deleteGame: { __typename?: 'Game'; id: string };
};

export const DeleteGameDocument = gql`
  mutation deleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
    }
  }
`;
export type GqlDeleteGameMutationFn = Apollo.MutationFunction<
  GqlDeleteGameMutation,
  GqlDeleteGameMutationVariables
>;

/**
 * __useDeleteGameMutation__
 *
 * To run a mutation, you first call `useDeleteGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGameMutation, { data, loading, error }] = useDeleteGameMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGameMutation(
  baseOptions?: Apollo.MutationHookOptions<GqlDeleteGameMutation, GqlDeleteGameMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GqlDeleteGameMutation, GqlDeleteGameMutationVariables>(
    DeleteGameDocument,
    options,
  );
}
export type DeleteGameMutationHookResult = ReturnType<typeof useDeleteGameMutation>;
export type DeleteGameMutationResult = Apollo.MutationResult<GqlDeleteGameMutation>;
export type DeleteGameMutationOptions = Apollo.BaseMutationOptions<
  GqlDeleteGameMutation,
  GqlDeleteGameMutationVariables
>;

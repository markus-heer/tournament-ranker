/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullPlayerFragmentDoc } from '../../fragments/__generated__/fullPlayer';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlCreatePlayerMutationVariables = Types.Exact<{
  data: Types.GqlPlayerCreateInput;
}>;

export type GqlCreatePlayerMutation = {
  __typename?: 'Mutation';
  createPlayer: {
    __typename?: 'Player';
    id: string;
    name: string;
    elo: number;
    numberOfMatches: number;
  };
};

export const CreatePlayerDocument = gql`
  mutation createPlayer($data: PlayerCreateInput!) {
    createPlayer(data: $data) {
      ...fullPlayer
    }
  }
  ${FullPlayerFragmentDoc}
`;
export type GqlCreatePlayerMutationFn = Apollo.MutationFunction<
  GqlCreatePlayerMutation,
  GqlCreatePlayerMutationVariables
>;

/**
 * __useCreatePlayerMutation__
 *
 * To run a mutation, you first call `useCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerMutation, { data, loading, error }] = useCreatePlayerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePlayerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GqlCreatePlayerMutation,
    GqlCreatePlayerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GqlCreatePlayerMutation, GqlCreatePlayerMutationVariables>(
    CreatePlayerDocument,
    options,
  );
}
export type CreatePlayerMutationHookResult = ReturnType<typeof useCreatePlayerMutation>;
export type CreatePlayerMutationResult = Apollo.MutationResult<GqlCreatePlayerMutation>;
export type CreatePlayerMutationOptions = Apollo.BaseMutationOptions<
  GqlCreatePlayerMutation,
  GqlCreatePlayerMutationVariables
>;

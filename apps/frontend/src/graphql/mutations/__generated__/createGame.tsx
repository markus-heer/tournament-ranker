/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullGameFragmentDoc } from '../../fragments/__generated__/fullGame';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlCreateGameMutationVariables = Types.Exact<{
  data: Types.GqlGameCreateInput;
}>;

export type GqlCreateGameMutation = {
  __typename?: 'Mutation';
  createGame: {
    __typename?: 'Game';
    id: string;
    name: string;
    gameType: Types.GqlGameType;
    numberOfMatches: number;
  };
};

export const CreateGameDocument = gql`
  mutation createGame($data: GameCreateInput!) {
    createGame(data: $data) {
      ...fullGame
    }
  }
  ${FullGameFragmentDoc}
`;
export type GqlCreateGameMutationFn = Apollo.MutationFunction<
  GqlCreateGameMutation,
  GqlCreateGameMutationVariables
>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGameMutation(
  baseOptions?: Apollo.MutationHookOptions<GqlCreateGameMutation, GqlCreateGameMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GqlCreateGameMutation, GqlCreateGameMutationVariables>(
    CreateGameDocument,
    options,
  );
}
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<GqlCreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<
  GqlCreateGameMutation,
  GqlCreateGameMutationVariables
>;

/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullMatchFragmentDoc } from '../../fragments/__generated__/fullMatch';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlCreateMatchMutationVariables = Types.Exact<{
  data: Types.GqlMatchCreateInput;
}>;

export type GqlCreateMatchMutation = {
  __typename?: 'Mutation';
  createMatch: { __typename?: 'Match'; id: string; createdAt: string };
};

export const CreateMatchDocument = gql`
  mutation createMatch($data: MatchCreateInput!) {
    createMatch(data: $data) {
      ...fullMatch
    }
  }
  ${FullMatchFragmentDoc}
`;
export type GqlCreateMatchMutationFn = Apollo.MutationFunction<
  GqlCreateMatchMutation,
  GqlCreateMatchMutationVariables
>;

/**
 * __useCreateMatchMutation__
 *
 * To run a mutation, you first call `useCreateMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMatchMutation, { data, loading, error }] = useCreateMatchMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMatchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GqlCreateMatchMutation,
    GqlCreateMatchMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GqlCreateMatchMutation, GqlCreateMatchMutationVariables>(
    CreateMatchDocument,
    options,
  );
}
export type CreateMatchMutationHookResult = ReturnType<typeof useCreateMatchMutation>;
export type CreateMatchMutationResult = Apollo.MutationResult<GqlCreateMatchMutation>;
export type CreateMatchMutationOptions = Apollo.BaseMutationOptions<
  GqlCreateMatchMutation,
  GqlCreateMatchMutationVariables
>;

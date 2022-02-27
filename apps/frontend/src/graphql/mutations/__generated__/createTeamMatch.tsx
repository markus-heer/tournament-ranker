/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullMatchFragmentDoc } from '../../fragments/__generated__/fullMatch';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlCreateTeamMatchMutationVariables = Types.Exact<{
  data: Types.GqlMatchCreateTeamInput;
}>;

export type GqlCreateTeamMatchMutation = {
  __typename?: 'Mutation';
  createTeamMatch: { __typename?: 'Match'; id: string; createdAt: string };
};

export const CreateTeamMatchDocument = gql`
  mutation createTeamMatch($data: MatchCreateTeamInput!) {
    createTeamMatch(data: $data) {
      ...fullMatch
    }
  }
  ${FullMatchFragmentDoc}
`;
export type GqlCreateTeamMatchMutationFn = Apollo.MutationFunction<
  GqlCreateTeamMatchMutation,
  GqlCreateTeamMatchMutationVariables
>;

/**
 * __useCreateTeamMatchMutation__
 *
 * To run a mutation, you first call `useCreateTeamMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMatchMutation, { data, loading, error }] = useCreateTeamMatchMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTeamMatchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GqlCreateTeamMatchMutation,
    GqlCreateTeamMatchMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GqlCreateTeamMatchMutation, GqlCreateTeamMatchMutationVariables>(
    CreateTeamMatchDocument,
    options,
  );
}
export type CreateTeamMatchMutationHookResult = ReturnType<typeof useCreateTeamMatchMutation>;
export type CreateTeamMatchMutationResult = Apollo.MutationResult<GqlCreateTeamMatchMutation>;
export type CreateTeamMatchMutationOptions = Apollo.BaseMutationOptions<
  GqlCreateTeamMatchMutation,
  GqlCreateTeamMatchMutationVariables
>;

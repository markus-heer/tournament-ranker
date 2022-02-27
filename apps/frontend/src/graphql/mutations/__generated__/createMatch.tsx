/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullMatchFragmentDoc } from '../../fragments/__generated__/fullMatch';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlCreateSingleMatchMutationVariables = Types.Exact<{
  data: Types.GqlMatchCreateSingleInput;
}>;

export type GqlCreateSingleMatchMutation = {
  __typename?: 'Mutation';
  createSingleMatch: { __typename?: 'Match'; id: string; createdAt: string };
};

export const CreateSingleMatchDocument = gql`
  mutation createSingleMatch($data: MatchCreateSingleInput!) {
    createSingleMatch(data: $data) {
      ...fullMatch
    }
  }
  ${FullMatchFragmentDoc}
`;
export type GqlCreateSingleMatchMutationFn = Apollo.MutationFunction<
  GqlCreateSingleMatchMutation,
  GqlCreateSingleMatchMutationVariables
>;

/**
 * __useCreateSingleMatchMutation__
 *
 * To run a mutation, you first call `useCreateSingleMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSingleMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSingleMatchMutation, { data, loading, error }] = useCreateSingleMatchMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSingleMatchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GqlCreateSingleMatchMutation,
    GqlCreateSingleMatchMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GqlCreateSingleMatchMutation, GqlCreateSingleMatchMutationVariables>(
    CreateSingleMatchDocument,
    options,
  );
}
export type CreateSingleMatchMutationHookResult = ReturnType<typeof useCreateSingleMatchMutation>;
export type CreateSingleMatchMutationResult = Apollo.MutationResult<GqlCreateSingleMatchMutation>;
export type CreateSingleMatchMutationOptions = Apollo.BaseMutationOptions<
  GqlCreateSingleMatchMutation,
  GqlCreateSingleMatchMutationVariables
>;

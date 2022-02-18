/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
import { FullOfficeFragmentDoc } from '../../fragments/__generated__/fullOffice';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GqlCreateOfficeMutationVariables = Types.Exact<{
  data: Types.GqlOfficeCreateInput;
}>;

export type GqlCreateOfficeMutation = {
  __typename?: 'Mutation';
  createOffice: { __typename?: 'Office'; id: string; name: string };
};

export const CreateOfficeDocument = gql`
  mutation createOffice($data: OfficeCreateInput!) {
    createOffice(data: $data) {
      ...fullOffice
    }
  }
  ${FullOfficeFragmentDoc}
`;
export type GqlCreateOfficeMutationFn = Apollo.MutationFunction<
  GqlCreateOfficeMutation,
  GqlCreateOfficeMutationVariables
>;

/**
 * __useCreateOfficeMutation__
 *
 * To run a mutation, you first call `useCreateOfficeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOfficeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOfficeMutation, { data, loading, error }] = useCreateOfficeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOfficeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GqlCreateOfficeMutation,
    GqlCreateOfficeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GqlCreateOfficeMutation, GqlCreateOfficeMutationVariables>(
    CreateOfficeDocument,
    options,
  );
}
export type CreateOfficeMutationHookResult = ReturnType<typeof useCreateOfficeMutation>;
export type CreateOfficeMutationResult = Apollo.MutationResult<GqlCreateOfficeMutation>;
export type CreateOfficeMutationOptions = Apollo.BaseMutationOptions<
  GqlCreateOfficeMutation,
  GqlCreateOfficeMutationVariables
>;

/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
export type GqlFullMatchFragment = { __typename?: 'Match'; id: string; createdAt: any };

export const FullMatchFragmentDoc = gql`
  fragment fullMatch on Match {
    id
    createdAt
  }
`;

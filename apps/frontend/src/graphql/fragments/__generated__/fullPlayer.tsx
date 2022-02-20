/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
export type GqlFullPlayerFragment = {
  __typename?: 'Player';
  id: string;
  name: string;
  elo: number;
};

export const FullPlayerFragmentDoc = gql`
  fragment fullPlayer on Player {
    id
    name
    elo
  }
`;

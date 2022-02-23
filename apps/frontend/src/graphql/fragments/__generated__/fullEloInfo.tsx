/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
export type GqlFullEloInfoFragment = {
  __typename?: 'EloInfo';
  eloChange: number;
  player: { __typename?: 'Player'; id: string; name: string };
};

export const FullEloInfoFragmentDoc = gql`
  fragment fullEloInfo on EloInfo {
    player {
      id
      name
    }
    eloChange
  }
`;

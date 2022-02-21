/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
export type GqlFullGameFragment = { __typename?: 'Game'; id: string; name: string };

export const FullGameFragmentDoc = gql`
  fragment fullGame on Game {
    id
    name
  }
`;

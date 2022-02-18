/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
export type GqlFullRoomFragment = { __typename?: 'Room'; id: string; name: string };

export const FullRoomFragmentDoc = gql`
  fragment fullRoom on Room {
    id
    name
  }
`;

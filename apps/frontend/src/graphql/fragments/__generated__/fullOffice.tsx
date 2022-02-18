/* eslint-disable */
import * as Types from '../../types';

import { gql } from '@apollo/client';
export type GqlFullOfficeFragment = { __typename?: 'Office'; id: string; name: string };

export const FullOfficeFragmentDoc = gql`
  fragment fullOffice on Office {
    id
    name
  }
`;

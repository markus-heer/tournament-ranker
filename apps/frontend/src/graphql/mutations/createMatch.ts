import { gql } from '@apollo/client';

import fullMatch from '../fragments/fullPlayer';

export default gql`
  mutation createMatch($data: MatchCreateInput!) {
    createMatch(data: $data) {
      ...fullMatch
    }
  }
  ${fullMatch}
`;

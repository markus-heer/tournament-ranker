import { gql } from '@apollo/client';

import fullMatch from '../fragments/fullPlayer';

export default gql`
  mutation createSingleMatch($data: MatchCreateSingleInput!) {
    createSingleMatch(data: $data) {
      ...fullMatch
    }
  }
  ${fullMatch}
`;

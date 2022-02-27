import { gql } from '@apollo/client';

import fullMatch from '../fragments/fullPlayer';

export default gql`
  mutation createTeamMatch($data: MatchCreateTeamInput!) {
    createTeamMatch(data: $data) {
      ...fullMatch
    }
  }
  ${fullMatch}
`;

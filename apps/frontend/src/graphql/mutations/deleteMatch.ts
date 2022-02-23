import { gql } from '@apollo/client';

import fullMatch from '../fragments/fullPlayer';

export default gql`
  mutation deleteMatch($id: ID!) {
    deleteMatch(id: $id) {
      ...fullMatch
    }
  }
  ${fullMatch}
`;

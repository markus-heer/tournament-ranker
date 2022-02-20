import { gql } from '@apollo/client';

import fullMatch from '../fragments/fullMatch';

export default gql`
  query matches {
    matches {
      ...fullMatch
    }
  }
  ${fullMatch}
`;

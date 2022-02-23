import { gql } from '@apollo/client';

import fullPlayer from '../fragments/fullPlayer';

export default gql`
  query players {
    players {
      ...fullPlayer
    }
    matches {
      id
    }
  }
  ${fullPlayer}
`;

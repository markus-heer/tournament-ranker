import { gql } from '@apollo/client';

import fullGame from '../fragments/fullGame';

export default gql`
  query games {
    games {
      ...fullGame
    }
  }
  ${fullGame}
`;

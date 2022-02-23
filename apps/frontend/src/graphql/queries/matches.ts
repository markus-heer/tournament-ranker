import { gql } from '@apollo/client';

import fullEloInfo from '../fragments/fullEloInfo';
import fullGame from '../fragments/fullGame';
import fullMatch from '../fragments/fullMatch';

export default gql`
  query matches {
    matches {
      ...fullMatch
      game {
        ...fullGame
      }
      eloInfo {
        ...fullEloInfo
      }
    }
  }
  ${fullMatch}
  ${fullGame}
  ${fullEloInfo}
`;

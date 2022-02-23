import { gql } from '@apollo/client';

import fullGame from '../fragments/fullGame';

export default gql`
  mutation createGame($data: GameCreateInput!) {
    createGame(data: $data) {
      ...fullGame
    }
  }
  ${fullGame}
`;

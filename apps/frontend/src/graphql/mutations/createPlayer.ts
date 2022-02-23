import { gql } from '@apollo/client';

import fullPlayer from '../fragments/fullPlayer';

export default gql`
  mutation createPlayer($data: PlayerCreateInput!) {
    createPlayer(data: $data) {
      ...fullPlayer
    }
  }
  ${fullPlayer}
`;

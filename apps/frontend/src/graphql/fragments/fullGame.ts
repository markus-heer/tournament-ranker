import { gql } from '@apollo/client';

export default gql`
  fragment fullGame on Game {
    id
    name
    gameType
    numberOfMatches
  }
`;

import { gql } from '@apollo/client';

export default gql`
  fragment fullEloInfo on EloInfo {
    player {
      id
      name
    }
    eloChange
  }
`;

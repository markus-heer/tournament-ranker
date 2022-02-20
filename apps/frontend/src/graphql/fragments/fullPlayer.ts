import { gql } from '@apollo/client';

export default gql`
  fragment fullPlayer on Player {
    id
    name
    elo
  }
`;

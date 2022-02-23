import { gql } from '@apollo/client';

export default gql`
  mutation deleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
    }
  }
`;

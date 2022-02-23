import { gql } from '@apollo/client';

export default gql`
  mutation deletePlayer($id: ID!) {
    deletePlayer(id: $id) {
      id
    }
  }
`;

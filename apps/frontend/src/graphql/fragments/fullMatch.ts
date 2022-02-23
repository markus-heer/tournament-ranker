import { gql } from '@apollo/client';

export default gql`
  fragment fullMatch on Match {
    id
    createdAt
  }
`;

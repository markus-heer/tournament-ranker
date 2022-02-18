import { gql } from '@apollo/client';

export default gql`
  fragment fullOffice on Office {
    id
    name
  }
`;

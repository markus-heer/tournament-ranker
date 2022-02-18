import { gql } from '@apollo/client';

import fullOffice from '../fragments/fullOffice';

export default gql`
  query offices {
    offices {
      ...fullOffice
    }
  }
  ${fullOffice}
`;

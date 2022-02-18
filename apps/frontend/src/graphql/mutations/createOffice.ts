import { gql } from '@apollo/client';

import fullOffice from '../fragments/fullOffice';

export default gql`
  mutation createOffice($data: OfficeCreateInput!) {
    createOffice(data: $data) {
      ...fullOffice
    }
  }
  ${fullOffice}
`;

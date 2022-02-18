import { ApolloProvider } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';

import { apolloClient } from './graphql/apolloClient';
import { useCreateOfficeMutation } from './graphql/mutations/__generated__/createOffice';
import { useOfficesQuery } from './graphql/queries/__generated__/offices';

const Frame = styled.div<{ color: string }>`
  ${({ color }: { color: string }) => `border: 1px solid ${color}`};
  padding: 4px;
  margin: 4px;
`;

const Component: React.VFC = () => {
  const { data, error, loading, refetch } = useOfficesQuery();
  const [
    createOffice /*, { data: mutationData, loading: mutationLoading, error: mutationError } */,
  ] = useCreateOfficeMutation();

  const onClick = async () => {
    await createOffice({ variables: { data: { name: 'kjhasd 3' } } });
    refetch();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Fehler!</div>;
  }

  return (
    <Frame color="#00ff00">
      {JSON.stringify(data?.offices)}
      <button onClick={onClick}>Create Office</button>
    </Frame>
  );
};

const App: React.VFC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component />
    </ApolloProvider>
  );
};

export default App;

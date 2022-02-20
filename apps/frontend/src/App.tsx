import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { apolloClient } from './graphql/apolloClient';
import { Leaderboard } from './pages/Leaderboard/Leaderboard';

const App: React.VFC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Leaderboard />}></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;

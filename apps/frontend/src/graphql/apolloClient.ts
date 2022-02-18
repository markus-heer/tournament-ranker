import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

import possibleTypes from './fragmentTypes.json';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(possibleTypes),
});

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache,HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink( ),
    uri: process.env.REACT_APP_GRAPHQL_URL,
    cache: new InMemoryCache(),
  });

createRoot(document.getElementById('root')).render(<ApolloProvider client={client}><App /></ApolloProvider> );

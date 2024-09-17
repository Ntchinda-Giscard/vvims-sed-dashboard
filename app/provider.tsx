"use client"
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import { persistor, store } from '@/app/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import '@mantine/nprogress/styles.css';
import { NavigationProgress } from '@mantine/nprogress';
// import { client_hasura } from './apollo/client_hasura';
import {Notifications} from "@mantine/notifications";
import {Toaster} from "react-hot-toast"
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from '@apollo/client/utilities';
import { useEffect, useState } from 'react';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {

const adminSecret = "cBUCi2wfVzpC5j16ede1stHx4nEajfTnWk0V43TRz3gVk0tGrXQ5VcILCqRJ0dkt";
const [token, setToken ] = useState(null)
useEffect(() =>{
  const tokenLocal = window.localStorage.getItem('token')
  //@ts-ignore
  setToken(tokenLocal)
},[])

const httpLink = new HttpLink({
  uri: 'https://faithful-lynx-39.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': adminSecret, // Add the admin secret in the header
    Authorization: `Bearer ${token}`
  }
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://faithful-lynx-39.hasura.app/v1/graphql',
  connectionParams: {
    headers: {
      'x-hasura-admin-secret': adminSecret, // Add the admin secret for websocket connections too
      Authorization: `Bearer ${token}`
    }
  }
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client_hasura = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
  

//   const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('token'); // Read the token from localStorage
//     const adminSecret = 'cBUCi2wfVzpC5j16ede1stHx4nEajfTnWk0V43TRz3gVk0tGrXQ5VcILCqRJ0dkt'; // Replace with your Hasura Admin Secret
    
//     return {
//       headers: {
//         ...headers,
//         authorization: `Bearer ${token}`, // Add the Authorization token
//         'x-hasura-admin-secret': adminSecret, // Add the Hasura Admin Secret
//         connectionParams: {
//           headers: {
//             'Authorization': `Bearer ${token}`
//            }
//          }
//       }
//     };
//   });
//   const hasura_client = new ApolloClient({
//   link: authLink.concat(splitLink),
//   cache: new InMemoryCache(),
// });
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
      <MantineProvider>
      <ApolloProvider client={client_hasura}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        
          <Toaster />
            <NavigationProgress />
            {children}
        </PersistGate>
      </Provider>
      </ApolloProvider>
      </MantineProvider>
      </body>
    </html>
  );
}
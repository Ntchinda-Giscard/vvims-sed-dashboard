"use client"
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { hf_client } from './apollo/client_hf';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { persistor, store } from '@/app/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { splitLink } from './apollo/client_hasura';
import {setContext} from "@apollo/client/link/context";


export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem('token')
  console.log("Token ===>", token)
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token'); // Read the token from localStorage
    const adminSecret = 'cBUCi2wfVzpC5j16ede1stHx4nEajfTnWk0V43TRz3gVk0tGrXQ5VcILCqRJ0dkt'; // Replace with your Hasura Admin Secret
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "", // Add the Authorization token
        'x-hasura-admin-secret': adminSecret, // Add the Hasura Admin Secret
      }
    };
  });
  const hasura_client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
  // headers:{
  //   "x-hasura-admin-secret" : "cBUCi2wfVzpC5j16ede1stHx4nEajfTnWk0V43TRz3gVk0tGrXQ5VcILCqRJ0dkt",
  //   "authorization" : token ? `Bearer ${token}` : ""
  // }
});
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
      <ApolloProvider client={hasura_client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <MantineProvider>
          {children}
        </MantineProvider>
        </PersistGate>
      </Provider>
      </ApolloProvider>
      </body>
    </html>
  );
}
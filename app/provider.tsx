"use client"
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { hf_client } from './apollo/client_hf';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { persistor, store } from '@/app/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import {setContext} from "@apollo/client/link/context";
import '@mantine/nprogress/styles.css';
import { NavigationProgress } from '@mantine/nprogress';
import { WebSocketLink } from "@apollo/client/link/ws";
import { client_hasura } from './apollo/client_hasura';




export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  

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
      <ApolloProvider client={client_hasura}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <MantineProvider>
        <NavigationProgress />
          {children}
        </MantineProvider>
        </PersistGate>
      </Provider>
      </ApolloProvider>
      </body>
    </html>
  );
}
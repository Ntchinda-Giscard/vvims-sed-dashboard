"use client"
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { hf_client } from './apollo/client_hf';
import { ApolloProvider } from '@apollo/client';
import { store } from '@/store';
import { Provider } from 'react-redux'



export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
      <ApolloProvider client={hf_client}>
      <Provider store={store}>
        <MantineProvider>
          {children}
        </MantineProvider>
      </Provider>
      </ApolloProvider>
      </body>
    </html>
  );
}
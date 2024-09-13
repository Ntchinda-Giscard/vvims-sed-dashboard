import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const hf_client = new ApolloClient({
    uri: 'https://ntchinda-giscard-vvims-bakcend.hf.space/graphql',
    cache: new InMemoryCache(),
  });
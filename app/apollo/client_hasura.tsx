import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { useSelector } from 'react-redux';



function state(){
  const user = useSelector((state) => state.auth.userInfo);
  return user
}

const httpLink = new HttpLink({
  uri: 'https://faithful-lynx-39.hasura.app/v1/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://faithful-lynx-39.hasura.app/v1/graphql',
  }),
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);


// ...code from the above example goes here...

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { onError } from '@apollo/client/link/error';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

let navigateCallback: ((path: string) => void) | null = null;

const setNavigate = (fn: (path: string) => void) => {
  navigateCallback = fn;
};

const errorLink = onError(({ graphQLErrors }) => {
  const status = (graphQLErrors?.[0]?.extensions?.originalError as { statusCode?: number })?.statusCode;
  if (status === 401 && navigateCallback) {
    navigateCallback('/login');
  }
});

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  createClient({ url: import.meta.env.VITE_WS_URL })
);

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: {
            keyArgs: false,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            merge: (existing, incoming, { args }: any) => {
              const merged = existing ? [...existing] : [];

              for (let i = 0; i < incoming?.length; i++) {
                merged[args.offset + i] = incoming[i];
              }

              return merged;
            }
          },
        },
      },
    },
  }),
});

export { setNavigate, client };

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

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

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export { setNavigate, client };

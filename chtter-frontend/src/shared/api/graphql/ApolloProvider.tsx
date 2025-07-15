// apollo/ApolloProviderWithNavigate.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApolloProvider as OriginalApolloProvider } from '@apollo/client';
import { client, setNavigate } from './apollo-client';

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return <OriginalApolloProvider client={client}>{children}</OriginalApolloProvider>;
};

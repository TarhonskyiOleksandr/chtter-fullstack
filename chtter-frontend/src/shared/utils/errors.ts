/* eslint-disable @typescript-eslint/no-explicit-any */
export const extractErrorMessage = (err: any) => {
  if (err?.graphQLErrors?.length > 0) {
    const graphQLError = err.graphQLErrors[0];

    const originalMessage = graphQLError?.extensions?.originalError?.message;
    
    if (Array.isArray(originalMessage)) return originalMessage[0];
    if (originalMessage) return originalMessage;

    if (graphQLError.message) return graphQLError.message;
  }

  return 'Unknown error';
};

import React, { FC, PropsWithChildren } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { authFlowLink } from './authFlowLink';

export const ClientProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const client = new ApolloClient<NormalizedCacheObject>({
    cache: new InMemoryCache(),
    link: authFlowLink,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

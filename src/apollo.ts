import { ApolloClient } from 'apollo-client';
import { createHttpLink, FetchOptions } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloLinkTimeout from 'apollo-link-timeout';
import { ErrorHandler, onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import VueApollo, { ApolloProvider } from 'vue-apollo';
import Vue from 'vue';

export interface IApolloOptions {
  url: string;
  timeout: number;
  onError: ErrorHandler;
}

// Create the apollo client
let apolloClient: ApolloClient<NormalizedCacheObject>|undefined;
let apolloProvider: ApolloProvider|undefined;

const createLink = (options: IApolloOptions) => {
  const timeoutLink: ApolloLinkTimeout = new ApolloLinkTimeout(options.timeout);
  const apolloOptions: FetchOptions = {
    uri: options.url,
  };
  const httpLink = createHttpLink(apolloOptions);
  const errorLink = onError(options.onError);
  return ApolloLink.from([errorLink, timeoutLink, httpLink]);
};

const initApolloProvider = (options: IApolloOptions): ApolloProvider => {
  const link = createLink(options);
  const cache = new InMemoryCache();
  apolloClient = new ApolloClient({ link, cache });
  apolloClient.writeData({ data: {} });
  apolloProvider = new VueApollo({ defaultClient: apolloClient });
  Vue.use(VueApollo);
  return apolloProvider;
};

const getApolloClient = (): ApolloClient<NormalizedCacheObject>|undefined => apolloClient;

export {
  initApolloProvider,
  getApolloClient,
};

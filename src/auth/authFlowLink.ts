import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getCode } from './getCode';
import { ServerError } from '@apollo/client';
import * as keytar from 'keytar';
import { RetryLink } from '@apollo/client/link/retry';
import { HttpLink, from } from '@apollo/client';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({ uri: GITHUB_BASE_URL });

// cached storage for the user token
let token: string | null;
let tokenInvalid = false;

const withToken = setContext(async (_, { headers = {} }) => {
  if (token) return { token };

  if (tokenInvalid) {
    token = await getCode();
    tokenInvalid = false;
  } else {
    token =
      (await keytar.getPassword('github', process.env.CLIENT_ID!)) ||
      (await getCode());
  }

  return { token };
});

const withAuthBearer = setContext(async (_, { headers = {}, token }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const resetToken = onError(({ networkError }) => {
  if ((networkError as ServerError)?.statusCode === 401 && !!token) {
    token = null;
    tokenInvalid = true;
  }
});

const retry = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
});

export const authFlowLink = from([
  retry,
  resetToken,
  withToken,
  withAuthBearer,
  httpLink,
]);

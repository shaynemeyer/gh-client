import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Text } from './shared/Text';
import { Panel } from './shared/Panel';

const GET_USER_INFO = gql`
  query getUserInfo {
    viewer {
      name
      bio
    }
  }
`;

type UserInfo = {
  viewer: {
    name: string;
    bio: string;
  };
};

export const WelcomeWindow = () => {
  const { loading, data, error } = useQuery<UserInfo>(GET_USER_INFO);

  return (
    <Panel height={12} left="center" top="25%">
      <Text left="center">Welcome to Github Manager</Text>
      {loading ? (
        <Text top={3}>Loading...</Text>
      ) : (
        <>
          <Text top={3}>{`Name: ${data?.viewer.name}`}</Text>
          <Text top={5} width={50}>{`Bio: ${data?.viewer.bio}`}</Text>
        </>
      )}
    </Panel>
  );
};

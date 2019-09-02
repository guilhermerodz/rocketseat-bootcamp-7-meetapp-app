import React from 'react';

import adorable from '~/services/adorable';

import { Container, Name, Picture } from './styles';

export default function({ user }) {
  return (
    <Container>
      <Name>{user.name}</Name>
      <Picture
        source={{
          uri: user.avatar ? user.avatar.url : adorable(user.name),
        }}
      />
    </Container>
  );
}

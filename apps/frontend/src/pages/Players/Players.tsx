import styled from '@emotion/styled';
import { VFC } from 'react';

import { CreatePlayer } from './CreatePlayer';
import { PlayerList } from './PlayerList';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px;
  gap: 20px;
`;

export const Players: VFC = () => {
  return (
    <Wrapper>
      <PlayerList />
      <CreatePlayer />
    </Wrapper>
  );
};

import styled from '@emotion/styled';
import { VFC } from 'react';

import { CreateGame } from './CreateGame';
import { GameList } from './GameList';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px;
  gap: 20px;
`;

export const Games: VFC = () => {
  return (
    <Wrapper>
      <GameList />
      <CreateGame />
    </Wrapper>
  );
};

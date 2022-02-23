import styled from '@emotion/styled';
import { VFC } from 'react';

import { CreateMatch } from './CreateMatch/CreateMatch';
import { Leaderboard } from './Leaderboard/Leaderboard';
import { MatchHistory } from './MatchHistory/MatchHistory';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px;
  gap: 20px;
`;

export const Dashboard: VFC = () => {
  return (
    <Wrapper>
      <Leaderboard />
      <CreateMatch />
      <MatchHistory />
    </Wrapper>
  );
};

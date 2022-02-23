import { Paper, Typography } from '@mui/material';
import { VFC } from 'react';
import { useDrop } from 'react-dnd';

import { GqlFullPlayerFragment } from '../../../graphql/fragments/__generated__/fullPlayer';
import { Player } from './Player';

interface TeamProps {
  players: Pick<GqlFullPlayerFragment, 'id' | 'name'>[];
  rank: number;
  onDrop: (player: Pick<GqlFullPlayerFragment, 'id' | 'name'>) => void;
}

export const Team: VFC<TeamProps> = ({ players, rank, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'player',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver;
  let backgroundColor = 'rgba(255, 255, 255, 0.1)';
  if (isActive) {
    backgroundColor = 'rgba(255, 255, 255, 0.2)';
  }

  return (
    <div>
      {rank === 0 ? (
        <Typography>verfügbare Teilnehmer</Typography>
      ) : (
        <Typography>{`${rank}. Platz`}</Typography>
      )}
      <Paper
        ref={drop}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          padding: 1,
          minHeight: 48,
          backgroundColor,
        }}
      >
        {players.map(({ id, name }) => (
          <Player key={id} name={name} id={id} />
        ))}
      </Paper>
    </div>
  );
};

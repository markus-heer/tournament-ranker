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
  let backgroundColor = '#eee';
  if (isActive) {
    backgroundColor = 'darkgreen';
  }

  return (
    <div>
      {rank === 0 ? (
        <Typography>verfügbare Teilnehmer</Typography>
      ) : (
        <Typography>{`${rank}. Platz`}</Typography>
      )}
      <Paper ref={drop} sx={{ minHeight: 40, backgroundColor }}>
        {players.map(({ id, name }) => (
          <Player key={id} name={name} id={id} />
        ))}
      </Paper>
    </div>
  );
};

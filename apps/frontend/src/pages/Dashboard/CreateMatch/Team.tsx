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
  const [{ isOver, hoveredItem }, drop] = useDrop({
    accept: 'player',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      hoveredItem: monitor.getItem(),
    }),
  });

  const isActive = isOver;
  let backgroundColor = '#242424';
  if (isActive) {
    backgroundColor = '#3a3a3a';
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
        {hoveredItem && isOver && !players.find(({ id }) => hoveredItem.id === id) && (
          <Player key={hoveredItem.id} name={hoveredItem.name} id={hoveredItem.id} />
        )}
      </Paper>
    </div>
  );
};

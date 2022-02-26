import { Paper, Typography } from '@mui/material';
import { VFC } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { GqlFullPlayerFragment } from '../../../graphql/fragments/__generated__/fullPlayer';
import { Player } from './Player';

interface TeamProps {
  players: Pick<GqlFullPlayerFragment, 'id' | 'name'>[];
  id: number;
  onDropPlayer: (player: Pick<GqlFullPlayerFragment, 'id' | 'name'>) => void;
}

export type PlayerTeam = {
  id: number;
  players: Pick<GqlFullPlayerFragment, 'id' | 'name'>[];
};

export const Team: VFC<TeamProps> = ({ players, id, onDropPlayer }) => {
  const [, drag] = useDrag(
    () => ({
      type: 'team',
      item: { id, players },
    }),
    [id, players],
  );

  const [{ isOver, hoveredItem }, drop] = useDrop({
    accept: 'player',
    drop: onDropPlayer,
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
    <Paper ref={drag} sx={{ padding: 1 }}>
      {id === 0 ? (
        <Typography>verfügbare Teilnehmer</Typography>
      ) : (
        <Typography>{`Team ${id}`}</Typography>
      )}
      <Paper
        ref={drop}
        sx={{
          display: 'flex',
          flexDirection: id === 0 ? 'row' : 'column',
          flexWrap: 'wrap',
          gap: 1,
          padding: 1,
          minHeight: 88,
          minWidth: 100,
          backgroundColor,
        }}
      >
        {players.map(({ id: playerId, name }) => (
          <Player key={playerId} name={name} id={playerId} />
        ))}
        {hoveredItem &&
          isOver &&
          !players.find(({ id: playerId }) => hoveredItem.id === playerId) && (
            <Player key={hoveredItem.id} name={hoveredItem.name} id={hoveredItem.id} />
          )}
      </Paper>
    </Paper>
  );
};

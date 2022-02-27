import { Paper, Typography } from '@mui/material';
import { VFC } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { GqlFullPlayerFragment } from '../../../graphql/fragments/__generated__/fullPlayer';
import { Player } from './Player';

interface TeamProps {
  players: Pick<GqlFullPlayerFragment, 'id' | 'name'>[];
  id: number;
  onDropPlayer: (player: Pick<GqlFullPlayerFragment, 'id' | 'name'>) => void;
  canDrag?: boolean;
}

export type PlayerTeam = {
  id: number;
  players: Pick<GqlFullPlayerFragment, 'id' | 'name'>[];
};

export const Team: VFC<TeamProps> = ({ players, id, onDropPlayer, canDrag = true }) => {
  const [, drag] = useDrag(
    () => ({
      type: 'team',
      canDrag,
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
    <>
      {id === 0 && <Typography sx={{ marginBottom: -2 }}>verfügbare Teilnehmer</Typography>}
      <Paper
        ref={drag}
        sx={{
          padding: id === 0 ? 0 : 1,
          cursor: canDrag ? 'grab' : 'default',
          backgroundImage: id === 0 ? 'none' : undefined,
          boxShadow: id === 0 ? 'none' : undefined,
        }}
      >
        {id !== 0 && <Typography>{`Team ${id}`}</Typography>}
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
    </>
  );
};

import { Paper, Typography } from '@mui/material';
import { VFC } from 'react';
import { useDrop } from 'react-dnd';

import { GqlFullPlayerFragment } from '../../../graphql/fragments/__generated__/fullPlayer';
import { PlayerTeam, Team } from './Team';

interface TeamRankProps {
  teams: PlayerTeam[];
  rank: number;
  onDropTeam: (team: PlayerTeam) => void;
  onDropPlayerOnTeam: (
    team: number,
  ) => (player: Pick<GqlFullPlayerFragment, 'id' | 'name'>) => void;
}

export const TeamRank: VFC<TeamRankProps> = ({ teams, rank, onDropTeam, onDropPlayerOnTeam }) => {
  const [{ isOver, hoveredItem }, drop] = useDrop({
    accept: 'team',
    drop: onDropTeam,
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
        {teams.map(({ id, players }) => (
          <Team key={id} id={id} onDropPlayer={onDropPlayerOnTeam(id)} players={players} />
        ))}
        {hoveredItem && isOver && !teams.find(({ id }) => hoveredItem.id === id) && (
          <Team
            key={hoveredItem.id}
            id={hoveredItem.id}
            onDropPlayer={onDropPlayerOnTeam(hoveredItem.id)}
            players={hoveredItem.players}
          />
        )}
      </Paper>
    </div>
  );
};

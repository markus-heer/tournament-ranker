import { Stack } from '@mui/material';
import { useEffect, useState, VFC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { GqlFullPlayerFragment } from '../../graphql/fragments/__generated__/fullPlayer';
import { usePlayersQuery } from '../../graphql/queries/__generated__/players';
import { Team } from './Team';

export const CreateMatch: VFC = () => {
  const { data, loading } = usePlayersQuery();
  const [playerRanks, setPlayerRanks] = useState<Record<string, number>>({});

  useEffect(() => {
    if (data) {
      const initialPlayerRanks: Record<string, number> = {};
      data.players.forEach(({ id }) => {
        initialPlayerRanks[id] = 0;
      });
      setPlayerRanks(initialPlayerRanks);
    }
  }, [data]);

  const onDrop = (rank: number) => (player: Pick<GqlFullPlayerFragment, 'id' | 'name'>) => {
    setPlayerRanks({ ...playerRanks, [player.id]: rank });
  };

  const getPlayerObjectsFromRank = (rank: number) => {
    const playerIds = Object.keys(playerRanks);

    let players: Pick<GqlFullPlayerFragment, 'id' | 'name'>[] = [];

    playerIds.forEach((playerId) => {
      if (playerRanks[playerId] === rank) {
        const player = data?.players.find(({ id }) => playerId === id);

        if (player) {
          players = [...players, { id: playerId, name: player.name }];
        } else {
          throw new Error('Player not found');
        }
      }
    });

    return players.sort((a, b) => a.name.localeCompare(b.name));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <Stack spacing={2} sx={{ marginTop: 5 }}>
        <Team rank={0} onDrop={onDrop(0)} players={getPlayerObjectsFromRank(0)} />
        <Team rank={1} onDrop={onDrop(1)} players={getPlayerObjectsFromRank(1)} />
        <Team rank={2} onDrop={onDrop(2)} players={getPlayerObjectsFromRank(2)} />
        <Team rank={3} onDrop={onDrop(3)} players={getPlayerObjectsFromRank(3)} />
        <Team rank={4} onDrop={onDrop(4)} players={getPlayerObjectsFromRank(4)} />
      </Stack>
    </DndProvider>
  );
};

import { Stack } from '@mui/material';
import { useCallback, useEffect, useState, VFC } from 'react';

import { GqlFullPlayerFragment } from '../../../graphql/fragments/__generated__/fullPlayer';
import { GqlGamesQuery } from '../../../graphql/queries/__generated__/games';
import { GqlPlayersQuery } from '../../../graphql/queries/__generated__/players';
import { sortByName } from '../../../helpers/sortByName';
import { PlayerTeam, Team } from './Team';
import { RanksObject, TeamRank } from './TeamRank';

interface TeamMatchFormProps {
  gamesData: GqlGamesQuery;
  playersData: GqlPlayersQuery;
}

type TeamsObject = Record<string, number>;

export const TeamMatchForm: VFC<TeamMatchFormProps> = ({ gamesData, playersData }) => {
  const [playerTeams, setPlayerTeams] = useState<TeamsObject>({});
  const [teamRanks, setTeamRanks] = useState<RanksObject>({});

  const setInitialData = useCallback(() => {
    if (gamesData && playersData) {
      const initialPlayerTeams: TeamsObject = {};
      playersData.players.forEach(({ id }) => {
        initialPlayerTeams[id] = 0;
      });
      setPlayerTeams(initialPlayerTeams);
      setTeamRanks({});
    }
  }, [gamesData, playersData]);

  useEffect(() => {
    setInitialData();
  }, [gamesData, playersData, setInitialData]);

  const getHighestTeam = () => {
    let highestTeam = 0;
    Object.keys(playerTeams).forEach((playerId) => {
      if (playerTeams[playerId] > highestTeam) {
        highestTeam = playerTeams[playerId];
      }
    });
    return highestTeam;
  };

  const onDropPlayer =
    (teamId: number) => (player: Pick<GqlFullPlayerFragment, 'id' | 'name'>) => {
      setPlayerTeams({ ...playerTeams, [player.id]: teamId });

      if (teamRanks[teamId] === undefined) {
        // eslint-disable-next-line no-console
        console.log('new team');
        setTeamRanks({ ...teamRanks, [teamId]: 0 });
      }
    };

  const onDropTeam = (rank: number) => (team: PlayerTeam) => {
    setTeamRanks({ ...teamRanks, [team.id]: rank });
  };

  const getPlayerObjectsFromTeam = (team: number) => {
    const playerIds = Object.keys(playerTeams);

    let players: Pick<GqlFullPlayerFragment, 'id' | 'name'>[] = [];

    playerIds.forEach((playerId) => {
      if (playerTeams[playerId] === team) {
        const player = playersData?.players.find(({ id }) => playerId === id);

        if (player) {
          players = [...players, { id: playerId, name: player.name }];
        } else {
          throw new Error('Player not found');
        }
      }
    });

    return players.sort(sortByName);
  };

  const getTeamObjectsFromRank = (rank: number) => {
    const teamIds = Object.keys(teamRanks);

    let teams: PlayerTeam[] = [];

    teamIds.forEach((teamId) => {
      const id = Number(teamId);
      if (teamRanks[id] === rank) {
        teams = [...teams, { id, players: getPlayerObjectsFromTeam(id) }];
      }
    });

    return teams.sort((a, b) => a.id - b.id);
  };

  return (
    <Stack spacing={2} sx={{ marginTop: 5 }}>
      <Team id={0} onDropPlayer={onDropPlayer(0)} players={getPlayerObjectsFromTeam(0)} />
      {Array.from(Array(2 + 2).keys()).map((rank) => (
        <TeamRank
          key={rank}
          rank={rank}
          onDropTeam={onDropTeam(rank)}
          teams={getTeamObjectsFromRank(rank)}
          onDropPlayerOnTeam={onDropPlayer}
          getHighestTeam={getHighestTeam}
          teamRanks={teamRanks}
          getPlayerObjectsFromTeam={getPlayerObjectsFromTeam}
        />
      ))}
    </Stack>
  );
};

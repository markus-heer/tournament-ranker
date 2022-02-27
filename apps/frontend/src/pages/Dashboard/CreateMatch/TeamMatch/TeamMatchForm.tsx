import { useApolloClient } from '@apollo/client';
import { Button, Stack } from '@mui/material';
import { toPairs } from 'lodash';
import { useCallback, useEffect, useState, VFC } from 'react';

import { GqlFullPlayerFragment } from '../../../../graphql/fragments/__generated__/fullPlayer';
import { useCreateTeamMatchMutation } from '../../../../graphql/mutations/__generated__/createTeamMatch';
import { GqlGamesQuery } from '../../../../graphql/queries/__generated__/games';
import { GqlPlayersQuery } from '../../../../graphql/queries/__generated__/players';
import { GqlMatchCreateTeamInput, GqlTeamRanking } from '../../../../graphql/types';
import { sortByName } from '../../../../helpers/sortByName';
import { PlayerTeam, Team } from '../Team';
import { RanksObject, TeamRank } from './TeamRank';

interface TeamMatchFormProps {
  gamesData: GqlGamesQuery;
  playersData: GqlPlayersQuery;
  gameId: string;
  setGameId: (gameId: string) => void;
}

type TeamsObject = Record<string, number>;

export const TeamMatchForm: VFC<TeamMatchFormProps> = ({
  gamesData,
  playersData,
  gameId,
  setGameId,
}) => {
  const [playerTeams, setPlayerTeams] = useState<TeamsObject>({});
  const [teamRanks, setTeamRanks] = useState<RanksObject>({});

  const [createTeamMatchMutation] = useCreateTeamMatchMutation();
  const apolloClient = useApolloClient();

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

  const getHighestRank = () => {
    let highestRank = 0;
    Object.keys(teamRanks).forEach((team) => {
      if (teamRanks[Number(team)] > highestRank) {
        highestRank = teamRanks[Number(team)];
      }
    });

    return highestRank;
  };

  const onDropPlayer =
    (teamId: number) => (player: Pick<GqlFullPlayerFragment, 'id' | 'name'>) => {
      setPlayerTeams({ ...playerTeams, [player.id]: teamId });

      if (teamRanks[teamId] === undefined) {
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

  const createMatch = async () => {
    const teams = toPairs(teamRanks);

    const teamRankArray: GqlTeamRanking[] = teams
      .map(([teamString, rank]) => {
        const currentTeam = Number(teamString);
        const allPlayers = toPairs(playerTeams);
        const playerIds = allPlayers
          .filter(([, team]) => team === currentTeam)
          .map(([playerId]) => playerId);

        return {
          rank,
          playerIds,
        };
      })
      .filter(({ rank, playerIds }) => rank !== 0 && playerIds.length !== 0);

    if (teamRankArray.length > 1) {
      const matchCreateInput: GqlMatchCreateTeamInput = {
        gameId,
        teamRankings: teamRankArray,
      };

      await createTeamMatchMutation({ variables: { data: matchCreateInput } });

      setInitialData();

      setGameId(gamesData?.games[0]?.id || '');

      await apolloClient.refetchQueries({
        include: 'active',
      });
    }
  };

  return (
    <>
      <Stack spacing={2} sx={{ marginTop: 5 }}>
        <Team
          id={0}
          onDropPlayer={onDropPlayer(0)}
          players={getPlayerObjectsFromTeam(0)}
          canDrag={false}
        />
        {Array.from(Array(getHighestRank() + 2).keys()).map((rank) => (
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

      <Button onClick={createMatch} sx={{ marginTop: 5 }}>
        Match erstellen
      </Button>
    </>
  );
};

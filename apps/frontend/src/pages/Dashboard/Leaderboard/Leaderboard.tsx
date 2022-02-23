import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { AvatarWithName } from '../../../components/AvatarWithName';
import { GqlFullPlayerFragment } from '../../../graphql/fragments/__generated__/fullPlayer';
import { usePlayersQuery } from '../../../graphql/queries/__generated__/players';

type Rank = number | '';

type PlayerWithRank = GqlFullPlayerFragment & { rank: Rank };

export const Leaderboard = () => {
  const { data } = usePlayersQuery();
  const [sortedPlayers, setSortedPlayers] = useState<PlayerWithRank[] | undefined>();

  useEffect(() => {
    if (data) {
      const players = [...data.players];
      const sortedPlayerList = players.sort((a, b) => a.elo - b.elo);

      let playersWithRank: PlayerWithRank[] = [];

      sortedPlayerList.forEach((player, index) => {
        let rank: Rank = sortedPlayerList.length - index;

        if (index === 0) {
          rank = sortedPlayerList.length;
        } else if (sortedPlayerList[index - 1].elo === player.elo) {
          rank = playersWithRank[index - 1].rank;
        }

        playersWithRank = [...playersWithRank, { ...player, rank }];
      });

      setSortedPlayers(playersWithRank.reverse());
    }
  }, [data]);

  return (
    <Paper
      variant="outlined"
      sx={{ padding: 1, backgroundColor: (theme) => theme.palette.background.paper }}
    >
      <Typography variant="h4" mb={2}>
        Rangliste
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Platz</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Matches</TableCell>
              <TableCell align="right">Elo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers?.map(({ id, name, elo, rank, numberOfMatches }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {rank}
                </TableCell>
                <TableCell>
                  <AvatarWithName name={name} />
                </TableCell>
                <TableCell align="right">{numberOfMatches}</TableCell>
                <TableCell align="right">{elo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

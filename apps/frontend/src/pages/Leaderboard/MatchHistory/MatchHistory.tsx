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
import { VFC } from 'react';

import { useMatchesQuery } from '../../../graphql/queries/__generated__/matches';

export const MatchHistory: VFC = () => {
  const { data } = useMatchesQuery();

  return (
    <Paper
      variant="outlined"
      sx={{ padding: 1, backgroundColor: (theme) => theme.palette.background.paper }}
    >
      <Typography variant="h4" mb={2}>
        Matchverlauf
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Spiel</TableCell>
              <TableCell align="right">Datum</TableCell>
              <TableCell align="right">Matches</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.matches.map(({ id, createdAt, eloInfo, game }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {game.name}
                </TableCell>
                <TableCell align="right">{createdAt}</TableCell>
                <TableCell align="right">100</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

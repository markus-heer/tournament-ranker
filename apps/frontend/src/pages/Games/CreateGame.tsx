import { useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useState, VFC } from 'react';

import { useCreateGameMutation } from '../../graphql/mutations/__generated__/createGame';
import { GqlGameType } from '../../graphql/types';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreateGame: VFC = () => {
  const [createGameMutation] = useCreateGameMutation();
  const apolloClient = useApolloClient();

  const [name, setName] = useState<string>('');

  const createGame = async () => {
    if (name) {
      await createGameMutation({ variables: { data: { name, gameType: GqlGameType.Single } } });

      setName('');

      await apolloClient.refetchQueries({
        include: 'active',
      });
    }
  };

  const onKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key == 'Enter') {
      createGame();
    }
  };

  return (
    <Paper variant="outlined" sx={{ padding: 1, display: 'flex' }}>
      <Wrapper>
        <FormWrapper>
          <Typography variant="h4" mb={2}>
            Spiel erstellen
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onKeyPress={onKeyPress}
            onChange={(e) => setName(e.target.value)}
          />
        </FormWrapper>
        <Button onClick={createGame} sx={{ marginTop: 5 }} disabled={!name}>
          Spiel erstellen
        </Button>
      </Wrapper>
    </Paper>
  );
};

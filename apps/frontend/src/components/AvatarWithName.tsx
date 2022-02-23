import { Avatar, Box } from '@mui/material';
import { AvatarGenerator } from 'random-avatar-generator';
import { VFC } from 'react';

interface AvatarWithNameProps {
  name: string;
}

export const AvatarWithName: VFC<AvatarWithNameProps> = ({ name }) => (
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
    <Avatar src={new AvatarGenerator().generateRandomAvatar(name)} />{' '}
    <Box sx={{ marginTop: '4px' }}>{name}</Box>
  </Box>
);

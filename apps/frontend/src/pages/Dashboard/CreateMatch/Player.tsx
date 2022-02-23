import { Avatar, Chip } from '@mui/material';
import { AvatarGenerator } from 'random-avatar-generator';
import { VFC } from 'react';
import { useDrag } from 'react-dnd';

import { GqlFullPlayerFragment } from '../../../graphql/fragments/__generated__/fullPlayer';

export const Player: VFC<Pick<GqlFullPlayerFragment, 'id' | 'name'>> = ({ id, name }) => {
  const [, drag] = useDrag(
    () => ({
      type: 'player',
      item: { id, name },
    }),
    [name],
  );

  return (
    <Chip
      ref={drag}
      label={name}
      avatar={<Avatar src={new AvatarGenerator().generateRandomAvatar(name)} />}
      sx={{ cursor: 'grab' }}
    ></Chip>
  );
};

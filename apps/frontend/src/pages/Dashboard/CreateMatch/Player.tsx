import { Avatar, Chip } from '@mui/material';
import { VFC } from 'react';
import { useDrag } from 'react-dnd';

import { GqlFullPlayerFragment } from '../../../graphql/fragments/__generated__/fullPlayer';

export const Player: VFC<Pick<GqlFullPlayerFragment, 'id' | 'name'>> = ({ id, name }) => {
  const [, drag] = useDrag(
    () => ({
      type: 'player',
      item: { id, name },
    }),
    [id, name],
  );

  return (
    <Chip
      ref={drag}
      label={name}
      avatar={<Avatar src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${name}`} />}
      sx={{ cursor: 'grab' }}
    ></Chip>
  );
};

import * as React from 'react';

//Third Party
import { Link, SxProps, Theme, Typography } from '@mui/material';

interface Props {
  title: string;
  onClick?: () => void;
  sx?: SxProps<Theme> | undefined;
}

const AppLinkButton: React.FC<Props> = (props: Props) => {
  //Const
  const { title, onClick, sx } = props;

  return (
    <Link sx={{ alignSelf: 'flex-start' }} component="button" onClick={onClick}>
      <Typography sx={{ whiteSpace: 'pre-wrap', color: '#333333', '&:hover': { color: '#DC004E' }, ...sx }}>
        {title}
      </Typography>
    </Link>
  );
};

export default AppLinkButton;

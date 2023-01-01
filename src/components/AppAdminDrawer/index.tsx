import * as React from 'react';

//Third Party
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { IconButton, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';
import Constant from 'config/app-constant';
import { useNavigate } from 'react-router-dom';

interface Props {
  open?: boolean;
  toggleDrawer: () => void;
}

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const AppAdminDrawer: React.FC<Props> = (props: Props) => {
  //Const
  const { open, toggleDrawer } = props;
  const navigate = useNavigate();

  //State

  function onPressItem(c: { id: number; title: string; route?: string }, i: number, j: number): void {
    c.route && navigate(c.route);
  }

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {Constant.ADMIN_ITEMS.map((v, i) => {
          return (
            <React.Fragment>
              <ListSubheader component="div" inset>
                {v.title}
              </ListSubheader>
              {v.items.map((c, j) => {
                return (
                  <ListItemButton onClick={() => onPressItem(c, i, j)}>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary={c.title} />
                  </ListItemButton>
                );
              })}
              <Divider sx={{ my: 1 }} />
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default AppAdminDrawer;

import * as React from 'react';

//Third Party
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { bindHover, usePopupState } from 'material-ui-popup-state/hooks';
import Image from 'mui-image';
import AppNavbarPopover from '../AppNavbarPopover';

interface Props {
  items: string[];
  window?: () => Window;
}
const drawerWidth = 240;

const AppNavbar: React.FC<Props> = (props: Props) => {
  const { window, items } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {'Omronics Auomation'}
      </Typography>
      <Divider />
      <List>
        {items.map(item => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });
  return (
    <>
      <AppBar sx={{}} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box component="div" sx={{ ml: 10, color: '#000', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Image src={require('../../assets/svg/navbar-logo.svg').default} width={120} />
          </Box>

          <Stack direction="row" spacing={3} sx={{ mr: 10, display: { xs: 'none', sm: 'block' } }}>
            {items.map((item, index) => (
              <Button
                sx={{ '&:hover': { color: '#DC004E' } }}
                color="secondary"
                {...(index === 1 && bindHover(popupState))}
                key={item}>
                {item}
              </Button>
            ))}
          </Stack>
          <AppNavbarPopover popupState={popupState} />
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}>
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default AppNavbar;

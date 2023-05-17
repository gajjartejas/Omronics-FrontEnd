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
import { useNavigate } from 'react-router-dom';
import Config from '../../config';
import { IProduct } from '../../services/api-service/product/types';
import { IManufacturer } from '../../services/api-service/manufacturer/types';

interface Props {
  items: { id: number; name: string }[];
  window?: () => Window;
  featuredProducts: IProduct[];
  featuredManufacturer: IManufacturer[];
}
const drawerWidth = 240;

const AppNavbar: React.FC<Props> = (props: Props) => {
  //Const
  const { window, items, featuredProducts, featuredManufacturer } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  //State
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
          <ListItem key={item.id.toString()} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const onClickMenuButton = (item: { id: number; name: string }, index: number) => {
    switch (item.id) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/');
        break;
      case 2:
        navigate('/about-us');
        break;
      case 3:
        navigate('/service');
        break;
      case 4:
        navigate('/contact-us');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBar sx={{ background: '#ffffff' }} component="nav">
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
            <Image src={Config.Images.svgs.app_icon.default} width={120} />
          </Box>

          <Stack direction="row" spacing={3} sx={{ mr: 10, display: { xs: 'none', sm: 'block' } }}>
            {items.map((item, index) => (
              <Button
                onClick={() => onClickMenuButton(item, index)}
                sx={{ color: '#000000', '&:hover': { color: '#DC004E' } }}
                color="secondary"
                {...(index === 1 && bindHover(popupState))}
                key={item.id}>
                {item.name}
              </Button>
            ))}
          </Stack>
          <AppNavbarPopover
            popupState={popupState}
            featuredManufacturer={featuredManufacturer}
            featuredProducts={featuredProducts}
          />
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

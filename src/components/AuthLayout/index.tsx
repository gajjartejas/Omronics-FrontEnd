import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Components from 'components';
import AppAdminDrawer from 'components/AppAdminDrawer';
import useWindowDimensions from 'hooks/useWindowDimensions';
import * as React from 'react';
import { useOutlet } from 'react-router-dom';
import useUserDataStore from 'store/user-data-store';
import SignIn from '../../pages/Admin/AdminLogin/SignIn';

function AuthLayout() {
  //Const
  const { height } = useWindowDimensions();
  const outlet = useOutlet();
  const token = useUserDataStore(store => store.token);

  //State
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (!token) {
    return <SignIn />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Components.AppAdminNavbar open={open} toggleDrawer={toggleDrawer} />
      <AppAdminDrawer open={open} toggleDrawer={toggleDrawer} />
      <Box
        style={{ height: height }}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}>
        <Toolbar />
        <Box sx={{ flex: 1 }}>{outlet}</Box>
      </Box>
    </Box>
  );
}

export default AuthLayout;

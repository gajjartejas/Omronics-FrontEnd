import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Components from 'components';
import AppAdminDrawer from 'components/AppAdminDrawer';
import useWindowDimensions from 'hooks/useWindowDimensions';
import * as React from 'react';
//import { useSelector } from 'react-redux';
import { useOutlet } from 'react-router-dom';
//import { selectAccount } from '../../redux/selectors/accountSelectors';

function AuthLayout() {
  const { height } = useWindowDimensions();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  //const account = useSelector(selectAccount);
  const outlet = useOutlet();

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

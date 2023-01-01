import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Components from 'components';
import AppAdminDrawer from 'components/AppAdminDrawer';
import * as React from 'react';
//import { useSelector } from 'react-redux';
import { useOutlet } from 'react-router-dom';
//import { selectAccount } from '../../redux/selectors/accountSelectors';

function DashboardContent() {
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
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}>
        <Toolbar />
        <Container>{outlet}</Container>
      </Box>
    </Box>
  );
}

export default DashboardContent;

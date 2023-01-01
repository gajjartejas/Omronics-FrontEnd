import { Box, Typography, Container, Button } from '@mui/material';
import '../../App.css';
import { useNavigate } from 'react-router-dom';

function WorkInProgress() {
  const navigate = useNavigate();

  const onContactUS = () => {
    navigate('/contact-us');
  };
  const styles = {
    paperContainer: {
      height: 900,
      backgroundImage: `url(${require('../../assets/svg/wip.svg').default})`,
      backgroundSize: 'cover',
    },
  };
  return (
    <Box style={styles.paperContainer} sx={{ pt: 16 }}>
      <Container sx={{ pt: 16 }}>
        <Box sx={{ pt: 8, justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <Typography sx={{ color: '#ffffff', mt: 2, fontSize: 20, fontWeight: '400' }}>{'Our Website is'}</Typography>
          <Typography sx={{ color: '#ffffff', fontSize: 50, fontWeight: '600' }}>{'Coming Soon'}</Typography>
          <Typography sx={{ color: '#ffffff', mt: 8, whiteSpace: 'pre-wrap', fontSize: 18, fontWeight: '400' }}>
            {'We are preparing something amazing and existing for you.\nMeanwhile if you need any help contact us.'}
          </Typography>
          <Button disableElevation variant="contained" onClick={onContactUS} sx={{ mt: 8 }}>
            {'CONTACT US'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default WorkInProgress;

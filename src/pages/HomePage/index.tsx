import { Button, Grid, Typography } from '@mui/material';
import '../../App.css';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Components from '../..//components';

let Carousel = require('react-responsive-carousel').Carousel;

function HomePage() {
  const { height } = useWindowDimensions();

  const TextDescription = (
    <Grid
      container
      sx={{
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <Grid
        container
        sx={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          ml: 12,
        }}>
        <Typography sx={{ mx: 0, color: 'rgb(119 188 71)', fontSize: 30 }}>{'Company Overview'}</Typography>
        <Typography
          sx={{
            mt: 2,
            lineHeight: 1,
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
            mx: 0,
            color: '#ffffff',
            fontSize: 20,
          }}>
          {'Excellence is our guiding tenet and runs through\n\nour thoughts, words and actions.'}
        </Typography>
        <Button sx={{ mt: 4 }} variant="contained" disableElevation>
          {'READ MORE'}
        </Button>
      </Grid>
    </Grid>
  );
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      {/* <Box sx={{ height: height * 0.7, width: '100%' }}>
        <Carousel
          dynamicHeight={false}
          showThumbs={false}
          centerMode={false}
          showStatus={true}
          showArrows={true}
          showIndicators={true}
          interval={3000000}
          infiniteLoop={true}
          emulateTouchy={true}
          autoPlay={true}>
          <Box sx={{ height: height * 0.7, width: '100%' }}>
            <Image fit={'cover'} src={require('../../assets/svg/cover1.svg').default} width={'100%'} />
            {TextDescription}
          </Box>
          <Box sx={{ height: height * 0.7, width: '100%' }}>
            <Image fit={'cover'} src={require('../../assets/svg/cover1.svg').default} width={'100%'} />
            {TextDescription}
          </Box>
        </Carousel>
      </Box> */}
      <Components.WorkInProgress/>
    </div>
  );
}

export default HomePage;

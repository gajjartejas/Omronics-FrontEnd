import { Box, Button, Container, Grid, Typography } from '@mui/material';
import '../../App.css';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Components from '../..//components';
import React from 'react';
import Image from 'mui-image';
import Config from '../../config';
import Carousel1 from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useStaticDataStore from '../../store/store';
let Carousel = require('react-responsive-carousel').Carousel;

function HomePage() {
  const { height } = useWindowDimensions();
  const featuredProducts = useStaticDataStore(state => state.featuredProducts);
  const featuredCategories = useStaticDataStore(state => state.featuredCategories);
  const featuredManufacturer = useStaticDataStore(state => state.featuredManufacturer);

  const styles = {
    paperContainer: {
      // backgroundImage: `url(${require('../../assets/svg/wip.svg').default})`,
      backgroundSize: 'cover',
    },
  };

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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <Box sx={{ height: height * 0.7, width: '100%' }}>
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
      </Box>
      {/*<Components.WorkInProgress />*/}

      <Box style={styles.paperContainer} sx={{ pt: 8 }}>
        <Container>
          <Typography sx={{ mt: 8, mb: 4, color: 'black', fontWeight: '600' }} variant="h4">
            {'Featured Brands'}
          </Typography>
          <Carousel1
            removeArrowOnDeviceType={['tablet', 'mobile']}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={500}
            infinite={false}
            swipeable={true}
            draggable={true}
            itemClass="carousel-item-padding-40-px"
            partialVisbile
            responsive={responsive}>
            {featuredManufacturer.map((item, index) => (
              <Components.ProductCard
                key={index.toString()}
                index={index}
                title={item.name}
                description={item.description || ''}
                image={item.images && item.images.length > 0 ? Config.Constants.IMAGE_PATH + item.images[0].url : null}
                onPress={() => {}}
              />
            ))}
          </Carousel1>
          <Button sx={{ mt: 2, mb: 2, px: 4, py: 2 }} variant="contained">
            {'VIEW ALL'}
          </Button>

          <Typography sx={{ mt: 8, mb: 4, color: 'black', fontWeight: '600' }} variant="h4">
            {'Featured Products'}
          </Typography>
          <Carousel1
            removeArrowOnDeviceType={['tablet', 'mobile']}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={500}
            infinite={false}
            swipeable={true}
            draggable={true}
            itemClass="carousel-item-padding-40-px"
            partialVisbile
            responsive={responsive}>
            {featuredProducts.map((item, index) => (
              <Components.ProductCard
                key={index.toString()}
                index={index}
                title={item.name}
                description={item.description || ''}
                image={item.images && item.images.length > 0 ? Config.Constants.IMAGE_PATH + item.images[0].url : null}
                onPress={() => {}}
              />
            ))}
          </Carousel1>
          <Button sx={{ mt: 2, mb: 2, px: 4, py: 2 }} variant="contained">
            {'VIEW ALL'}
          </Button>

          <Typography sx={{ mt: 8, mb: 4, color: 'black', fontWeight: '600' }} variant="h4">
            {'Product Categories'}
          </Typography>
          <Carousel1
            removeArrowOnDeviceType={['tablet', 'mobile']}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={500}
            infinite={false}
            swipeable={true}
            draggable={true}
            itemClass="carousel-item-padding-40-px"
            partialVisbile
            responsive={responsive}>
            {featuredCategories.map((item, index) => (
              <Components.ProductCard
                key={index.toString()}
                index={index}
                title={item.name}
                description={item.description || ''}
                image={item.images && item.images.length > 0 ? Config.Constants.IMAGE_PATH + item.images[0].url : null}
                onPress={() => {}}
              />
            ))}
          </Carousel1>
          <Button sx={{ mt: 2, mb: 2, px: 4, py: 2 }} variant="contained">
            {'VIEW ALL'}
          </Button>
        </Container>
      </Box>
    </div>
  );
}

export default HomePage;

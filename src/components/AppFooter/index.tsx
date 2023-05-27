import React, { FC, ReactElement } from 'react';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import Image from 'mui-image';
import Config from '../../config';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import AppLinkButton from '../AppLinkButton';
import { IStaticPageData } from 'services/api-service/static-page-data/types';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router';

const EXPLORE_OPTIONS = [
  {
    id: 0,
    name: 'Home',
    route: '/',
  },
  {
    id: 1,
    name: 'Products',
    route: '/categories',
  },
  {
    id: 2,
    name: 'Categories',
    route: '/categories',
  },
  {
    id: 3,
    name: 'Brands',
    route: '/brands',
  },
];

const SUPPORT_OPTIONS = [
  {
    id: 0,
    name: 'About US',
    route: 'about-us',
  },
  {
    id: 1,
    name: 'Service',
    route: 'service',
  },
  {
    id: 2,
    name: 'Contact US',
    route: 'contact-us',
  },
  {
    id: 3,
    name: 'Downloads',
    route: 'downloads',
  },
];

interface IFooterProps {
  staticPageData: IStaticPageData[];
}

export const Footer: FC<IFooterProps> = (props: IFooterProps): ReactElement => {
  const { staticPageData } = props;
  const navigate = useNavigate();

  const onPressFacebook = () => {
    window.open(staticPageData[12].data, '_blank', 'noreferrer');
  };

  const onPressInstagram = () => {
    window.open(staticPageData[14].data, '_blank', 'noreferrer');
  };

  const onPressTwitter = () => {
    window.open(staticPageData[13].data, '_blank', 'noreferrer');
  };

  const onPressYoutube = () => {
    window.open(staticPageData[15].data, '_blank', 'noreferrer');
  };

  const onPressExplore = (item: any, index: number) => {
    // window.open(`${window.location.origin}${item.route}`);
    navigate(item.route);
  };

  const onPressOptions = (item: any, index: number) => {
    // window.open(`${window.location.origin}/${item.route}`);
    navigate(item.route);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'black',
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-around" alignItems="flex-start" spacing={2}>
          <Grid direction="row" alignItems="center">
            <Image src={Config.Images.svgs.app_icon.default} width={120} />
            <Grid direction="row" alignItems="center">
              <Stack direction="row" justifyContent="space-around" spacing={2}>
                <IconButton onClick={onPressFacebook} aria-label="fingerprint" color="secondary">
                  <FacebookIcon color={'secondary'} width={10} height={10} />
                </IconButton>
                <IconButton onClick={onPressInstagram} aria-label="fingerprint" color="secondary">
                  <InstagramIcon color={'secondary'} width={10} height={10} />
                </IconButton>
                <IconButton onClick={onPressTwitter} aria-label="fingerprint" color="secondary">
                  <TwitterIcon color={'secondary'} width={10} height={10} />
                </IconButton>
                <IconButton onClick={onPressYoutube} aria-label="fingerprint" color="secondary">
                  <YouTubeIcon color={'secondary'} width={10} height={10} />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Grid direction="row" alignItems="center">
            <Typography color="white" fontWeight={'bold'} fontSize={17} marginBottom={2}>
              {'Explore'}
            </Typography>
            {EXPLORE_OPTIONS.map((v, idx) => {
              return (
                <Grid key={v.id} item xs={12} marginTop={1}>
                  <AppLinkButton onClick={() => onPressExplore(v, idx)} sx={{ color: 'grey' }} title={v.name} />
                </Grid>
              );
            })}
          </Grid>

          <Grid direction="row" alignItems="center">
            <Typography color="white" fontWeight={'bold'} fontSize={17} marginBottom={2}>
              {'Support'}
            </Typography>
            {SUPPORT_OPTIONS.map((v, idx) => {
              return (
                <Grid key={v.id} item xs={12} marginTop={1}>
                  <Grid key={v.id} item xs={12} marginTop={1}>
                    <AppLinkButton onClick={() => onPressOptions(v, idx)} sx={{ color: 'grey' }} title={v.name} />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>

          <Grid direction="row" alignItems="center">
            <Typography color="white" fontWeight={'bold'} fontSize={17} marginBottom={2}>
              {'Office'}
            </Typography>
            <Grid item xs={12} marginTop={1}>
              <Typography style={{ wordWrap: 'break-word' }} color="grey" fontSize={16}>
                <pre style={{ fontFamily: 'inherit' }}>{staticPageData[16].data}</pre>
              </Typography>
            </Grid>
          </Grid>
          <Grid direction="row" alignItems="center">
            <Typography color="white" fontWeight={'bold'} fontSize={17} marginBottom={2}>
              {'Contact US'}
            </Typography>
            <Grid item xs={12} marginTop={1}>
              <Typography style={{ wordWrap: 'break-word' }} color="grey" fontSize={16}>
                {staticPageData[17].data}
              </Typography>
              <Typography style={{ wordWrap: 'break-word' }} color="grey" fontSize={16}>
                {`${staticPageData[18].data} | ${staticPageData[19].data}`}
              </Typography>
              <Typography style={{ wordWrap: 'break-word' }} color="grey" fontSize={16}>
                {staticPageData[20].data}
              </Typography>
            </Grid>
            <Grid item xs={12} marginTop={1}>
              <Typography style={{ wordWrap: 'break-word' }} color="grey" fontSize={16}>
                {staticPageData[21].data}
              </Typography>
              <Typography style={{ wordWrap: 'break-word' }} color="grey" fontSize={16}>
                {`${staticPageData[22].data}`}
              </Typography>
              <Typography style={{ wordWrap: 'break-word' }} color="grey" fontSize={16}>
                {staticPageData[23].data}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

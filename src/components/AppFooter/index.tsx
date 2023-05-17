import React, { FC, ReactElement } from 'react';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import Image from 'mui-image';
import Config from '../../config';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import AppLinkButton from '../AppLinkButton';

const EXPLORE_OPTIONS = [
  {
    id: 0,
    name: 'Home',
  },
  {
    id: 1,
    name: 'Products',
  },
  {
    id: 2,
    name: 'Categories',
  },
  {
    id: 3,
    name: 'Brands',
  },
];

const SUPPORT_OPTIONS = [
  {
    id: 0,
    name: 'About US',
  },
  {
    id: 1,
    name: 'Contact US',
  },
  {
    id: 2,
    name: 'Downloads',
  },
];

export const Footer: FC = (): ReactElement => {
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
                <IconButton aria-label="fingerprint" color="secondary">
                  <FacebookIcon color={'secondary'} width={10} height={10} />
                </IconButton>
                <IconButton aria-label="fingerprint" color="secondary">
                  <InstagramIcon color={'secondary'} width={10} height={10} />
                </IconButton>
                <IconButton aria-label="fingerprint" color="secondary">
                  <TwitterIcon color={'secondary'} width={10} height={10} />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Grid direction="row" alignItems="center">
            <Typography color="white" fontWeight={'bold'} fontSize={17} marginBottom={2}>
              {'Explore'}
            </Typography>
            {EXPLORE_OPTIONS.map(v => {
              return (
                <Grid key={v.id} item xs={12} marginTop={1}>
                  <AppLinkButton sx={{ color: 'grey' }} title={v.name} />
                </Grid>
              );
            })}
          </Grid>

          <Grid direction="row" alignItems="center">
            <Typography color="white" fontWeight={'bold'} fontSize={17} marginBottom={2}>
              {'Support'}
            </Typography>
            {SUPPORT_OPTIONS.map(v => {
              return (
                <Grid key={v.id} item xs={12} marginTop={1}>
                  <Grid key={v.id} item xs={12} marginTop={1}>
                    <AppLinkButton sx={{ color: 'grey' }} title={v.name} />
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
                <pre style={{ fontFamily: 'inherit' }}>
                  {'Shed No-57,\n' +
                    'Radhekrishna Industrial Estate,\n' +
                    'Near Adarsh Estate Road No-5,\n' +
                    'Kathwada GIDC Ahmedabad,\n' +
                    'Gujarat 382430'}
                </pre>
              </Typography>
            </Grid>
          </Grid>
          <Grid direction="row" alignItems="center">
            <Typography color="white" fontWeight={'bold'} fontSize={17} marginBottom={2}>
              {'Contact US'}
            </Typography>
            <Grid item xs={12} marginTop={1}>
              <Typography style={{ wordWrap: 'break-word' }} color="grey" fontSize={16}>
                {'Chandrakant Prajapati'}
              </Typography>
              <Typography style={{ wordWrap: 'break-word' }} color="grey" fontSize={16}>
                {'+91 8160854963 | +91 7433007733'}
              </Typography>{' '}
              <Typography style={{ wordWrap: 'break-word' }} color="grey" fontSize={16}>
                {'chandrakant@omronics.com'}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

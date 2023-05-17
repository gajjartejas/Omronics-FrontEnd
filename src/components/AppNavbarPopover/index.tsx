import React from 'react';

//Third Party
import { Box, Divider, Stack, Typography } from '@mui/material';
import { bindPopover, PopupState } from 'material-ui-popup-state/hooks';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import AppLinkButton from '../AppLinkButton';
import { IProduct } from '../../services/api-service/product/types';
import { IManufacturer } from '../../services/api-service/manufacturer/types';

interface Props {
  popupState: PopupState;
  featuredProducts: IProduct[];
  featuredManufacturer: IManufacturer[];
}

const AppNavbarPopover: React.FC<Props> = (props: Props) => {
  //Const
  const { popupState, featuredProducts, featuredManufacturer } = props;

  return (
    <HoverPopover
      {...bindPopover(popupState)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{ maxHeight: '95%' }}>
      <Stack sx={{}} spacing={0}>
        <Stack sx={{ mx: 8, my: 4 }} direction="row" spacing={6}>
          <Stack sx={{}} spacing={4}>
            <Typography sx={{ marginY: 2 }} variant="h6">
              {'Featured Products'}
            </Typography>
            {featuredProducts.map(v => {
              return <AppLinkButton key={v.id.toString()} title={v.name} />;
            })}
            <AppLinkButton sx={{ color: '#DC004E', fontWeight: 'bold' }} title={'View All'} />
          </Stack>
          <Stack sx={{}} spacing={4}>
            <Typography sx={{ marginY: 2 }} variant="h6">
              {'Features Brands'}
            </Typography>
            {featuredManufacturer.map(v => {
              return <AppLinkButton key={v.id.toString()} title={v.name} />;
            })}
            <AppLinkButton sx={{ color: '#DC004E', fontWeight: 'bold' }} title={'View All'} />
          </Stack>
          <Stack sx={{}} spacing={4}>
            <Typography sx={{ marginY: 2 }} variant="h6">
              {'Resources'}
            </Typography>
            <AppLinkButton title={'Catalog'} />
            <AppLinkButton title={'Manual'} />
            <AppLinkButton title={'Software'} />
            <AppLinkButton title={'Drawing'} />
            <AppLinkButton sx={{ color: '#DC004E', fontWeight: 'bold' }} title={'View All'} />
          </Stack>
        </Stack>
        <Divider />
        <Stack justifyContent={'center'} sx={{}}>
          <Typography sx={{ my: 4, mx: 6 }} component="div">
            Not sure were to start?{' '}
            <Box fontWeight="fontWeightMedium" display="inline">
              Search Here
            </Box>
          </Typography>
        </Stack>
      </Stack>
    </HoverPopover>
  );
};

export default AppNavbarPopover;

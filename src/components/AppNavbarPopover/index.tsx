import React from 'react';

//Third Party
import { Box, Divider, Stack, Typography } from '@mui/material';
import { bindPopover, PopupState } from 'material-ui-popup-state/hooks';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import AppLinkButton from '../AppLinkButton';
import { IProduct } from '../../services/api-service/product/types';
import { IManufacturer } from '../../services/api-service/manufacturer/types';
import Constant from '../../config/app-constant';
import { ICategory } from '../../services/api-service/category/types';

interface Props {
  popupState: PopupState;
  featuredProducts: IProduct[];
  featuredManufacturer: IManufacturer[];
  featuredCategories: ICategory[];
  onClickProduct: (item: IProduct, index: number) => void;
  onClickCategory: (item: ICategory, index: number) => void;
  onClickManufacturer: (item: IManufacturer, index: number) => void;
  onClickFixtures: (item: { id: number; name: string }, index: number) => void;
  onClickViewAllProduct: () => void;
  onClickViewAllBrands: () => void;
  onClickViewAllFixtures: () => void;
}

const AppNavbarPopover: React.FC<Props> = (props: Props) => {
  //Const
  const {
    popupState,
    featuredCategories,
    featuredManufacturer,
    onClickCategory,
    onClickManufacturer,
    onClickFixtures,
    onClickViewAllProduct,
    onClickViewAllBrands,
    onClickViewAllFixtures,
  } = props;

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
              {'Featured Categories'}
            </Typography>
            {featuredCategories.map((v, idx) => {
              return <AppLinkButton onClick={() => onClickCategory(v, idx)} key={v.id.toString()} title={v.name} />;
            })}
            <AppLinkButton
              onClick={onClickViewAllProduct}
              sx={{ color: '#DC004E', fontWeight: 'bold' }}
              title={'View All'}
            />
          </Stack>
          <Stack sx={{}} spacing={4}>
            <Typography sx={{ marginY: 2 }} variant="h6">
              {'Features Brands'}
            </Typography>
            {featuredManufacturer.map((v, idx) => {
              return <AppLinkButton onClick={() => onClickManufacturer(v, idx)} key={v.id.toString()} title={v.name} />;
            })}
            <AppLinkButton
              onClick={onClickViewAllBrands}
              sx={{ color: '#DC004E', fontWeight: 'bold' }}
              title={'View All'}
            />
          </Stack>
          <Stack sx={{}} spacing={4}>
            <Typography sx={{ marginY: 2 }} variant="h6">
              {'Resources'}
            </Typography>
            {Constant.HOME_MENU_ITEMS_FIXTURES.map((v, idx) => {
              return <AppLinkButton onClick={() => onClickFixtures(v, idx)} key={v.id.toString()} title={v.name} />;
            })}
            <AppLinkButton
              onClick={onClickViewAllFixtures}
              sx={{ color: '#DC004E', fontWeight: 'bold' }}
              title={'View All'}
            />
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

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import ProductImageService from 'services/api-service/product-image';
import moment from 'moment';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import { IProductImage } from '../../../../services/api-service/types';
import Config from '../../../../config';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

interface IRowProductImage extends IProductImage {
  productName: string;
  productId: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 20 },
  {
    field: 'url',
    headerName: 'Image',
    width: 80,
    renderCell: params => {
      if (params.value) {
        return <Avatar src={Config.Constants.IMAGE_PATH + params.value} />;
      }
      return (
        <Avatar>
          <ProductionQuantityLimitsIcon />
        </Avatar>
      );
    },
  },
  {
    field: 'productId',
    headerName: 'Product Id',
    width: 80,
    editable: true,
    valueGetter: params => params.value || 'N/A',
  },
  {
    field: 'productName',
    headerName: 'Product Name',
    width: 300,
    editable: true,
    valueGetter: params => params.value || 'N/A',
  },
  {
    field: 'createdAt',
    headerName: 'Date Created',
    valueFormatter: params => moment(params?.value).format('DD/MM/YYYY hh:mm A'),
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 180,
  },
  {
    field: 'updatedAt',
    headerName: 'Date Updated',
    valueFormatter: params => moment(params?.value).format('DD/MM/YYYY hh:mm A'),
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 180,
  },
];

export default function ManageResourceList() {
  //Const
  const { height } = useWindowDimensions();
  //State
  const [rows, setRows] = React.useState<IRowProductImage[]>([]);

  React.useEffect(() => {
    (async () => {
      const manufacturers = await ProductImageService.getProductImages();
      const transformed = manufacturers?.map(v => {
        return {
          ...v,
          productName: v.products && v.products.length > 0 ? v.products[0].name : 'N/A',
          productId: v.products && v.products.length > 0 ? v.products[0].id : 'N/A',
        } as IRowProductImage;
      });
      setRows(transformed!);
    })();
  }, []);

  return (
    <div>
      <Grid2 sx={{ flex: 1, pt: 8, paddingX: 4 }} container spacing={0}>
        <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ mt: 2, mb: 1, fontSize: 24, fontWeight: '500' }}>{'Product Images'}</Typography>
        </Stack>
        <Box sx={{ height: height * 0.7, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={100} rowsPerPageOptions={[100]} />
        </Box>
      </Grid2>
    </div>
  );
}

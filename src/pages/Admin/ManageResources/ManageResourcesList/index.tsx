import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router';
import ProductResourceService from '../../../../services/api-service/product-resource';
import moment from 'moment';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import Config from '../../../../config';
import { IProductResource } from '../../../../services/api-service/product-resource/types';

interface IRowProductResource extends IProductResource {
  productName: string;
  productId: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 20 },
  {
    field: 'title',
    headerName: 'Title',
    width: 300,
    editable: true,
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
    field: 'link',
    headerName: 'Link',
    width: 250,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
    editable: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 110,
    editable: true,
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

  const { height } = useWindowDimensions();

  const [rows, setRows] = React.useState<IRowProductResource[]>([]);

  React.useEffect(() => {
    (async () => {
      let manufacturers = await ProductResourceService.getProductResources();
      const transformed = manufacturers?.map(v => {
        return {
          ...v,
          productName: v.products && v.products.length > 0 ? v.products[0].name : 'N/A',
          productId: v.products && v.products.length > 0 ? v.products[0].id : 'N/A',
          link: v.link ? Config.Constants.FILE_PATH + v.link : 'N/A',
        } as IRowProductResource;
      });
      setRows(transformed!);
    })();
  }, []);

  return (
    <div>
      <Grid2 sx={{ flex: 1, pt: 8, paddingX: 4 }} container spacing={0}>
        <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ mt: 2, mb: 1, fontSize: 24, fontWeight: '500' }}>{'Product Resources'}</Typography>
        </Stack>
        <Box sx={{ height: height * 0.7, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={100} rowsPerPageOptions={[100]} />
        </Box>
      </Grid2>
    </div>
  );
}

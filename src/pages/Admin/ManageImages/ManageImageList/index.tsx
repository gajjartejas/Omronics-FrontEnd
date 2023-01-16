import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router';
import ProductImageService from 'services/api-service/product-image';
import moment from 'moment';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'url',
    headerName: 'Link',
    width: 250,
    editable: true,
  },
  {
    field: 'products',
    headerName: 'Products',
    type: 'number',
    width: 110,
    editable: true,
    valueFormatter: params => params.value?.length || 'N/A',
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
  let navigate = useNavigate();
  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      let manufacturers = await ProductImageService.getProductImages();
      setRows(manufacturers!);
    })();
  }, []);

  return (
    <div>
      <Grid2 sx={{ flex: 1, pt: 8, paddingX: 4 }} container spacing={0}>
        <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ mt: 2, mb: 1, fontSize: 24, fontWeight: '500' }}>{'Resources'}</Typography>
        </Stack>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
        </Box>
      </Grid2>
    </div>
  );
}

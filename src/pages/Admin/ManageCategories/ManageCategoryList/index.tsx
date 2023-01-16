import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Container, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router';
import CategoryService from 'services/api-service/category';
import moment from 'moment';
import useWindowDimensions from 'hooks/useWindowDimensions';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 40 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
    editable: true,
  },
  {
    field: 'parentId',
    headerName: 'Sub Categories',
    type: 'number',
    width: 180,
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

export default function ManageCategoryList() {
  let navigate = useNavigate();
  const { height } = useWindowDimensions();

  const [rows, setRows] = React.useState<any[]>([]);

  const onPressAddNewProduct = () => {
    navigate('/admin/dashboard/add-category');
  };

  React.useEffect(() => {
    (async () => {
      let categories = await CategoryService.getCategories();
      setRows(categories!);
    })();
  }, []);

  return (
    <div>
      <Grid2 sx={{ flex: 1, pt: 8, paddingX: 4 }} container spacing={0}>
        <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ mt: 2, mb: 1, fontSize: 24, fontWeight: '500' }}>{'Categories'}</Typography>
          <Button onClick={onPressAddNewProduct} sx={{ mt: 2 }} variant="contained">
            {'ADD NEW CATEGORY'}
          </Button>
        </Stack>
        <Box sx={{ height: height * 0.7, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={15} rowsPerPageOptions={[15]} checkboxSelection />
        </Box>
      </Grid2>
    </div>
  );
}
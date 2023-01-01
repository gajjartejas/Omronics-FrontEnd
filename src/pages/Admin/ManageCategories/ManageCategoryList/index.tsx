import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import { Button, Container, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'subCategories',
    headerName: 'Sub Categories',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'products',
    headerName: 'Products',
    type: 'number',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
  },
];

const rows = [
  { id: 1, name: 'Snow', description: 'Jon', subCategories: 2, products: 20 },
  { id: 2, name: 'Snow', description: 'Jon', subCategories: 2, products: 20 },
  { id: 3, name: 'Snow', description: 'Jon', subCategories: 2, products: 20 },
  { id: 4, name: 'Snow', description: 'Jon', subCategories: 2, products: 20 },
  { id: 5, name: 'Snow', description: 'Jon', subCategories: 2, products: 20 },
  { id: 6, name: 'Snow', description: 'Jon', subCategories: 2, products: 20 },
  { id: 7, name: 'Snow', description: 'Jon', subCategories: 2, products: 20 },
  { id: 8, name: 'Snow', description: 'Jon', subCategories: 2, products: 20 },
  { id: 9, name: 'Snow', description: 'Jon', subCategories: 2, products: 20 },
  { id: 10, name: 'Snow', description: 'Jon', subCategories: 2, products: 20 },
  { id: 11, name: 'Snow', description: 'Jon', subCategories: 2, products: 20 },
];

export default function ManageCategoryList() {
  let navigate = useNavigate();

  const onPressAddNewProduct = () => {
    navigate('/admin/dashboard/add-category');
  };

  return (
    <div>
      <Container sx={{}}>
        <Grid2 sx={{ flex: 1, pt: 8 }} container spacing={2}>
          <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography sx={{ mt: 2, mb: 1, fontSize: 24, fontWeight: '500' }}>{'Categories'}</Typography>
            <Button onClick={onPressAddNewProduct} sx={{ mt: 2 }} variant="contained">
              {'ADD NEW CATEGORY'}
            </Button>
          </Stack>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
          </Box>
        </Grid2>
      </Container>
    </div>
  );
}

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
    width: 250,
    editable: true,
  },
  {
    field: 'partNumber',
    headerName: 'Part Number',
    width: 100,
    editable: true,
  },
  {
    field: 'modelNumber',
    headerName: 'Model Number',
    width: 100,
    editable: true,
  },
  {
    field: 'categories',
    headerName: 'Categories',
    width: 100,
    editable: true,
  },
  {
    field: 'images',
    headerName: 'Images',
    width: 100,
    editable: true,
  },
  {
    field: 'resources',
    headerName: 'Resources',
    width: 100,
    editable: true,
  },
  {
    field: 'manufacturer',
    headerName: 'Manufacturer',
    width: 100,
    editable: true,
  },
];

const rows = [
  { id: 1,
    name: 'Snow',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    partNumber:"356564",
    modelNumber:"ACF343234",
    products: 12,
    categories:"-",
    images:"-",
    resources:"-",
    manufacturer:"Omronics",
  },
  { id: 2,
    name: 'Lannister',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    partNumber:"32445345",
    modelNumber:"ACF343234",
    categories:"-",
    images:"-",
    resources:"-",
    manufacturer:"Omronics",
  },
  { id: 3,
    name: 'Lannister',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    partNumber:"34234243",
    modelNumber:"ACF343234",
    categories:"-",
    images:"-",
    resources:"-",
    manufacturer:"Omronics",
  },
  { id: 4,
    name: 'Stark',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    partNumber:"567456532",
    modelNumber:"ACF343234",
    categories:"-",
    images:"-",
    resources:"-",
    manufacturer:"Omronics",
  },
  { id: 5,
    name: 'Targaryen',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    partNumber:"123",
    products: 12,
    categories:"-",
    images:"-",
    resources:"-",
    manufacturer:"Omronics",
  },
  { id: 6,
    name: 'Melisandre',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    partNumber:"236756",
    modelNumber:"ACF343234",
    categories:"-",
    images:"-",
    resources:"-",
    manufacturer:"Omronics",
  },
  { id: 7,
    name: 'Clifford',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    partNumber:"23457876",
    modelNumber:"ACF343234",
    categories:"-",
    images:"-",
    resources:"-",
    manufacturer:"Omronics",
  },
  { id: 8,
    name: 'Frances',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    partNumber:"376553",
    modelNumber:"ACF343234",
    categories:"-",
    images:"-",
    resources:"-",
    manufacturer:"Omronics",
  },
  { id: 9,
    name: 'Roxie',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    partNumber:"033943433",
    modelNumber:"ACF343234",
    categories:"-",
    images:"-",
    resources:"-",
    manufacturer:"Omronics",
  },
];

export default function ManageProductList() {
  let navigate = useNavigate();

  const onPressAddNewProduct = () => {
    navigate('/admin/dashboard/add-product');
  };

  return (
    <div>
      <Container sx={{}}>
        <Grid2 sx={{ flex: 1, pt: 8 }} container spacing={2}>
          <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography sx={{ mt: 2, mb: 1, fontSize: 24, fontWeight: '500' }}>{'Products'}</Typography>
            <Button onClick={onPressAddNewProduct} sx={{ mt: 2 }} variant="contained">
              {'ADD NEW PRODUCT'}
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

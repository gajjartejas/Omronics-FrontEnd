import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import { Container, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'link',
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
  },
];

const rows = [
  { id: 1, name: 'Snow', link:"https://www.example.edu/aftermath", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", type:"CATALOG", products: 12 },
  { id: 2, name: 'Lannister', link:"https://www.example.com/?beds=boundary&breath=airplane", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", type:"CATALOG", products: 12 },
  { id: 3, name: 'Lannister', link:"https://example.com/bat/action", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", type:"CATALOG", products: 12 },
  { id: 4, name: 'Stark', link:"https://example.com/bat/action", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", type:"MANUAL", products: 12 },
  { id: 5, name: 'Targaryen', link:"https://example.com/bat/action", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", type:"SOFTWARE", products: 12 },
  { id: 6, name: 'Melisandre', link:"https://example.com/bat/action", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", type:"DRAWING", products: 12 },
  { id: 7, name: 'Clifford', link:"https://authority.example.com/birth/apparel", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", type:"MANUAL", products: 12 },
  { id: 8, name: 'Frances', link:"https://authority.example.com/birth/apparel", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", type:"DRAWING", products: 12 },
  { id: 9, name: 'Roxie', link:"https://example.org/alarm.php#account", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", type:"DRAWING", products: 12 },
];

export default function ManageResourceList() {
  let navigate = useNavigate();

  return (
      <div>
        <Container sx={{}}>
          <Grid2 sx={{ flex: 1, pt: 8 }} container spacing={2}>
            <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Typography sx={{ mt: 2, mb: 1, fontSize: 24, fontWeight: '500' }}>{'Resources'}</Typography>
            </Stack>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
            </Box>
          </Grid2>
        </Container>
      </div>
  );
}

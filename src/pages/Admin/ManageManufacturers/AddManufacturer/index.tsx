import { Button, Container,  TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';

const items = [
  { id: 0, name: 'Category 1' },
  { id: 1, name: 'Category 2' },
];

function AddManufacturer() {
  return (
      <div>
        <Container sx={{}}>
          <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
            <Grid2 sx={{ ml: 0, flex: 1 }}>
              <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Add Manufacturer'}</Typography>
              <TextField sx={{ mt: 2 }} required fullWidth label="Name" />
              <TextField sx={{ mt: 2 }} required fullWidth label="Description" />
              <Button sx={{ mt: 2 }} variant="contained">
                {'SAVE'}
              </Button>
            </Grid2>
          </Grid2>
        </Container>
      </div>
  );
}

export default AddManufacturer;

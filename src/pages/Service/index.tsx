import { Box, Container, Typography } from '@mui/material';
import '../../App.css';

import useStaticDataStore from '../../store/store';
import React from 'react';

function Service() {
  //State
  const staticPageData = useStaticDataStore(state => state.staticPageData);

  return (
    <Box sx={{ pt: 8 }}>
      <Container sx={{}}>
        <Typography sx={{ mt: 8, mb: 4, color: 'black', fontWeight: '600', textAlign: 'center' }} variant="h4">
          {'Service'}
        </Typography>
        {staticPageData && staticPageData.length > 0 && (
          <div dangerouslySetInnerHTML={{ __html: staticPageData[1].data }} />
        )}
      </Container>
    </Box>
  );
}

export default Service;

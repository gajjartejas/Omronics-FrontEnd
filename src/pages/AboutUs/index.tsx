import { Box, Container, Typography } from '@mui/material';
import '../../App.css';

import useStaticDataStore from '../../store/store';
import React, { useEffect } from 'react';

function AboutUs() {
  //State
  const staticPageData = useStaticDataStore(state => state.staticPageData);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Box sx={{ pt: 8 }}>
      <Container sx={{}}>
        <Typography sx={{ mt: 8, mb: 4, color: 'black', fontWeight: '600' , textAlign:'center'}} variant="h4">
          {'About US'}
        </Typography>
        {staticPageData && staticPageData.length > 0 && (
          <div dangerouslySetInnerHTML={{ __html: staticPageData[0].data }} />
        )}
      </Container>
    </Box>
  );
}

export default AboutUs;

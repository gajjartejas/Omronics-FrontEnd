import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import '../../App.css';

function ContactUs() {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return (
    <Wrapper render={render} apiKey={''}>
      <Box sx={{ pt: 8 }}>
        {/* <Components.GoogleMap options={{ center: center, zoom: zoom }} style={{ height: '400px', width: '100%' }}>
          <Components.MapMarker position={center} />
        </Components.GoogleMap> */}

        <div style={{ width: '100%' }}>
          <iframe
            title="map"
            width="100%"
            height="300"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=Omronics%20Automation,%2037,%20fortune%20industrial%20park,%20kathwada%20singarava%20road%20%20kathwada%20Ahmedabad%20gujarat%20382430+(Omronics%20Automation)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            <a href="https://www.maps.ie/distance-area-calculator.html">distance maps</a>
          </iframe>
        </div>

        <Container sx={{}}>
          <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
            <Grid2 sx={{ mr: 2 }}>
              <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Omronics Auomation'}</Typography>
              <Typography sx={{ mt: 2, color: '#ce110d', fontSize: 20, fontWeight: '500' }}>
                {'HEAD QUARTER'}
              </Typography>
              <Typography sx={{ whiteSpace: 'pre-wrap', color: '#181818', fontSize: 14 }}>
                {'37, fortune industrial park,\nKathwada Singarava road,\nKathwada Ahmedaba,\nGujarat 382430'}
              </Typography>

              <Typography sx={{ color: '#181818', fontSize: 14, fontWeight: '700' }}>
                {'Email: '}
                <Typography component="span" display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {'omronics@hotmail.com'}
                </Typography>
              </Typography>

              <Typography sx={{ mt: 4, fontSize: 24, fontWeight: '500' }}>{'Get In Touch'}</Typography>
              <Typography sx={{ mt: 2, color: '#ce110d', fontSize: 20, fontWeight: '500' }}>
                {'Chandrakant Prajapati'}
              </Typography>
              <Typography sx={{ color: '#181818', fontSize: 14, fontWeight: '700' }}>
                {'Contact Details: '}
                <Typography component={'span'} display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {'8160854963'}
                </Typography>
                <Typography component={'span'} display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {' ,7433007733'}
                </Typography>
              </Typography>
              <Typography sx={{ color: '#181818', fontSize: 14, fontWeight: '700' }}>
                {'Email: '}
                <Typography component="span" display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {'chandrakant@omronics.com'}
                </Typography>
              </Typography>

              <Typography sx={{ mt: 2, color: '#ce110d', fontSize: 20, fontWeight: '500' }}>
                {'Pranav Prajapati'}
              </Typography>
              <Typography sx={{ color: '#181818', fontSize: 14, fontWeight: '700' }}>
                {'Contact Details: '}
                <Typography component={'span'} display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {'+91 9512953737'}
                </Typography>
              </Typography>
              <Typography sx={{ color: '#181818', fontSize: 14, fontWeight: '700' }}>
                {'Email: '}
                <Typography component="span" display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {'pranav@omronics.com'}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 sx={{ ml: 0, flex: 1 }}>
              <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Drop Us A Line'}</Typography>
              <Typography sx={{ mt: 2, color: '#181818', fontSize: 16 }}>{'Have a question?'}</Typography>
              <Typography sx={{ color: '#181818', fontSize: 16 }}>
                {'Please enter the following details, and we’ll get back to you soon. All fields are required.'}
              </Typography>
              <TextField sx={{ mt: 2 }} required fullWidth label="Name" />
              <TextField sx={{ mt: 2 }} required fullWidth label="Mobile NO." />
              <TextField sx={{ mt: 2 }} required fullWidth label="Email Address" />
              <TextField sx={{ mt: 2 }} required fullWidth label="Requirements" multiline rows={4} />
              <Button sx={{ mt: 2 }} variant="contained">
                {'SEND MESSAGE'}
              </Button>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </Wrapper>
  );
}

export default ContactUs;

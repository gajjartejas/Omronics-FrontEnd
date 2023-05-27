import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import '../../App.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ContactDataService from '../../services/api-service/contact-data';
import { IBaseContactData } from '../../services/api-service/contact-data/types';
import useStaticDataStore from '../../store/store';

function ContactUs() {
  const staticPageData = useStaticDataStore(state => state.staticPageData);

  //State
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [requirements, setRequirements] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onClickSave = async () => {
    if (!name || name.trim().length < 1) {
      toast.error('Your name is required!');
      return;
    }

    if (!phoneNo || phoneNo.trim().length < 1) {
      toast.error('Phone number is required!');
      return;
    }
    if (phoneNo && phoneNo.length > 20) {
      toast.error('Invalid phone number.');
      return;
    }

    if (!email || email.trim().length < 1) {
      toast.error('Email is required!');
      return;
    }
    if (email && email.length > 100) {
      toast.error('Invalid email address.');
      return;
    }

    if (!requirements || requirements.length < 1) {
      toast.error('Requirement is required.');
      return;
    }

    if (requirements && requirements.length > 2000) {
      toast.error('Requirement length should not exceed 2000 characters.');
      return;
    }

    const newCategory: IBaseContactData = {
      name: name,
      phoneNo: phoneNo,
      email: email,
      requirements: requirements,
    };

    const result = await ContactDataService.addContactData(newCategory);
    if (result) {
      toast.success('Thank you for your inquiry. We have received it and our team will be in touch with you soon.');
      clearForm();
    }
  };

  const clearForm = () => {
    setName('');
    setPhoneNo('');
    setEmail('');
    setRequirements('');
  };

  function sanitizeUrl(url: string) {
    return url.replaceAll('&amp;', '&');
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ pt: 8 }}>
        <div style={{ width: '100%' }}>
          <iframe
            loading="lazy"
            title="map"
            width="100%"
            height="300"
            scrolling="no"
            src={sanitizeUrl(staticPageData[11].data)}>
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
                {staticPageData[2].data}
              </Typography>

              <Typography sx={{ color: '#181818', fontSize: 14, fontWeight: '700' }}>
                {'Email: '}
                <Typography component="span" display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {staticPageData[3].data}
                </Typography>
              </Typography>

              <Typography sx={{ mt: 4, fontSize: 24, fontWeight: '500' }}>{'Get In Touch'}</Typography>
              <Typography sx={{ mt: 2, color: '#ce110d', fontSize: 20, fontWeight: '500' }}>
                {staticPageData[4].data}
              </Typography>
              <Typography sx={{ color: '#181818', fontSize: 14, fontWeight: '700' }}>
                {'Contact Details: '}
                <Typography component={'span'} display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {staticPageData[5].data}
                </Typography>
                <Typography component={'span'} display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {`, ${staticPageData[6].data}`}
                </Typography>
              </Typography>
              <Typography sx={{ color: '#181818', fontSize: 14, fontWeight: '700' }}>
                {'Email: '}
                <Typography component="span" display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {staticPageData[7].data}
                </Typography>
              </Typography>

              <Typography sx={{ mt: 2, color: '#ce110d', fontSize: 20, fontWeight: '500' }}>
                {staticPageData[8].data}
              </Typography>
              <Typography sx={{ color: '#181818', fontSize: 14, fontWeight: '700' }}>
                {'Contact Details: '}
                <Typography component={'span'} display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {staticPageData[9].data}
                </Typography>
              </Typography>
              <Typography sx={{ color: '#181818', fontSize: 14, fontWeight: '700' }}>
                {'Email: '}
                <Typography component="span" display={'inline'} sx={{ color: '#181818', fontSize: 14 }}>
                  {staticPageData[10].data}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 sx={{ ml: 0, flex: 1 }}>
              <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Drop Us A Line'}</Typography>
              <Typography sx={{ mt: 2, color: '#181818', fontSize: 16 }}>{'Have a question?'}</Typography>
              <Typography sx={{ color: '#181818', fontSize: 16 }}>
                {'Please enter the following details, and we’ll get back to you soon. All fields are required.'}
              </Typography>
              <TextField
                value={name}
                sx={{ mt: 2 }}
                onChange={event => setName(event.target.value)}
                required
                fullWidth
                label="Name"
              />
              <TextField
                value={phoneNo}
                sx={{ mt: 2 }}
                onChange={event => setPhoneNo(event.target.value)}
                required
                fullWidth
                label="Mobile NO."
              />
              <TextField
                value={email}
                onChange={event => setEmail(event.target.value)}
                sx={{ mt: 2 }}
                required
                fullWidth
                label="Email Address"
              />
              <TextField
                value={requirements}
                onChange={event => setRequirements(event.target.value)}
                sx={{ mt: 2 }}
                required
                fullWidth
                label="Requirements"
                multiline
                rows={4}
              />
              <Button onClick={onClickSave} sx={{ mt: 2 }} variant="contained">
                {'SEND MESSAGE'}
              </Button>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </Box>
  );
}

export default ContactUs;

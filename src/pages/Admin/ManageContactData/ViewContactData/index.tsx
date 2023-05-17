import { Container, FormControl, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import 'react-dropdown-tree-select/dist/styles.css';
import ContactDataService from '../../../../services/api-service/contact-data';
import '../../../../App.css';
import useQuery from 'hooks/useQuery';

function ViewContactData() {
  //Const
  const query = useQuery();
  const contactDataId = query.get('id');

  //State
  const [name, setName] = React.useState<string>('');
  const [phoneNo, setPhoneNo] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [requirements, setRequirements] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      if (!contactDataId) {
        return;
      }
      const numId = Number(contactDataId);
      const contactData = await ContactDataService.getContactDataById(numId);
      setName(contactData?.name ?? 'N/A');
      setPhoneNo(contactData?.phoneNo ?? 'N/A');
      setEmail(contactData?.email ?? 'N/A');
      setRequirements(contactData?.requirements ?? 'N/A');
    })();
  }, [contactDataId]);

  return (
    <div>
      <Container sx={{}}>
        <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
          <Grid2 sx={{ ml: 0, flex: 1 }}>
            <FormControl fullWidth={true} disabled sx={{ m: 3 }} component="fieldset" variant="standard">
              <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'View Recently Connected'}</Typography>
              <TextField
                value={name}
                onChange={event => setName(name)}
                sx={{ mt: 2 }}
                required
                fullWidth
                label="Name"
              />
              <TextField
                value={phoneNo}
                onChange={event => setPhoneNo(phoneNo)}
                sx={{ mt: 2 }}
                fullWidth
                label="Phone"
              />

              <TextField value={email} onChange={event => setEmail(email)} sx={{ mt: 2 }} fullWidth label="Email" />

              <TextField
                value={requirements}
                onChange={event => setRequirements(requirements)}
                sx={{ mt: 2 }}
                fullWidth
                multiline
                label="Requirements"
                maxRows={4}
                id="filled-multiline-flexible"
              />
            </FormControl>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}

export default ViewContactData;

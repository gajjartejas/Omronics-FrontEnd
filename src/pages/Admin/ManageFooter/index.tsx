import { Button, Container, FormControlLabel, FormGroup, Link, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useEffect } from 'react';
import 'react-dropdown-tree-select/dist/styles.css';
import ManufacturerService from '../../../services/api-service/manufacturer/manufacturer';
import '../../../App.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useQuery from 'hooks/useQuery';
import { IBaseManufacturer } from '../../../services/api-service/manufacturer/types';
import Checkbox from '@mui/material/Checkbox';
import StaticPageDataService from '../../../services/api-service/static-page-data';
import { IStaticPageDataUpdate } from '../../../services/api-service/static-page-data/types';

function ManageFooter() {
  //Const
  const query = useQuery();
  const manufacturerId = query.get('id');
  const navigate = useNavigate();

  //State
  const [socialFacebook, setSocialFacebook] = React.useState('');
  const [socialTwitter, setSocialTwitter] = React.useState('');
  const [socialInstagram, setSocialInstagram] = React.useState('');
  const [socialYoutube, setSocialYoutube] = React.useState('');

  const [headquarterAddress, setHeadquarterAddress] = React.useState('');

  const [touch1Name, setTouch1Name] = React.useState('');
  const [touch1Phone1, setTouch1Phone1] = React.useState('');
  const [touch1Phone2, setTouch1Phone2] = React.useState('');
  const [touch1Email, setTouch1Email] = React.useState('');

  const [touch2Name, setTouch2Name] = React.useState('');
  const [touch2Phone1, setTouch2Phone1] = React.useState('');
  const [touch2Email, setTouch2Email] = React.useState('');

  const [saving, setSaving] = React.useState(false);

  useEffect(() => {
    (async () => {
      try {
        let data = await StaticPageDataService.getStaticPageDatumByIds([
          13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        ]);
        if (!data) {
          return;
        }
        const [
          { data: socialFacebook },
          { data: socialTwitter },
          { data: socialInstagram },
          { data: socialYoutube },

          { data: headquarterAddress },
          { data: touch1Name },
          { data: touch1Phone1 },
          { data: touch1Phone2 },
          { data: touch1Email },
          { data: touch2Name },
          { data: touch2Phone1 },
          { data: touch2Email },
        ] = data;

        setSocialFacebook(socialFacebook);
        setSocialTwitter(socialTwitter);
        setSocialInstagram(socialInstagram);
        setSocialYoutube(socialYoutube);

        setHeadquarterAddress(headquarterAddress);
        setTouch1Name(touch1Name);
        setTouch1Phone1(touch1Phone1);
        setTouch1Phone2(touch1Phone2);
        setTouch1Email(touch1Email);
        setTouch2Name(touch2Name);
        setTouch2Name(touch2Name);
        setTouch2Phone1(touch2Phone1);
        setTouch2Email(touch2Email);
      } catch (e) {}
    })();
  }, []);

  const onClickSave = async () => {
    setSaving(true);

    const data: IStaticPageDataUpdate[] = [
      { id: 13, data: socialFacebook },
      { id: 14, data: socialTwitter },
      { id: 15, data: socialInstagram },
      { id: 16, data: socialYoutube },

      { id: 17, data: headquarterAddress },
      { id: 18, data: touch1Name },
      { id: 19, data: touch1Phone1 },
      { id: 20, data: touch1Phone2 },
      { id: 21, data: touch1Email },
      { id: 22, data: touch2Name },
      { id: 23, data: touch2Phone1 },
      { id: 24, data: touch2Email },
    ];

    try {
      await StaticPageDataService.updateStaticPageDatum(data);
      toast.success('About US content saved successfully!');
    } catch (e) {
      toast.error('Error while saving data.');
    }
    setSaving(false);
  };

  return (
    <div>
      <Container sx={{}}>
        <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
          <Grid2 sx={{ ml: 0, flex: 1 }}>
            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'SOCIAL LINKS'}</Typography>

            <TextField
              value={socialFacebook}
              onChange={event => setSocialFacebook(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Twitter *"
            />
            <TextField
              value={socialTwitter}
              onChange={event => setSocialTwitter(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Twitter *"
            />
            <TextField
              value={socialInstagram}
              onChange={event => setSocialInstagram(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Instagram *"
            />
            <TextField
              value={socialYoutube}
              onChange={event => setSocialYoutube(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Youtube *"
            />

            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'OFFICE'}</Typography>

            <TextField
              value={headquarterAddress}
              onChange={event => setHeadquarterAddress(event.target.value)}
              sx={{ mt: 2 }}
              id="outlined-multiline-static"
              label="Address *"
              multiline
              fullWidth
              rows={4}
              defaultValue="Default Value"
            />

            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'GET IN TOUCH 1'}</Typography>
            <TextField
              value={touch1Name}
              onChange={event => setTouch1Name(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Name *"
            />
            <TextField
              value={touch1Phone1}
              onChange={event => setTouch1Phone1(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Phone 1 *"
            />
            <TextField
              value={touch1Phone2}
              onChange={event => setTouch1Phone2(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Phone 2 *"
            />
            <TextField
              value={touch1Email}
              onChange={event => setTouch1Email(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Email *"
            />

            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'GET IN TOUCH 2'}</Typography>
            <TextField
              value={touch2Name}
              onChange={event => setTouch2Name(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Name *"
            />
            <TextField
              value={touch2Phone1}
              onChange={event => setTouch2Phone1(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Phone *"
            />
            <TextField
              value={touch2Email}
              onChange={event => setTouch2Email(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Email *"
            />
          </Grid2>
        </Grid2>
        <Button disabled={saving} onClick={onClickSave} sx={{ mt: 2 }} variant="contained">
          {saving ? 'PLEASE WAIT...' : 'UPDATE'}
        </Button>
      </Container>
    </div>
  );
}

export default ManageFooter;

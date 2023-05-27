import { Button, Container, Link, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useEffect } from 'react';
import 'react-dropdown-tree-select/dist/styles.css';
import '../../../App.css';
import { toast } from 'react-toastify';
import StaticPageDataService from '../../../services/api-service/static-page-data';
import { IStaticPageDataUpdate } from '../../../services/api-service/static-page-data/types';

function ManageContactUS() {
  //Const

  //State
  const [headquarterAddress, setHeadquarterAddress] = React.useState('');
  const [headquarterEmail, setHeadquarterEmail] = React.useState('');

  const [touch1Name, setTouch1Name] = React.useState('');
  const [touch1Phone1, setTouch1Phone1] = React.useState('');
  const [touch1Phone2, setTouch1Phone2] = React.useState('');
  const [touch1Email, setTouch1Email] = React.useState('');

  const [touch2Name, setTouch2Name] = React.useState('');
  const [touch2Phone1, setTouch2Phone1] = React.useState('');
  const [touch2Email, setTouch2Email] = React.useState('');

  const [mapLink, setMapLink] = React.useState('');

  const [saving, setSaving] = React.useState(false);

  useEffect(() => {
    (async () => {
      try {
        let data = await StaticPageDataService.getStaticPageDatumByIds([3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        if (!data) {
          return;
        }
        const [
          { data: headquarterAddress },
          { data: headquarterEmail },
          { data: touch1Name },
          { data: touch1Phone1 },
          { data: touch1Phone2 },
          { data: touch1Email },
          { data: touch2Name },
          { data: touch2Phone1 },
          { data: touch2Email },
          { data: mapLink },
        ] = data;
        setHeadquarterAddress(headquarterAddress);
        setHeadquarterEmail(headquarterEmail);
        setTouch1Name(touch1Name);
        setTouch1Phone1(touch1Phone1);
        setTouch1Phone2(touch1Phone2);
        setTouch1Email(touch1Email);
        setTouch2Name(touch2Name);
        setTouch2Name(touch2Name);
        setTouch2Phone1(touch2Phone1);
        setTouch2Email(touch2Email);
        setMapLink(mapLink);
      } catch (e) {}
    })();
  }, []);

  const onClickSave = async () => {
    setSaving(true);

    const data: IStaticPageDataUpdate[] = [
      { id: 3, data: headquarterAddress },
      { id: 4, data: headquarterEmail },
      { id: 5, data: touch1Name },
      { id: 6, data: touch1Phone1 },
      { id: 7, data: touch1Phone2 },
      { id: 8, data: touch1Email },
      { id: 9, data: touch2Name },
      { id: 10, data: touch2Phone1 },
      { id: 11, data: touch2Email },
      { id: 12, data: mapLink },
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
            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'HEAD QUARTER'}</Typography>
            <TextField
              value={headquarterEmail}
              onChange={event => setHeadquarterEmail(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Email *"
            />
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

            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Map'}</Typography>
            <TextField
              value={mapLink}
              onChange={event => setMapLink(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Top Map Link (src link) *"
              multiline
              rows={4}
              defaultValue="Default Value"
            />
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                window.open(`https://www.maps.ie/create-google-map/`);
              }}>
              {'Create a Map'}
            </Link>
          </Grid2>
        </Grid2>
        <Button disabled={saving} onClick={onClickSave} sx={{ mt: 2 }} variant="contained">
          {saving ? 'PLEASE WAIT...' : 'UPDATE'}
        </Button>
      </Container>
    </div>
  );
}

export default ManageContactUS;

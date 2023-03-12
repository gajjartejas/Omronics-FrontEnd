import { Button, Container, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import 'react-dropdown-tree-select/dist/styles.css';
import ManufacturerService from 'services/api-service/manufacturer';
import { IBaseManufacturer, IManufacturer } from 'services/api-service/types';
import '../../../../App.css';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import useQuery from 'hooks/useQuery';

interface IAddManufacturer extends IManufacturer {
  children?: IManufacturer[];
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  expanded: boolean;
  selected: boolean;
}

function UpdateManufacturer() {
  //Const
  const query = useQuery();
  const manufacturerId = query.get('id');
  const navigate = useNavigate();

  //State
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      if (!manufacturerId) {
        return;
      }
      const numId = Number(manufacturerId);
      const manufacturer = await ManufacturerService.getManufactureById(numId);
      setName(manufacturer?.name ?? '');
      setDescription(manufacturer?.description ?? '');
    })();
  }, [manufacturerId]);

  const clearForm = () => {
    setName('');
    setDescription('');
  };

  const onClickSave = async () => {
    if (!name || name.trim().length < 1) {
      toast.error('Manufacturer name is required!');
      return;
    }

    const newManufacturer: IBaseManufacturer = {
      name: name,
      description: description,
    };
    const numId = Number(manufacturerId);
    const result = await ManufacturerService.updateManufacture(numId, newManufacturer);
    if (result) {
      toast.success('Manufacturer updated successfully!');
      clearForm();
      navigate(`/admin/dashboard/manufacturers`);
    }
  };

  return (
    <div>
      <Container sx={{}}>
        <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
          <Grid2 sx={{ ml: 0, flex: 1 }}>
            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Add Manufacturer'}</Typography>
            <TextField
              value={name}
              onChange={event => setName(event.target.value)}
              sx={{ mt: 2 }}
              required
              fullWidth
              label="Name"
            />
            <TextField
              value={description}
              onChange={event => setDescription(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Description"
            />
            <Button onClick={onClickSave} sx={{ mt: 2 }} variant="contained">
              {'UPDATE'}
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}

export default UpdateManufacturer;

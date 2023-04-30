import { Button, Container, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import 'react-dropdown-tree-select/dist/styles.css';
import ManufacturerService from '../../../../services/api-service/manufacturer/manufacturer';
import '../../../../App.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useQuery from 'hooks/useQuery';
import { IBaseManufacturer } from '../../../../services/api-service/manufacturer/types';
import Checkbox from '@mui/material/Checkbox';

function UpdateManufacturer() {
  //Const
  const query = useQuery();
  const manufacturerId = query.get('id');
  const navigate = useNavigate();

  //State
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [isFeatured, setIsFeatured] = React.useState<boolean>(false);
  const [isActive, setIsActive] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      if (!manufacturerId) {
        return;
      }
      const numId = Number(manufacturerId);
      const manufacturer = await ManufacturerService.getManufactureById(numId);
      if (!manufacturer) {
        return;
      }
      setName(manufacturer?.name ?? '');
      setDescription(manufacturer?.description ?? '');
      setIsFeatured(manufacturer?.featured);
      setIsActive(manufacturer?.active);
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
      featured: isFeatured,
      active: isActive,
    };
    const numId = Number(manufacturerId);
    const result = await ManufacturerService.updateManufacture(numId, newManufacturer);
    if (result) {
      toast.success('Manufacturer updated successfully!');
      clearForm();
      navigate(`/admin/dashboard/manufacturers`);
    }
  };

  const handleChangeFeaturedCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFeatured(event.target.checked);
  };

  const handleChangeActiveCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
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
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleChangeFeaturedCheckbox} checked={isFeatured} />}
                label="Featured Product"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleChangeActiveCheckbox} checked={isActive} />}
                label="Active Product"
              />
            </FormGroup>
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

import { Button, Container, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import 'react-dropdown-tree-select/dist/styles.css';
import ManufacturerService from 'services/api-service/manufacturer';
import { IBaseManufacturer, IManufacturer } from 'services/api-service/types';
import '../../../../App.css';
import { toast } from 'react-toastify';

interface IAddManufacturer extends IManufacturer {
  children?: IManufacturer[];
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  expanded: boolean;
  selected: boolean;
}

function AddManufacturer() {
  //State
  const [manufacturers, setManufacturers] = React.useState<IAddManufacturer[]>([]);
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      await getManufacturers();
    })();
  }, []);

  const clearForm = () => {
    setName('');
    setDescription('');

    let newManufacturers = [...manufacturers];
    newManufacturers.forEach(v => (v.selected = false));
    setManufacturers(newManufacturers);
  };

  const getManufacturers = async () => {
    let manufacturers = await ManufacturerService.getManufacturers();

    const hashTable = Object.create(null);
    manufacturers?.forEach(
      aData => (hashTable[aData.id] = { ...aData, label: aData.name, value: aData.name, children: [] }),
    );

    const dataTree: IAddManufacturer[] = [];
    manufacturers?.forEach(aData => {
      dataTree.push(hashTable[aData.id]);
    });

    console.log('tree', dataTree);
    setManufacturers(dataTree!);
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

    const result = await ManufacturerService.addManufacture(newManufacturer);
    if (result) {
      toast.success('Manufacturer saved successfully!');
      getManufacturers();
      clearForm();
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
              {'SAVE'}
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}

export default AddManufacturer;

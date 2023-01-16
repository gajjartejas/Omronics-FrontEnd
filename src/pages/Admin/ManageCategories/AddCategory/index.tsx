import { Button, Container, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useRef } from 'react';
import CategoryService from 'services/api-service/category';
import { IBaseCategory, ICategory } from 'services/api-service/types';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import '../../../../App.css';
//@ts-ignore
import { NotificationManager } from 'react-notifications';

interface IAddCategory extends ICategory {
  children?: ICategory[];
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  expanded: boolean;
  selected: boolean;
}

function AddCategory() {
  let selectedCategoryId = useRef<number | null>(null).current;
  const [categories, setCategories] = React.useState<IAddCategory[]>([]);

  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      await getCategories();
    })();
  }, []);

  const clearForm = () => {
    setName('');
    setDescription('');

    let newCategories = [...categories];
    newCategories.forEach(v => (v.selected = false));
    setCategories(newCategories);
  };

  const getCategories = async () => {
    let categories = await CategoryService.getCategories();

    const hashTable = Object.create(null);
    categories?.forEach(
      aData => (hashTable[aData.id] = { ...aData, label: aData.name, value: aData.name, children: [] }),
    );

    const dataTree: IAddCategory[] = [];
    categories?.forEach(aData => {
      if (aData.parentId) {
        hashTable[aData.parentId].children.push(hashTable[aData.id]);
      } else {
        dataTree.push(hashTable[aData.id]);
      }
    });

    console.log('tree', dataTree);
    setCategories(dataTree!);
  };

  const onChange = (currentNode: any, selectedNodes: any) => {
    console.log('onChange::', selectedNodes);
    if (selectedNodes && selectedNodes.length > 0) {
      selectedCategoryId = selectedNodes[0].id;
    }
  };

  const onAction = (node: any, action: any) => {
    console.log('onAction::', action, node);
  };

  const onNodeToggle = (currentNode: any) => {
    console.log('onNodeToggle::', currentNode);
  };

  const onClickSave = async () => {
    if (!name || name.trim().length < 1) {
      NotificationManager.error('Error', 'Category name is required!', 5000, () => {});
      return;
    }

    const newCategory: IBaseCategory = {
      name: name,
      description: description,
      parentId: selectedCategoryId,
    };

    const result = await CategoryService.addCategory(newCategory);
    if (result) {
      NotificationManager.success('Category saved successfully!');
      getCategories();
      clearForm();
    }
  };

  return (
    <div>
      <Container sx={{}}>
        <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
          <Grid2 sx={{ ml: 0, flex: 1 }}>
            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Add Category'}</Typography>
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
            <DropdownTreeSelect
              className="mdl-demo"
              texts={{ placeholder: 'Categories' }}
              data={categories}
              onChange={onChange}
              onAction={onAction}
              onNodeToggle={onNodeToggle}
              mode={'radioSelect'}
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

export default AddCategory;

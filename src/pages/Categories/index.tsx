import { Grid, Box, Container } from '@mui/material';
import '../../App.css';
import Components from '../../components';
import Typography from '@mui/material/Typography';
import CategoryService from '../../services/api-service/category';
import { ICategory } from '../../services/api-service/types';
import React, { useCallback, useEffect, useRef } from 'react';
import useQuery from '../../hooks/useQuery';
import { useNavigate } from 'react-router';

interface IAddCategory extends ICategory {
  children?: IAddCategory[];
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  expanded: boolean;
  selected: boolean;
}

function ProductList() {
  //Refs
  const refCategories = useRef<IAddCategory[]>([]);

  //Const
  const navigate = useNavigate();
  const query = useQuery();
  const categoryId = query.get('id');

  //State
  const [categories, setCategories] = React.useState<IAddCategory[]>([]);

  const getCategories = useCallback(async () => {
    let categories: ICategory[] | null = null;

    if (categoryId) {
      categories = await CategoryService.getChildCategoriesById(Number(categoryId));
    } else {
      categories = await CategoryService.getCategories();
    }

    const hashTable = Object.create(null);
    categories?.forEach(
      aData => (hashTable[aData.id] = { ...aData, label: aData.name, value: aData.name, children: [] }),
    );
    const dataTree: IAddCategory[] = [];
    categories?.forEach(aData => {
      if (aData.parentId && hashTable[aData.parentId]) {
        hashTable[aData.parentId].children.push(hashTable[aData.id]);
      } else {
        dataTree.push(hashTable[aData.id]);
      }
    });

    if (dataTree && dataTree.length < 1) {
      //Go to product page
      navigate(`/products?categoryId=${categoryId}`, { replace: true });
    } else {
      console.log('tree', dataTree);
      setCategories(dataTree!);
      refCategories.current = [...dataTree];
    }
  }, [categoryId]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const onPressCard = (index: number) => {
    let c = refCategories.current[index];
    navigate(`/categories?id=${c.id}`);
  };

  return (
    <div>
      <Box sx={{ pt: 8 }}>
        <Container sx={{}}>
          <Typography sx={{ mt: 8 }} variant="h4">
            {'Categories'}
          </Typography>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Grid container spacing={0} sx={{}}>
                {categories.map((item, index) => (
                  <Components.ProductCard
                    key={item.id}
                    index={index}
                    title={item.name}
                    description={item.description || ''}
                    image="https://cdn.shopify.com/s/files/1/0068/3235/7429/files/PLC_in_Automation_Equipment_large.png?v=1590164660"
                    onPress={onPressCard}
                  />
                ))}
              </Grid>
            </Grid>
            {/*<Pagination count={10} size="large" />*/}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default ProductList;

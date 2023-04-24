import { Grid, Box, Container, CircularProgress } from '@mui/material';
import '../../App.css';
import Components from '../../components';
import Typography from '@mui/material/Typography';
import CategoryService from '../../services/api-service/category/category';
import React, { useCallback, useEffect, useRef } from 'react';
import useQuery from '../../hooks/useQuery';
import { useNavigate } from 'react-router';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Config from '../../config';
import { ICategory } from '../../services/api-service/category/types';

interface IAddCategory extends ICategory {
  children?: IAddCategory[];
  name: string;
  imageUrl: string | null;
}

function Categories() {
  //Refs
  const refCategories = useRef<IAddCategory[]>([]);

  //Const
  const navigate = useNavigate();
  const query = useQuery();
  const categoryId = query.get('id');
  const { height } = useWindowDimensions();

  //State
  const [categories, setCategories] = React.useState<IAddCategory[]>([]);
  const [loading, setLoading] = React.useState(true);

  const getCategories = useCallback(async () => {
    let categories: ICategory[] | null = null;

    if (categoryId) {
      categories = await CategoryService.getChildCategoriesById(Number(categoryId));
    } else {
      categories = await CategoryService.getCategories();
    }
    setLoading(false);

    const hashTable = Object.create(null);
    categories?.forEach(
      aData =>
        (hashTable[aData.id] = {
          ...aData,
          name: aData.name,
          imageUrl:
            aData.images && aData.images.length > 0 && aData.images[0].url
              ? Config.Constants.CATEGORY_IMAGE_PATH + aData.images[0].url
              : null,
          children: [],
        }),
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
          {!loading && (
            <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Grid container spacing={0} sx={{}}>
                  {categories.map((item, index) => (
                    <Components.ProductCard
                      key={item.id}
                      index={index}
                      title={item.name}
                      description={item.description || ''}
                      image={item.imageUrl}
                      onPress={onPressCard}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
          {loading && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: height * 0.6 }}>
              <CircularProgress />
            </Box>
          )}
        </Container>
      </Box>
    </div>
  );
}

export default Categories;

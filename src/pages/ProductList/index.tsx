import { Grid, Box, Container } from '@mui/material';
import '../../App.css';
import Components from '../../components';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useQuery from '../../hooks/useQuery';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect } from 'react';
import CategoryService from '../../services/api-service/category';
import { ICategory } from '../../services/api-service/types';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function ProductList() {
  //Const
  const navigate = useNavigate();
  const query = useQuery();
  const categoryId = query.get('categoryId');

  //State
  const [category, setCategory] = React.useState<ICategory | null>(null);
  const [loading, setLoading] = React.useState(true);

  const getProductsByCategoryId = useCallback(async () => {
    if (!categoryId) {
      setLoading(false);
      return;
    }

    try {
      let category = await CategoryService.getProductsByCategoryId(Number(categoryId));
      setLoading(false);
      setCategory(category);
    } catch (e) {
      toast.error(JSON.stringify(e));
    }
  }, [categoryId]);

  useEffect(() => {
    getProductsByCategoryId();
  }, [getProductsByCategoryId]);

  const onPressCard = (index: number) => {
    if (!category || !category.product) {
      return;
    }
    const product = category.product[index];
    const productId = product.id;
    navigate(`/product?id=${productId}`);
  };

  return (
    <div>
      <Box sx={{ pt: 8 }}>
        <Container sx={{}}>
          <Typography sx={{ mt: 8 }} variant="h4">
            {'Products'}
          </Typography>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Grid container spacing={0} sx={{}}>
                {category?.product?.map((item, index) => (
                  <Components.ProductCard
                    key={index.toString()}
                    index={index}
                    title={item.name}
                    description={''}
                    image="https://cdn.shopify.com/s/files/1/0068/3235/7429/files/PLC_in_Automation_Equipment_large.png?v=1590164660"
                    onPress={onPressCard}
                  />
                ))}
              </Grid>

              {!loading && !(category && category?.product && category?.product?.length > 0) && (
                <Typography sx={{ mt: 8 }} variant="h6">
                  {'No products found.'}
                </Typography>
              )}
            </Grid>
            {/*<Pagination count={10} size="large" />*/}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default ProductList;

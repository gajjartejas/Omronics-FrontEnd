import { Grid, Box, Container, CircularProgress } from '@mui/material';
import '../../App.css';
import Components from '../../components';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useQuery from '../../hooks/useQuery';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import CategoryService from '../../services/api-service/category/category';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Config from '../../config';
import { IProduct } from '../../services/api-service/product/types';
import { ICategory } from '../../services/api-service/category/types';
import ProductService from '../../services/api-service/product/product';
import ManufacturerService from '../../services/api-service/manufacturer/manufacturer';

function ProductList() {
  //Const
  const navigate = useNavigate();
  const query = useQuery();
  const categoryId = query.get('categoryId');
  const manufacturerId = query.get('manufacturerId');

  const { height } = useWindowDimensions();

  //State
  const [categoryName, setCategoryName] = React.useState<string>('');
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [subCategories, setSubCategories] = React.useState<ICategory[]>([]);
  const [productsLoading, setProductsLoading] = React.useState(true);
  const [categoriesLoading, setCategoriesLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (categoryId) {
          let category = await CategoryService.getProductsByCategoryId(Number(categoryId));
          setProductsLoading(false);
          setCategoryName(category?.name || '');
          setProducts(category?.product || []);
        } else if (manufacturerId) {
          let category = await ManufacturerService.getProductsByManufacturerId(Number(manufacturerId));
          console.log('mmm', category);
          setProductsLoading(false);
          setCategoryName(category?.name || '');
          setProducts(category?.products || []);
        } else {
          let allProducts = await ProductService.getProducts();
          setProductsLoading(false);
          setCategoryName('');
          setProducts(allProducts || []);
        }
      } catch (e) {
        toast.error(JSON.stringify(e));
      }
    })();
  }, [categoryId, manufacturerId]);

  useEffect(() => {
    (async () => {
      if (!categoryId) {
        setCategoriesLoading(false);
        return;
      }
      try {
        let subCategories = await CategoryService.getChildCategoriesById(Number(categoryId));
        setSubCategories(subCategories || []);
        setCategoriesLoading(false);
      } catch (e) {
        toast.error(JSON.stringify(e));
      }
    })();
  }, [categoryId]);

  const onPressProduct = (index: number) => {
    if (!products) {
      return;
    }
    const product = products[index];
    const productId = product.id;
    navigate(`/product?id=${productId}`);
  };

  const onPressSubCategory = (index: number) => {
    const subCategory = subCategories[index];
    const subCategoryId = subCategory.id;
    navigate(`/products?categoryId=${subCategoryId}`);
  };

  return (
    <div>
      <Box sx={{ pt: 8, mb: 4 }}>
        <Container sx={{}}>
          {(categoryId !== null || manufacturerId !== null) && (
            <Typography sx={{ mt: 8 }} variant="h5">
              {`Products from ${categoryName}`}
            </Typography>
          )}
          {categoryId === null && manufacturerId === null && (
            <Typography sx={{ mt: 8 }} variant="h5">
              {`All Products`}
            </Typography>
          )}

          {!productsLoading && (
            <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1, mt: 4 }}>
              <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Grid container spacing={0} sx={{}}>
                  {products?.map((item, index) => (
                    <Components.ProductCard
                      key={index.toString()}
                      index={index}
                      title={item.name}
                      description={item.description || ''}
                      image={
                        item.images && item.images.length > 0 ? Config.Constants.IMAGE_PATH + item.images[0].url : null
                      }
                      onPress={onPressProduct}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
          {productsLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: height * 0.6 }}>
              <CircularProgress />
            </Box>
          )}
          {!productsLoading && !(products && products?.length > 0) && (
            <Typography sx={{ mt: 8 }} variant="h6">
              {'No products found.'}
            </Typography>
          )}

          {(categoryId !== null && manufacturerId === null) && (
            <Typography sx={{ mt: 8 }} variant="h5">
              {`More from ${categoryName}`}
            </Typography>
          )}

          {(categoryId !== null && manufacturerId === null) && !categoriesLoading && (
            <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1, mt: 2 }}>
              <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Grid container spacing={0} sx={{}}>
                  {subCategories?.map((item, index) => (
                    <Components.ProductCard
                      key={index.toString()}
                      index={index}
                      title={item.name}
                      description={item.description || ''}
                      image={
                        item.images && item.images.length > 0
                          ? Config.Constants.CATEGORY_IMAGE_PATH + item.images[0].url
                          : null
                      }
                      onPress={onPressSubCategory}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}

          {(categoryId !== null && manufacturerId === null) && categoriesLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: height * 0.6 }}>
              <CircularProgress />
            </Box>
          )}
          {(categoryId !== null && manufacturerId === null) &&
            !categoriesLoading &&
            !(subCategories && subCategories?.length > 0) && (
              <Typography sx={{ mt: 8 }} variant="h6">
                {'No categories found.'}
              </Typography>
            )}
        </Container>
      </Box>
    </div>
  );
}

export default ProductList;

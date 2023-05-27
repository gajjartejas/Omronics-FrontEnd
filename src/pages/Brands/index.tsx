import { Grid, Box, Container, CircularProgress } from '@mui/material';
import '../../App.css';
import Components from '../../components';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Config from '../../config';
import { IManufacturer } from '../../services/api-service/manufacturer/types';
import ManufacturerService from '../../services/api-service/manufacturer/manufacturer';

function Brands() {
  //Refs

  //Const
  const navigate = useNavigate();
  const { height } = useWindowDimensions();

  //State
  const [brands, setBrands] = React.useState<IManufacturer[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    (async () => {
      let brands = await ManufacturerService.getManufacturers();

      setLoading(false);

      setBrands(brands || []);
    })();
  }, [navigate]);

  const onPressCard = (index: number) => {
    window.open(`${window.location.origin}/products?manufacturerId=${brands[index].id}`);
  };

  return (
    <div>
      <Box sx={{ pt: 8, mb: 4 }}>
        <Container sx={{}}>
          <Typography sx={{ mt: 8 }} variant="h5">
            {'All Brands'}
          </Typography>
          {!loading && (
            <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1, mt: 2 }}>
              <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Grid container spacing={0} sx={{}}>
                  {brands.map((item, index) => (
                    <Components.ProductCard
                      key={item.id}
                      index={index}
                      title={item.name}
                      description={item.description || ''}
                      image={
                        item.images && item.images.length > 0
                          ? Config.Constants.MANUFACTURER_IMAGE_PATH + item.images[0].url
                          : null
                      }
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

export default Brands;

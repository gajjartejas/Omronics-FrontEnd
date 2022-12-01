import { Grid, Pagination } from '@mui/material';
import '../../App.css';
import Components from '../../components';
import useWindowDimensions from '../../hooks/useWindowDimensions';

function ProductList() {
  const { width } = useWindowDimensions();

  return (
    <div>
      <Grid container sx={{ alignItems: 'center', justifyContent: 'center', mt: 20, flex: 1 }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
          <Grid
            container
            spacing={0}
            sx={{
              width: width * 0.9,
            }}>
            {Array.from(Array(10)).map((_, index) => (
              <Components.ProductCard
                title="Lizard"
                description="Lizards are a widespread group of squamate"
                image="https://cdn.shopify.com/s/files/1/0068/3235/7429/files/PLC_in_Automation_Equipment_large.png?v=1590164660"
              />
            ))}
          </Grid>
        </Grid>
        <Pagination count={10} size="large" />
      </Grid>
    </div>
  );
}

export default ProductList;

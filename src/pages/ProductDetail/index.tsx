import '../../App.css';
import useQuery from '../../hooks/useQuery';
import React from 'react';
import ProductService from '../../services/api-service/product';
import Config from '../../config';
import { toast } from 'react-toastify';
import { Box, Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
import Image from 'mui-image';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

let Carousel = require('react-responsive-carousel').Carousel;

interface IProductImage {
  id: number;
  url: string;
}

interface IProductResources {
  id: number;
  title: string;
  link: string;
  description: string;
  type: string;
}

interface IProductCategory {
  id: number;
  name: string;
  description: string;
}

function ProductDetail() {
  //Const
  const query = useQuery();
  const productId = query.get('id');
  const { width } = useWindowDimensions();

  //State
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [partNumber, setPartNumber] = React.useState('');
  const [modelNumber, setModelNumber] = React.useState('');
  const [images, setImages] = React.useState<IProductImage[]>([]);
  const [files, setFiles] = React.useState<IProductResources[]>([]);
  const [categories, setCategories] = React.useState<IProductCategory[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      const numId = Number(productId);

      try {
        const productInfo = await ProductService.getProductById(numId);
        setLoading(false);
        if (!productInfo) {
          setError(true);
          return;
        }

        setName(productInfo.name ?? '');
        setDescription(productInfo?.description ?? '');
        setPartNumber(productInfo?.partNumber ?? '');
        setModelNumber(productInfo?.modelNumber ?? '');

        //Manufacturer
        console.log('productInfo.categories', productInfo.categories);

        //Categories
        let pCategories = productInfo.categories.map(v => {
          return {
            id: v.id,
            name: v.name || 'N/A',
            description: v.description || 'N/A',
          };
        });
        setCategories(pCategories);

        //Images
        let pImages = productInfo.images.map(v => {
          return {
            id: v.id,
            url: Config.Constants.IMAGE_PATH + v.url!,
          };
        });
        setImages(pImages);

        //Files
        let pFiles = productInfo.resourcees.map(v => {
          return {
            id: v.id,
            title: v.title || 'N/A',
            link: Config.Constants.FILE_PATH + v.link,
            description: v.description || 'N/A',
            type: v.type as unknown as string,
          };
        });

        setFiles(pFiles);
      } catch (e) {
        toast.error(JSON.stringify(e));
        setError(true);
      }
    })();
  }, [productId]);

  const onClickDownloadResources = (item: IProductResources, index: number) => {
    window.open(item.link);
  };

  return (
    <div>
      <Box sx={{ pt: 8 }}>
        <Container sx={{}}>
          {!loading && !error && (
            <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
              <Grid2 sx={{ mr: 2 }}>
                <Box sx={{ height: width * 0.25, width: width * 0.25 }}>
                  <Carousel
                    dynamicHeight={false}
                    showThumbs={true}
                    centerMode={false}
                    showStatus={true}
                    showArrows={true}
                    showIndicators={true}
                    interval={3000}
                    infiniteLoop={true}
                    emulateTouchy={true}
                    autoPlay={true}>
                    {images.map(v => {
                      return (
                        <Box key={v.id.toString()} sx={{ height: width * 0.25, width: width * 0.25 }}>
                          <Image fit={'contain'} src={v.url} width={'100%'} />
                        </Box>
                      );
                    })}
                  </Carousel>
                </Box>
              </Grid2>
              <Grid2 sx={{ ml: 0, flex: 1 }}>
                <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{name}</Typography>
                <Typography sx={{ mt: 2, fontSize: 20 }}>{description}</Typography>

                <div style={{ display: 'flex' }}>
                  <Typography sx={{ mt: 2, fontSize: 20 }}>{'Part Number: '}</Typography>
                  <Typography sx={{ mt: 2, fontSize: 20 }}>{partNumber}</Typography>
                </div>

                <div style={{ display: 'flex' }}>
                  <Typography sx={{ mt: 2, fontSize: 20, whiteSpace: 'pre-wrap' }}>{'Model Number: '}</Typography>
                  <Typography sx={{ mt: 2, fontSize: 20 }}>{modelNumber}</Typography>
                </div>

                <div style={{ display: 'flex' }}>
                  <Typography sx={{ mt: 2, fontSize: 20, whiteSpace: 'pre-wrap' }}>{'Categories: '}</Typography>
                  {categories.map(v => {
                    return (
                      <Typography key={v.id.toString()} sx={{ mt: 2, fontSize: 20 }}>
                        {v.name}
                      </Typography>
                    );
                  })}
                </div>
                <Typography sx={{ mt: 2, mb: 2, fontSize: 20, whiteSpace: 'pre-wrap' }}>{'Resources: '}</Typography>

                <div style={{ display: 'flex' }}>
                  {files.map((item, index) => {
                    return (
                      <Card sx={{ width: 200, mr: 2 }}>
                        <CardContent sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: 14, height: 50 }} gutterBottom>
                            {item.title}
                          </Typography>

                          <div style={{ display: 'flex' }}>
                            <Typography sx={{ mt: 2, fontSize: 14, whiteSpace: 'pre-wrap' }}>{'Type: '}</Typography>
                            <Typography sx={{ mt: 2, fontSize: 14 }}>{item.type}</Typography>
                          </div>
                        </CardContent>
                        <CardActions>
                          <Button onClick={() => onClickDownloadResources(item, index)} size="small">
                            {'DOWNLOAD'}
                          </Button>
                        </CardActions>
                      </Card>
                    );
                  })}
                </div>
              </Grid2>
            </Grid2>
          )}

          {!loading && error && (
            <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
              <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
                <Typography sx={{ mt: 8 }} variant="h6">
                  {'No product found.'}
                </Typography>
              </Grid2>
            </Grid2>
          )}
        </Container>
      </Box>
    </div>
  );
}

export default ProductDetail;

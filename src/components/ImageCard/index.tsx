import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button, CardActionArea, CardActions, CardContent, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Image from 'mui-image';
import { ImageType } from 'react-images-uploading';

interface Props {
  item?: ImageType | undefined;
  index?: number | undefined;
  mode: 'add_image' | 'show_image';
  onClick: () => void;
  onReplace?: ((item: ImageType, index: number) => void) | undefined;
  onRemove?: ((item: ImageType, index: number) => void) | undefined;
}

const ImageCard = (props: Props) => {
  const { item, index, mode, onClick, onReplace, onRemove } = props;

  return (
    <Card sx={{ maxWidth: 345, minWidth: 250, height: 220, mt: 2, mr: 2 }}>
      {mode === 'show_image' && (
        <CardActionArea>
          <CardContent>
            <Image style={{ height: 140 }} src={item!.dataURL!} alt="" />
          </CardContent>
        </CardActionArea>
      )}

      {mode === 'add_image' && (
        <CardActionArea sx={{ height: 220 }} onClick={onClick}>
          <Stack sx={{ paddingY: 4 }} spacing={2} justifyContent="center" alignItems="center">
            <AddPhotoAlternateIcon sx={{ fontSize: 50, color: 'primary' }} />
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {'ADD IMAGE'}
            </Typography>
          </Stack>
        </CardActionArea>
      )}

      {mode === 'show_image' && (
        <CardActions>
          <Button size="small" color="primary" onClick={() => onReplace!(item!, index!)}>
            {'Replace'}
          </Button>
          <Button size="small" color="primary" onClick={() => onRemove!(item!, index!)}>
            {'Delete'}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ImageCard;

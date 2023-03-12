import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button, CardActionArea, CardActions, CardContent, Container, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Image from 'mui-image';
import { UploadStatus } from 'pages/Admin/ManageProducts/AddProduct';
import { ImageType } from 'react-images-uploading';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorIcon from '@mui/icons-material/Error';
import LinkIcon from '@mui/icons-material/Link';

interface Props {
  item?: ImageType | undefined;
  index?: number | undefined;
  mode: 'add_image' | 'show_image';
  onClick: () => void;
  onReplace?: ((item: ImageType, index: number) => void) | undefined;
  onRemove?: ((item: ImageType, index: number) => void) | undefined;
  status?: UploadStatus;
}

const ImageCard = (props: Props) => {
  //Const
  const { item, index, mode, onClick, onReplace, onRemove, status } = props;

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
          {status === UploadStatus.PENDING && (
            <Button size="small" color="primary" onClick={() => onReplace!(item!, index!)}>
              {'Replace'}
            </Button>
          )}
          <Button size="small" color="primary" onClick={() => onRemove!(item!, index!)}>
            {'Delete'}
          </Button>
          <Container style={{ flex: 1 }} />
          {status === UploadStatus.UPLOADING && (
            <Typography noWrap sx={{ fontSize: 12, flexGrow: 1, fontStyle: 'italic' }}>
              {'Uploading...'}
            </Typography>
          )}
          {status === UploadStatus.FINISH && <DoneAllIcon style={{ color: 'green', fontSize: 20 }} />}
          {status === UploadStatus.ERROR && <ErrorIcon style={{ color: 'red', fontSize: 20 }} />}
          {status === UploadStatus.REMOTE && <LinkIcon style={{ color: 'green', fontSize: 20 }} />}
        </CardActions>
      )}
    </Card>
  );
};

export default ImageCard;

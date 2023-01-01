import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button, CardActionArea, CardActions, CardContent, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { FileContent } from 'use-file-picker';

interface Props {
  item?: FileContent | undefined;
  index?: number | undefined;
  mode: 'add_file' | 'show_file';
  onClick: () => void;
  onReplace?: ((item: FileContent, index: number) => void) | undefined;
  onRemove?: ((item: FileContent, index: number) => void) | undefined;
}

const ResourcesCard = (props: Props) => {
  const { item, index, mode, onClick, onReplace, onRemove } = props;

  return (
    <Card sx={{ maxWidth: 345, minWidth: 250, height: 220, mt: 2, mr: 2 }}>
      {mode === 'show_file' && (
        <CardActionArea>
          <CardContent>
            {/* <Image style={{ height: 140 }} src={item!.dataURL!} alt="" /> */}
          </CardContent>
        </CardActionArea>
      )}

      {mode === 'add_file' && (
        <CardActionArea sx={{ height: 220 }} onClick={onClick}>
          <Stack sx={{ paddingY: 4 }} spacing={2} justifyContent="center" alignItems="center">
            <AddPhotoAlternateIcon sx={{ fontSize: 50, color: 'primary' }} />
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {'ADD FILE'}
            </Typography>
          </Stack>
        </CardActionArea>
      )}

      {mode === 'show_file' && (
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

export default ResourcesCard;

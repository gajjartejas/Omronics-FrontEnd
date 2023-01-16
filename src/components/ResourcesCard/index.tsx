import NoteAdd from '@mui/icons-material/NoteAdd';
import TextSnippet from '@mui/icons-material/TextSnippet';
import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import { FileContent } from 'use-file-picker';

interface Props {
  item?: FileContent | undefined;
  resourcesType?: string | null;
  resourcesTypes?: string[];
  index?: number | undefined;
  mode: 'add_file' | 'show_file';
  onClick: () => void;
  onReplace?: ((item: FileContent, index: number) => void) | undefined;
  onRemove?: ((item: FileContent, index: number) => void) | undefined;
  onSelectResourcesType?: ((item: string, index: number) => void) | undefined;
}

const ResourcesCard = (props: Props) => {
  const { item, index, mode, resourcesType, onClick, onReplace, onRemove, onSelectResourcesType, resourcesTypes } =
    props;

  const handleChange = (event: SelectChangeEvent) => {
    onSelectResourcesType!(event.target.value, index!);
  };

  return (
    <Card sx={{ maxWidth: 345, minWidth: 250, height: 220, mt: 2, mr: 2 }}>
      {mode === 'show_file' && (
        <CardContent>
          <Stack style={{ height: 140 }} spacing={2} justifyContent="center" alignItems="center">
            <TextSnippet sx={{ fontSize: 50, color: 'primary' }} />
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {item?.name}
            </Typography>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-select-small">{'Type'}</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={resourcesType?.toString()}
                label="Type"
                onChange={handleChange}>
                {resourcesTypes?.map(v => {
                  return <MenuItem value={v}>{v}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      )}

      {mode === 'add_file' && (
        <CardActionArea sx={{ height: 220 }} onClick={onClick}>
          <Stack sx={{ paddingY: 4 }} spacing={2} justifyContent="center" alignItems="center">
            <NoteAdd sx={{ fontSize: 50, color: 'primary' }} />
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

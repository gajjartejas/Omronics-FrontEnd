import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import useWindowDimensions from '../../hooks/useWindowDimensions';

interface Props {
  image?: string | undefined;
  title: string;
  description: string;
}

const ProductCard: React.FC<Props> = (props: Props) => {
  const { width } = useWindowDimensions();

  const { image, title, description } = props;
  const horizontalSpacing = 1;
  return (
    <Card
      sx={{
        width: (width * 0.9 - 80 * horizontalSpacing) / 5,
        marginX: horizontalSpacing,
        my: 2,
      }}>
      <CardActionArea>
        <CardMedia component="img" height="180" image={image} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;

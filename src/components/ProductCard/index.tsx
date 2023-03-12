import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import useWindowDimensions from '../../hooks/useWindowDimensions';

interface IProps {
  image?: string | undefined;
  title: string;
  description: string;
  index: number;
  onPress: (index: number) => void;
}

const ProductCard: React.FC<IProps> = (props: IProps) => {
  //Const
  const { image, title, description, index, onPress } = props;
  const horizontalSpacing = 1;

  return (
    <Card
      onClick={() => {
        onPress(index);
      }}
      sx={{
        width: 200,
        marginX: horizontalSpacing,
        my: 2,
      }}>
      <CardActionArea>
        <CardMedia component="img" height="180" image={image} alt="green iguana" />
        <CardContent>
          <Typography
            sx={{
              fontSize: 16,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
            gutterBottom
            component="div">
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

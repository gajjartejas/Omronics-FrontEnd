import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Image from 'mui-image';
import Config from '../../config';

interface IProps {
  image: string | null;
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
        <Image height="180" src={image ? image : Config.Images.svgs.image_placeholder.default} alt="green iguana" />
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
          <Typography
            sx={{
              fontSize: 14,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
            variant="body2"
            color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, ButtonBase, Stack } from '@mui/material';
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
    <ButtonBase>
      <Box
        onClick={() => {
          onPress(index);
        }}
        sx={{
          width: 240,
          padding: 2,
          marginX: horizontalSpacing,
          my: 1,
          background: 'white',
          minHeight: 240,
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: 3,
        }}>
        <Stack>
          <Image
            fit={'contain'}
            style={{
              height: 170,
            }}
            src={image ? image : Config.Images.svgs.image_placeholder.default}
            alt="green iguana"
          />
        </Stack>

        <Typography
          sx={{
            fontSize: 16,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: description && description.trim().length > 0 ? 1 : 2,
            mt: 2,
            textAlign: 'start',
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
            WebkitLineClamp: 1,
            textAlign: 'start',
          }}
          variant="body2"
          color="text.secondary"
          gutterBottom
          component="div">
          {description}
        </Typography>
      </Box>
    </ButtonBase>
  );
};

export default ProductCard;

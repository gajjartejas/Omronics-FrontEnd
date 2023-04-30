import { Button, Container, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useRef } from 'react';
import CoverImageService from '../../../../services/api-service/cover-image/cover-image';
import 'react-dropdown-tree-select/dist/styles.css';
import '../../../../App.css';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import Components from '../../../../components';
import { UploadStatus } from '../../ManageProducts/AddProduct';
import FileUploader, { FileUploaderResult } from '../../../../services/file-uploader';
import PQueue from 'p-queue';
import AppHelpers from '../../../../helpers';
import Checkbox from '@mui/material/Checkbox';
import { IBaseCoverImage } from '../../../../services/api-service/cover-image/types';

const MAX_IMAGE_UPLOAD = 1;

function AddCoverImage() {
  const selectedCoverImageId = useRef<number | null>(null);

  //Images
  const [images, setImages] = React.useState<ImageType[]>([]);
  const [isImageUploading, setIsImageUploading] = React.useState<boolean>(false);

  //Other
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [isActive, setIsActive] = React.useState<boolean>(true);

  const clearForm = () => {
    setTitle('');
    setDescription('');

    setIsImageUploading(false);
    setImages([]);
    selectedCoverImageId.current = null;

    setIsActive(true);
  };

  const onClickSave = async () => {
    if (!title || title.trim().length < 1) {
      toast.error('Title is required!');
      return;
    }

    if (!images || images.length < 1) {
      toast.error('Cover image is required!');
      return;
    }

    const newCoverImage: IBaseCoverImage = {
      title: title,
      description: description,
      url: images[0].remoteFileName,
      active: isActive,
    };

    const result = await CoverImageService.addCoverImage(newCoverImage);
    if (result) {
      toast.success('Cover image saved successfully!');
      clearForm();
    }
  };

  const onChangeImage = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    let updatedImages = imageList.map((v, i) => {
      let newImage: ImageType = {
        ...v,
        id: v.id || uuidv4(),
        status: v.status || UploadStatus.PENDING,
        remoteFileName: v.remoteFileName || null,
      };
      return newImage;
    });
    setImages(updatedImages);
  };

  const onImageRemoveServer = async (item: ImageType, index: number, callback: (index: number) => void) => {
    if (images[index].remoteFileName) {
      try {
        const productImageId = Number(item.id);
        await CoverImageService.deleteCoverImage(productImageId);
        await FileUploader.deleteFile<FileUploaderResult>('', new FormData(), {
          p: 'cover-images',
          del: images[index].remoteFileName,
        });
        callback(index);
      } catch (e) {
        toast.error(JSON.stringify(e));
      }
    } else {
      callback(index);
    }
  };

  const onClickUploadImage = () => {
    let isAllImageUploaded = images.filter(v => v.status !== UploadStatus.FINISH).length === 0;
    if (isAllImageUploaded) {
      toast.warning('No new image to upload');
      return;
    }

    setIsImageUploading(true);

    //Set uploading status for pending uploads
    let updatedImages = images.map(v => {
      return { ...v, status: v.status === UploadStatus.PENDING ? UploadStatus.UPLOADING : v.status };
    });
    setImages([...updatedImages]);

    const queue = new PQueue({ concurrency: 2 });
    queue.on('idle', () => {
      console.log(`Queue is idle.  Size: ${queue.size}  Pending: ${queue.pending}`);
      setIsImageUploading(false);
      toast.info('File upload complete.');
    });

    queue.on('error', error => {
      console.error('Error IN FILE UPLOAD:', error);
    });

    queue.on('completed', (result: FileUploaderResult) => {
      console.log('completed:', result);

      setImages(v => {
        let updatedImages1 = [...v];
        updatedImages1[result.index].status =
          result && result.data && result.data.name ? UploadStatus.FINISH : UploadStatus.ERROR;
        updatedImages1[result.index].remoteFileName =
          result && result.data && result.data.name ? result.data.name : null;
        return updatedImages1;
      });
    });

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.status === UploadStatus.FINISH) {
        continue;
      }
      const data = new FormData();
      data.append('file', image.file!);
      const params = { p: 'cover-images' };
      let promise = FileUploader.upload<FileUploaderResult>('', data, params, i);
      queue.add(() => promise);
    }
  };

  const handleChangeActiveCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
  };

  return (
    <div>
      <Container sx={{}}>
        <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
          <Grid2 sx={{ ml: 0, flex: 1 }}>
            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Add Cover Image'}</Typography>
            <TextField
              value={title}
              onChange={event => setTitle(event.target.value)}
              sx={{ mt: 2 }}
              required
              fullWidth
              label="Name"
            />
            <TextField
              value={description}
              onChange={event => setDescription(event.target.value)}
              sx={{ mt: 2 }}
              id="outlined-multiline-static"
              label="Description"
              multiline
              fullWidth
              rows={4}
              defaultValue="Default Value"
            />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleChangeActiveCheckbox} checked={isActive} />}
                label="Active"
              />
            </FormGroup>
            <Typography sx={{ mt: 2, mb: 1, fontSize: 16, fontWeight: 400 }}>{'Images'}</Typography>
            <ImageUploading multiple value={images} onChange={onChangeImage} maxNumber={MAX_IMAGE_UPLOAD}>
              {({ imageList, onImageUpload, onImageUpdate, onImageRemove, errors }) => (
                <>
                  <Grid container direction="row" justifyContent="left" alignItems="center" sx={{}}>
                    <Components.ImageCard mode={'add_image'} onClick={onImageUpload} />
                    {imageList.map((image, index) => (
                      <Components.ImageCard
                        key={images[index].id}
                        index={index}
                        item={images[index]}
                        status={images[index].status}
                        mode={'show_image'}
                        onClick={onImageUpload}
                        onReplace={(item, index) => onImageUpdate(index)}
                        onRemove={() => onImageRemoveServer(image, index, onImageRemove)}
                      />
                    ))}
                  </Grid>
                  <Typography sx={{ mt: 2, mb: 1, fontSize: 16, fontWeight: 400, color: 'red' }}>
                    {AppHelpers.getReadableError(MAX_IMAGE_UPLOAD, errors)}
                  </Typography>
                  <Typography sx={{ mt: 2, mb: 1, fontSize: 16, fontWeight: 400, color: 'black' }}>
                    {'Note: Accept ration should be 3:1 to 4:1\n Ex: 1440x560, 1000X300 etc'}
                  </Typography>
                </>
              )}
            </ImageUploading>
            <Button disabled={isImageUploading} onClick={onClickUploadImage} sx={{ mt: 2, mb: 2 }} variant="contained">
              {isImageUploading ? 'PLEASE WAIT...' : 'UPLOAD IMAGES'}
            </Button>
          </Grid2>
        </Grid2>
        <Button onClick={onClickSave} sx={{ mt: 2 }} variant="contained">
          {'SAVE'}
        </Button>
      </Container>
    </div>
  );
}

export default AddCoverImage;

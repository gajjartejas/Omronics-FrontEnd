import { Button, Container, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import 'react-dropdown-tree-select/dist/styles.css';
import '../../../../App.css';
import { toast } from 'react-toastify';
import { IBaseManufacturer, IManufacturer } from '../../../../services/api-service/manufacturer/types';
import Checkbox from '@mui/material/Checkbox';
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { UploadStatus } from '../../ManageProducts/AddProduct';
import ManufacturerImageService from '../../../../services/api-service/manufacturer/manufacturer-image';
import FileUploader, { FileUploaderResult } from '../../../../services/file-uploader';
import PQueue from 'p-queue';
import Components from '../../../../components';
import AppHelpers from '../../../../helpers';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import ManufacturerService from 'services/api-service/manufacturer/manufacturer';

const MAX_IMAGE_UPLOAD = 1;

interface IAddManufacturer extends IManufacturer {
  children?: IManufacturer[];
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  expanded: boolean;
  selected: boolean;
}

function AddManufacturer() {
  //State
  const [images, setImages] = React.useState<ImageType[]>([]);
  const [isImageUploading, setIsImageUploading] = React.useState<boolean>(false);

  const [manufacturers, setManufacturers] = React.useState<IAddManufacturer[]>([]);
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [isFeatured, setIsFeatured] = React.useState<boolean>(false);
  const [isActive, setIsActive] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      await getManufacturers();
    })();
  }, []);

  const clearForm = () => {
    setName('');
    setDescription('');

    let newManufacturers = [...manufacturers];
    newManufacturers.forEach(v => (v.selected = false));
    setManufacturers(newManufacturers);

    setIsFeatured(false);
    setIsActive(true);
  };

  const getManufacturers = async () => {
    let manufacturers = await ManufacturerService.getManufacturers();

    const hashTable = Object.create(null);
    manufacturers?.forEach(
      aData => (hashTable[aData.id] = { ...aData, label: aData.name, value: aData.name, children: [] }),
    );

    const dataTree: IAddManufacturer[] = [];
    manufacturers?.forEach(aData => {
      dataTree.push(hashTable[aData.id]);
    });

    console.log('tree', dataTree);
    setManufacturers(dataTree!);
  };

  const onClickSave = async () => {
    if (!name || name.trim().length < 1) {
      toast.error('Manufacturer name is required!');
      return;
    }

    let imagesToCreate = images.map(v => {
      return { url: v.remoteFileName as string };
    });

    const newManufacturer: IBaseManufacturer = {
      name: name,
      description: description,
      images: { create: imagesToCreate },
      featured: isFeatured,
      active: isActive,
    };

    const result = await ManufacturerService.addManufacture(newManufacturer);
    if (result) {
      toast.success('Manufacturer saved successfully!');
      getManufacturers();
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
        await ManufacturerImageService.deleteManufacturerImage(productImageId);
        await FileUploader.deleteFile<FileUploaderResult>('', new FormData(), {
          p: 'manufacturers-images',
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
      const params = { p: 'manufacturers-images' };
      let promise = FileUploader.upload<FileUploaderResult>('', data, params, i);
      queue.add(() => promise);
    }
  };

  const handleChangeFeaturedCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFeatured(event.target.checked);
  };

  const handleChangeActiveCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
  };

  return (
    <div>
      <Container sx={{}}>
        <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
          <Grid2 sx={{ ml: 0, flex: 1 }}>
            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Add Manufacturer'}</Typography>
            <TextField
              value={name}
              onChange={event => setName(event.target.value)}
              sx={{ mt: 2 }}
              required
              fullWidth
              label="Name"
            />
            <TextField
              value={description}
              onChange={event => setDescription(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Description"
            />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleChangeFeaturedCheckbox} checked={isFeatured} />}
                label="Featured"
              />
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

export default AddManufacturer;

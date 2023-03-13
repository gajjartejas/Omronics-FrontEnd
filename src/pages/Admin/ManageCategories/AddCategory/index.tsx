import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useRef } from 'react';
import CategoryService from 'services/api-service/category';
import { IBaseCategory, ICategory } from 'services/api-service/types';
import DropdownTreeSelect from 'react-dropdown-tree-select';
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
import CategoryImageService from '../../../../services/api-service/category-image';

interface IAddCategory extends ICategory {
  children?: ICategory[];
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  expanded: boolean;
  selected: boolean;
}

const MAX_IMAGE_UPLOAD = 1;

function AddCategory() {
  let selectedCategoryId = useRef<number | null>(null).current;

  //Images
  const [images, setImages] = React.useState<ImageType[]>([]);
  const [isImageUploading, setIsImageUploading] = React.useState<boolean>(false);

  //Other
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [categories, setCategories] = React.useState<IAddCategory[]>([]);

  React.useEffect(() => {
    (async () => {
      await getCategories();
    })();
  }, []);

  const clearForm = () => {
    setName('');
    setDescription('');

    let newCategories = [...categories];
    newCategories.forEach(v => (v.selected = false));
    setCategories(newCategories);
  };

  const getCategories = async () => {
    let categories = await CategoryService.getCategories();

    const hashTable = Object.create(null);
    categories?.forEach(
      aData => (hashTable[aData.id] = { ...aData, label: aData.name, value: aData.name, children: [] }),
    );

    const dataTree: IAddCategory[] = [];
    categories?.forEach(aData => {
      if (aData.parentId) {
        hashTable[aData.parentId].children.push(hashTable[aData.id]);
      } else {
        dataTree.push(hashTable[aData.id]);
      }
    });

    setCategories(dataTree!);
  };

  const onChange = (currentNode: any, selectedNodes: any) => {
    if (selectedNodes && selectedNodes.length > 0) {
      selectedCategoryId = selectedNodes[0].id;
    }
  };

  const onAction = (node: any, action: any) => {};

  const onNodeToggle = (currentNode: any) => {};

  const onClickSave = async () => {
    if (!name || name.trim().length < 1) {
      toast.error('Category name is required!');
      return;
    }

    let imagesToCreate = images.map(v => {
      return { url: v.remoteFileName as string };
    });

    const newCategory: IBaseCategory = {
      name: name,
      description: description,
      parentId: selectedCategoryId,
      images: { create: imagesToCreate },
    };

    const result = await CategoryService.addCategory(newCategory);
    if (result) {
      toast.success('Category saved successfully!');
      getCategories();
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
        await CategoryImageService.deleteCategoryImage(productImageId);
        await FileUploader.deleteFile<FileUploaderResult>('', new FormData(), {
          p: 'categories',
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
      const params = { p: 'categories' };
      let promise = FileUploader.upload<FileUploaderResult>('', data, params, i);
      queue.add(() => promise);
    }
  };

  return (
    <div>
      <Container sx={{}}>
        <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
          <Grid2 sx={{ ml: 0, flex: 1 }}>
            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Add Category'}</Typography>
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
            <DropdownTreeSelect
              className="mdl-demo"
              texts={{ placeholder: 'Categories' }}
              data={categories}
              onChange={onChange}
              onAction={onAction}
              onNodeToggle={onNodeToggle}
              mode={'radioSelect'}
            />
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

export default AddCategory;

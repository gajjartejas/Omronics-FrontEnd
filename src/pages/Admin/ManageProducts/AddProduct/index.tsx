import { Button, Container, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useEffect, useRef } from 'react';
import Components from 'components';
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { useFilePicker } from 'use-file-picker';
import CategoryService from '../../../../services/api-service/category/category';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import ManufacturerService from '../../../../services/api-service/manufacturer/manufacturer';
import ProductService from '../../../../services/api-service/product/product';
import PQueue from 'p-queue';
import FileUploader, { FileUploaderResult } from 'services/file-uploader';
import { toast } from 'react-toastify';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import ProductImageService from '../../../../services/api-service/product/product-image';
import ProductResourceService from '../../../../services/api-service/product-resource';
import { useNavigate } from 'react-router';
import AppHelpers from '../../../../helpers';
import { ICategory } from '../../../../services/api-service/category/types';
import { IManufacturer } from '../../../../services/api-service/manufacturer/types';
import { IBaseConnectId } from '../../../../services/api-service/types';
import { IBaseProductResource } from '../../../../services/api-service/product-resource/types';
import { IBaseProduct } from '../../../../services/api-service/product/types';
import Checkbox from '@mui/material/Checkbox';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MAX_IMAGE_UPLOAD = 50;
const MAX_FILE_UPLOAD = 50;

interface IAddCategory extends ICategory {
  children?: ICategory[];
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  expanded: boolean;
  selected: boolean;
}

interface IAddManufacturer extends IManufacturer {
  children?: IManufacturer[];
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  expanded: boolean;
  selected: boolean;
}

export enum UploadStatus {
  PENDING,
  UPLOADING,
  FINISH,
  ERROR,
  REMOTE,
}

// @ts-ignore
export interface FileContentExtra {
  id: string;
  file: File | null;
  status: UploadStatus;
  type: string | null;
  remoteFileName: string | null;
  title: string | null;
}

function AddProduct() {
  //Refs
  const refFileReplaceIndex = useRef<number | null>(null);
  const selectedManufacturerId = useRef<IBaseConnectId | null>(null);
  const selectedCategoryIds = useRef<IBaseConnectId[]>([]);

  //Const
  let navigate = useNavigate();

  //Images
  const [images, setImages] = React.useState<ImageType[]>([]);
  const [isImageUploading, setIsImageUploading] = React.useState<boolean>(false);

  //Files
  const [files, setFiles] = React.useState<FileContentExtra[]>([]);
  const [isFileUploading, setIsFileUploading] = React.useState<boolean>(false);

  //Fields
  const [categories, setCategories] = React.useState<IAddCategory[]>([]);
  const [manufacturers, setManufacturers] = React.useState<IAddManufacturer[]>([]);
  const [partNumber, setPartNumber] = React.useState('');
  const [modelNumber, setModelNumber] = React.useState('');
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [isProductCreating, setIsProductCreating] = React.useState<boolean>(false);
  const [isFeatured, setIsFeatured] = React.useState<boolean>(false);
  const [isActive, setIsActive] = React.useState<boolean>(true);
  const [editorLoaded, setEditorLoaded] = React.useState<boolean>(false);

  //Other
  const [openFileSelector, { plainFiles }] = useFilePicker({
    readAs: 'DataURL',
    accept: ['.zip', '.pdf', '.exe', '.doc', '.docx'],
    readFilesContent: false,
    multiple: true,
    limitFilesConfig: { max: MAX_FILE_UPLOAD },
    // minFileSize: 1,
    maxFileSize: 200, // in megabytes
  });

  React.useEffect(() => {
    (async () => {
      await getCategories();
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      await getManufacturers();
    })();
  }, []);

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

  useEffect(() => {
    if (plainFiles && plainFiles.length > 0) {
      console.log('filesContent', plainFiles[0].name);
      console.log('filesContent', plainFiles[0].webkitRelativePath);
    }

    if (!plainFiles || plainFiles.length < 1) {
      return;
    }
    console.log('filesContent........', plainFiles);

    if (refFileReplaceIndex.current !== null) {
      setFiles(f => {
        let newFiles = [...f];
        newFiles[refFileReplaceIndex.current!] = {
          file: plainFiles[0],
          id: uuidv4(),
          status: UploadStatus.PENDING,
          type: null,
          remoteFileName: null,
          title: null,
        };
        return newFiles;
      });
    } else {
      console.log('setFiles........');
      let newFileContents = plainFiles.map(v => {
        return {
          file: v,
          id: uuidv4(),
          status: UploadStatus.PENDING,
          type: null,
          remoteFileName: null,
          title: null,
        };
      });
      setFiles(f => [...f, ...newFileContents]);
    }
  }, [plainFiles]);

  // Finish!
  function handleEditorChange({ html, text }: any) {
    setDescription(text);
  }

  const onChangeImage = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    console.log('addUpdateIndex', addUpdateIndex);
    console.log('imageList', imageList);

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

  const onFileUpload = () => {};

  const onFileUpdate = (item: FileContentExtra, index: number) => {
    refFileReplaceIndex.current = index;

    openFileSelector();
  };

  const onFileRemove = async (item: FileContentExtra, index: number) => {
    if (files[index].remoteFileName) {
      try {
        const productResourcesId = Number(item.id);
        await ProductResourceService.deleteProductResource(productResourcesId);
        await FileUploader.deleteFile<FileUploaderResult>('', new FormData(), {
          p: 'resources',
          del: files[index].remoteFileName,
        });
        const newFiles = files.filter(v => v !== item);
        setFiles(newFiles);
      } catch (e) {
        toast.error(JSON.stringify(e));
      }
    } else {
      let newFiles = files.filter(v => v !== item);
      setFiles(newFiles);
    }
  };

  const onFileSelectResourcesType = (item: string, index: number) => {
    setFiles(v => {
      let newFiles = [...v];
      newFiles[index].type = item;
      return newFiles;
    });
  };

  ///
  const onChangeManufacturerTreeSelect = (currentNode: any, selectedNodes: any) => {
    console.log('onChange::', selectedNodes);
    if (selectedNodes && selectedNodes.length > 0) {
      selectedManufacturerId.current = { id: selectedNodes[0].id };
    }
  };

  const onActionManufacturerTreeSelect = (node: any, action: any) => {
    console.log('onAction::', action, node);
  };

  const onNodeToggleManufacturerTreeSelect = (currentNode: any) => {
    console.log('onNodeToggle::', currentNode);
  };

  ///
  const onChangeCategoriesTreeSelect = (currentNode: any, selectedNodes: any) => {
    console.log('onChange::', selectedNodes);
    selectedCategoryIds.current = selectedNodes
      .filter((v: any) => !(v.children && v.children.length > 0))
      .map((v: any) => {
        return { id: v.id };
      });
  };

  const onActionCategoriesTreeSelect = (node: any, action: any) => {
    console.log('onAction::', action, node);
  };

  const onNodeToggleCategoriesTreeSelect = (currentNode: any) => {
    console.log('onNodeToggle::', currentNode);
  };

  //
  const onClickSave = async () => {
    if (!name || name.trim().length < 1) {
      toast.error('Product name is required!');
      return;
    }
    if (!name || name.trim().length < 1) {
      toast.error('Product name is required!');
      return;
    }

    if (!selectedManufacturerId.current) {
      toast.error('Manufacturer is required!');
      return;
    }

    if (!selectedCategoryIds.current || selectedCategoryIds.current.length < 1) {
      toast.error('Category is required!');
      return;
    }

    let imagesToCreate = images.map(v => {
      return { url: v.remoteFileName as string };
    });

    let resourceesToCreate = files.map(v => {
      return {
        link: v.remoteFileName,
        type: v.type as any,
        title: v.file?.name || '',
        description: '',
      } as IBaseProductResource;
    });

    const newProduct: IBaseProduct = {
      name: name,
      description: description,
      partNumber: partNumber,
      modelNumber: modelNumber,
      categories: { connect: selectedCategoryIds.current },
      images: { create: imagesToCreate },
      resourcees: { create: resourceesToCreate },
      manufacturer: { connect: selectedManufacturerId.current },
      featured: isFeatured,
      active: isActive,
    };

    setIsProductCreating(true);
    try {
      const result = await ProductService.addProduct(newProduct);
      if (result) {
        toast.success('Product added successfully!');
        navigate('/admin/dashboard/products');
      }
    } catch (e) {
      toast.error(JSON.stringify(e));
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
      const params = { p: 'images' };
      let promise = FileUploader.upload<FileUploaderResult>('', data, params, i);
      queue.add(() => promise);
    }
  };

  const onClickUploadFile = () => {
    let isAllFileUploaded = files.filter(v => v.status !== UploadStatus.FINISH).length === 0;
    if (isAllFileUploaded) {
      toast.warning('No new file to upload');
      return;
    }
    setIsFileUploading(true);

    //Set uploading status for pending uploads
    let updatedFiles = files.map(v => {
      return { ...v, status: v.status === UploadStatus.PENDING ? UploadStatus.UPLOADING : v.status };
    });
    setFiles([...updatedFiles]);

    const queue = new PQueue({ concurrency: 2 });

    queue.on('idle', () => {
      console.log(`Queue is idle.  Size: ${queue.size}  Pending: ${queue.pending}`);
      setIsFileUploading(false);
      toast.info('File upload complete.');
    });

    queue.on('error', error => {
      console.error('Error IN FILE UPLOAD:', error);
    });

    queue.on('completed', (result: FileUploaderResult) => {
      console.log('completed:', result);

      setFiles(v => {
        let updatedFiles1 = [...v];
        updatedFiles1[result.index].status =
          result && result.data && result.data.name ? UploadStatus.FINISH : UploadStatus.ERROR;
        updatedFiles1[result.index].remoteFileName =
          result && result.data && result.data.name ? result.data.name : null;
        return updatedFiles1;
      });
    });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.status === UploadStatus.FINISH) {
        continue;
      }
      const data = new FormData();
      data.append('file', file.file!);
      const params = { p: 'resources' };
      let promise = FileUploader.upload<FileUploaderResult>('', data, params, i);
      queue.add(() => promise);
    }
  };

  const onImageRemoveServer = async (item: ImageType, index: number, callback: (index: number) => void) => {
    if (images[index].remoteFileName) {
      try {
        const productImageId = Number(item.id);
        await ProductImageService.deleteProductImage(productImageId);
        await FileUploader.deleteFile<FileUploaderResult>('', new FormData(), {
          p: 'images',
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
            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Add Product'}</Typography>
            <TextField
              value={name}
              onChange={event => setName(event.target.value)}
              sx={{ mt: 2 }}
              required
              fullWidth
              label="Name"
            />
            <Typography sx={{ mt: 2, mb: 1, fontSize: 16, fontWeight: 400 }}>{'Description'}</Typography>
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onReady={() => {
                setEditorLoaded(true);
              }}
              onChange={handleEditorChange}
            />

            <TextField
              value={partNumber}
              onChange={event => setPartNumber(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Part Number"
            />
            <TextField
              value={modelNumber}
              onChange={event => setModelNumber(event.target.value)}
              sx={{ mt: 2 }}
              fullWidth
              label="Model Number"
            />
            <DropdownTreeSelect
              className="mdl-demo"
              texts={{ placeholder: 'Manufacturer' }}
              data={manufacturers}
              onChange={onChangeManufacturerTreeSelect}
              onAction={onActionManufacturerTreeSelect}
              onNodeToggle={onNodeToggleManufacturerTreeSelect}
              mode={'simpleSelect'}
            />
            <DropdownTreeSelect
              className="mdl-demo"
              texts={{ placeholder: 'Categories' }}
              data={categories}
              onChange={onChangeCategoriesTreeSelect}
              onAction={onActionCategoriesTreeSelect}
              onNodeToggle={onNodeToggleCategoriesTreeSelect}
              mode={'hierarchical'}
            />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleChangeFeaturedCheckbox} checked={isFeatured} />}
                label="Featured Product"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleChangeActiveCheckbox} checked={isActive} />}
                label="Active Product"
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
                  <Typography
                    sx={{
                      mt: 2,
                      mb: 1,
                      fontSize: 16,
                      fontWeight: 400,
                      color: 'red',
                    }}>
                    {AppHelpers.getReadableError(MAX_IMAGE_UPLOAD, errors)}
                  </Typography>
                </>
              )}
            </ImageUploading>
            <Button disabled={isImageUploading} onClick={onClickUploadImage} sx={{ mt: 2, mb: 2 }} variant="contained">
              {isImageUploading ? 'PLEASE WAIT...' : 'UPLOAD IMAGES'}
            </Button>

            <Typography sx={{ mt: 2, mb: 1, fontSize: 16, fontWeight: 400 }}>
              {'Resources (Catalog, Manual, Software, Drawing)'}
            </Typography>
            <Grid container direction="row" justifyContent="left" alignItems="center" sx={{}}>
              <Components.ResourcesCard
                mode={'add_file'}
                onClick={() => {
                  refFileReplaceIndex.current = null;
                  openFileSelector();
                }}
              />
              {files.map((file, index) => (
                <Components.ResourcesCard
                  key={files[index].id}
                  index={index}
                  item={files[index]}
                  status={files[index].status}
                  resourcesTypes={['CATALOG', 'DRAWING', 'MANUAL', 'SOFTWARE']}
                  mode={'show_file'}
                  onClick={onFileUpload}
                  onReplace={(item, index) => onFileUpdate(item, index)}
                  onRemove={(item, index) => onFileRemove(item, index)}
                  onSelectResourcesType={(item, index) => onFileSelectResourcesType(item, index)}
                />
              ))}
            </Grid>
            <Button disabled={isFileUploading} onClick={onClickUploadFile} sx={{ mt: 2, mb: 2 }} variant="contained">
              {isFileUploading ? 'PLEASE WAIT...' : 'UPLOAD FILES'}
            </Button>
          </Grid2>
        </Grid2>
        <Button onClick={onClickSave} sx={{ mt: 2, mb: 2 }} variant="contained">
          {isProductCreating ? 'Creating Product, Please Wait...' : 'CREATE PRODUCT'}
        </Button>
      </Container>
    </div>
  );
}

export default AddProduct;

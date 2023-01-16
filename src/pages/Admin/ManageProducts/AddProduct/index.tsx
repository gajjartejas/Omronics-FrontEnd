import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import MarkdownIt from 'markdown-it';
import React, { useEffect, useRef } from 'react';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import Components from 'components';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import 'react-markdown-editor-lite/lib/index.css';
import { FileContent, useFilePicker } from 'use-file-picker';
import CategoryService from 'services/api-service/category';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import { IBaseCategory, IBaseConnectId, IBaseProduct, ICategory, IManufacturer } from 'services/api-service/types';
//@ts-ignore
import { NotificationManager } from 'react-notifications';
import ManufacturerService from 'services/api-service/manufacturer';
import ProductService from 'services/api-service/product';

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

function AddProduct() {
  //Refs
  const refFileReplaceIndex = useRef<number | null>(null);
  const selectedManufacturerId = useRef<IBaseConnectId | null>(null);
  const selectedCategoryIds = useRef<IBaseConnectId[]>([]);
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  //States
  const [images, setImages] = React.useState([]);
  const [files, setFiles] = React.useState<FileContent[]>([]);
  const [fileResources, setFileResources] = React.useState<Map<number, string>>(new Map());
  const [categories, setCategories] = React.useState<IAddCategory[]>([]);
  const [manufacturers, setManufacturers] = React.useState<IAddManufacturer[]>([]);
  const [partNumber, setPartNumber] = React.useState('');
  const [modelNumber, setModelNumber] = React.useState('');
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  //Other
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: 'DataURL',
    accept: ['.zip', '.pdf', '.exe', '.doc', '.docx'],

    multiple: true,
    limitFilesConfig: { max: MAX_FILE_UPLOAD },
    // minFileSize: 1,
    maxFileSize: 50, // in megabytes
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
    if (!filesContent || filesContent.length < 1) {
      return;
    }
    console.log('filesContent........', filesContent);

    if (refFileReplaceIndex.current !== null) {
      setFiles(f => {
        let newFiles = [...f];
        newFiles[refFileReplaceIndex.current!] = filesContent[0];
        return newFiles;
      });
    } else {
      console.log('setFiles........');
      setFiles(f => [...f, ...filesContent]);
    }
  }, [filesContent]);

  // Finish!
  function handleEditorChange({ html, text }: any) {
    // console.log('handleEditorChange', html, text);
    setDescription(text);
  }

  const onChangeImage = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList as never[]);
  };

  const onFileUpload = () => {};
  const onFileUpdate = (item: FileContent, index: number) => {
    refFileReplaceIndex.current = index;

    openFileSelector();
  };

  const onFileRemove = (item: FileContent, index: number) => {
    let newFiles = files.filter(v => v !== item);
    setFiles(newFiles);
  };

  const onFileSelectResourcesType = (item: string, index: number) => {
    fileResources.set(index, item);
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
    let ids = selectedNodes
      .filter((v: any) => !(v.children && v.children.length > 0))
      .map((v: any) => {
        return { id: v.id };
      });

    selectedCategoryIds.current = ids;
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
      NotificationManager.error('Error', 'Product name is required!', 5000, () => {});
      return;
    }
    if (!name || name.trim().length < 1) {
      NotificationManager.error('Error', 'Product name is required!', 5000, () => {});
      return;
    }

    if (!selectedManufacturerId.current) {
      NotificationManager.error('Error', 'Manufacturer is required!', 5000, () => {});
      return;
    }

    if (!selectedCategoryIds.current || selectedCategoryIds.current.length < 1) {
      NotificationManager.error('Error', 'Category is required!', 5000, () => {});
      return;
    }

    const newProduct: IBaseProduct = {
      name: name,
      description: description,
      partNumber: partNumber,
      modelNumber: modelNumber,
      categories: { connect: selectedCategoryIds.current },
      images: { connect: [] },
      resourcees: { connect: [] },
      manufacturer: { connect: selectedManufacturerId.current },
    };

    const result = await ProductService.addProduct(newProduct);
    if (result) {
      NotificationManager.success('Product added successfully!');
      clearForm();
    }
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setImages([]);
    setFiles([]);
    setFileResources(new Map());
    setCategories([]);
    setManufacturers([]);
    setPartNumber('');
    setModelNumber('');

    let newCategories = [...categories];
    newCategories.forEach(v => (v.selected = false));
    setCategories(newCategories);

    let newManufacturers = [...manufacturers];
    newManufacturers.forEach(v => (v.selected = false));
    setManufacturers(newManufacturers);
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
            <MdEditor
              style={{ height: '200px' }}
              renderHTML={text => mdParser.render(text)}
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
            <Typography sx={{ mt: 2, mb: 1, fontSize: 16, fontWeight: 400 }}>{'Images'}</Typography>
            <ImageUploading multiple value={images} onChange={onChangeImage} maxNumber={MAX_IMAGE_UPLOAD}>
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <Grid container direction="row" justifyContent="left" alignItems="center" sx={{}}>
                  <Components.ImageCard mode={'add_image'} onClick={onImageUpload} />
                  {imageList.map((image, index) => (
                    <Components.ImageCard
                      index={index}
                      item={image}
                      mode={'show_image'}
                      onClick={onImageUpload}
                      onReplace={(item, index) => onImageUpdate(index)}
                      onRemove={(item, index) => onImageRemove(index)}
                    />
                  ))}
                </Grid>
              )}
            </ImageUploading>
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
                  key={file.name + file.lastModified}
                  index={index}
                  item={file}
                  resourcesTypes={['CATALOG', 'DRAWING', 'MANUAL', 'SOFTWARE']}
                  mode={'show_file'}
                  onClick={onFileUpload}
                  onReplace={(item, index) => onFileUpdate(item, index)}
                  onRemove={(item, index) => onFileRemove(item, index)}
                  onSelectResourcesType={(item, index) => onFileSelectResourcesType(item, index)}
                />
              ))}
            </Grid>
            <Button onClick={onClickSave} sx={{ mt: 2, mb: 2 }} variant="contained">
              {'SAVE'}
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}

export default AddProduct;

import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import MarkdownIt from 'markdown-it';
import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import Components from 'components';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import 'react-markdown-editor-lite/lib/index.css';
import { FileContent, useFilePicker } from 'use-file-picker';

const items = [
  { id: 0, name: 'test1' },
  { id: 1, name: 'test2' },
];

function AddProduct() {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: 'DataURL',
    accept: ['.json', '.pdf'],

    multiple: true,
    limitFilesConfig: { max: 2 },
    // minFileSize: 1,
    maxFileSize: 50, // in megabytes
  });

  // Finish!
  function handleEditorChange({ html, text }: any) {
    console.log('handleEditorChange', html, text);
  }

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const onFileUpload = () => {};
  const onFileUpdate = (item: FileContent, index: number) => {};
  const onFileRemove = (item: FileContent, index: number) => {};

  return (
    <div>
      <Container sx={{}}>
        <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
          <Grid2 sx={{ ml: 0, flex: 1 }}>
            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'Add Product'}</Typography>
            <TextField sx={{ mt: 2 }} required fullWidth label="Name" />
            <Typography sx={{ mt: 2, mb: 1, fontSize: 16, fontWeight: 400 }}>{'Description'}</Typography>
            <MdEditor
              style={{ height: '200px' }}
              renderHTML={text => mdParser.render(text)}
              onChange={handleEditorChange}
            />
            <TextField sx={{ mt: 2 }} required fullWidth label="Manufacturer" />
            <TextField sx={{ mt: 2 }} required fullWidth label="Part Number" />
            <TextField sx={{ mt: 2 }} required fullWidth label="Model Number" />
            <Components.MultipleSelectChip items={items} label={'Categories'} />

            <Typography sx={{ mt: 2, mb: 1, fontSize: 16, fontWeight: 400 }}>{'Images'}</Typography>
            <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
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
                  {/* <button onClick={onImageRemoveAll}>{'Remove all images'}</button> */}
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
              <Components.ResourcesCard mode={'add_file'} onClick={openFileSelector} />
              {/* <button onClick={onImageRemoveAll}>{'Remove all images'}</button> */}
              {filesContent.map((file, index) => (
                <Components.ResourcesCard
                  index={index}
                  item={file}
                  mode={'show_file'}
                  onClick={onFileUpload}
                  onReplace={(item, index) => onFileUpdate(item, index)}
                  onRemove={(item, index) => onFileRemove(item, index)}
                />
              ))}
            </Grid>

            <Button sx={{ mt: 2 }} variant="contained">
              {'SAVE'}
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}

export default AddProduct;

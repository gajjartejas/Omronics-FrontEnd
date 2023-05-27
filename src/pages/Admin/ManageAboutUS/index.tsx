import { Button, Container, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useEffect } from 'react';
import 'react-dropdown-tree-select/dist/styles.css';
import '../../../App.css';
import { useNavigate } from 'react-router';
import useQuery from 'hooks/useQuery';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import StaticPageDataService from '../../../services/api-service/static-page-data';
import { toast } from 'react-toastify';

function ManageAboutUS() {
  //Const
  const query = useQuery();
  const navigate = useNavigate();

  //State
  const [data, setData] = React.useState<string>('');
  const [editorLoaded, setEditorLoaded] = React.useState<boolean>(false);
  const [saving, setIsSaving] = React.useState<boolean>(false);

  useEffect(() => {
    if (!editorLoaded) {
      return;
    }
    (async () => {
      let data = await StaticPageDataService.getStaticPageDataById(1);
      console.log(data);
      setData(data?.data ?? '');
    })();
  }, [editorLoaded]);

  const onClickSave = async () => {
    setIsSaving(true);
    try {
      await StaticPageDataService.updateStaticPageData(1, data);
      toast.success('About US content saved successfully!');
    } catch (e) {
      toast.error('Error while saving about us content');
    }
    setIsSaving(false);
  };

  return (
    <div>
      <Container sx={{}}>
        <Grid2 sx={{ flex: 1, pt: 8, justifyContent: 'center' }} container spacing={2}>
          <Grid2 sx={{ ml: 0, flex: 1 }}>
            <Typography sx={{ mt: 2, fontSize: 24, fontWeight: '500' }}>{'About US'}</Typography>
            <CKEditor
              editor={ClassicEditor}
              data={data}
              onReady={editor => {
                console.log('CKEditor5 React Component is ready to use!', editor);
                setEditorLoaded(true);
              }}
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                setData(data);
                console.log({ event, editor, data });
              }}
            />
            <Button disabled={saving} onClick={onClickSave} sx={{ mt: 2 }} variant="contained">
              {saving ? 'PLEASE WAIT...' : 'UPDATE'}
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}

export default ManageAboutUS;

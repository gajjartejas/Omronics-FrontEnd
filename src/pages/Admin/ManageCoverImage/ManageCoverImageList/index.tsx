import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router';
import moment from 'moment';
import useWindowDimensions from 'hooks/useWindowDimensions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Components from '../../../../components';
import Config from '../../../../config';
import CategoryIcon from '@mui/icons-material/Category';
import { GridSelectionModel } from '@mui/x-data-grid/models/gridSelectionModel';
import { GridCallbackDetails } from '@mui/x-data-grid/models/api';
import { toast } from 'react-toastify';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import CoverImageService from '../../../../services/api-service/cover-image/cover-image';

export default function ManageCoverImageList() {
  //Refs

  //Const
  const navigate = useNavigate();
  const { height } = useWindowDimensions();

  //State
  const [rows, setRows] = React.useState<any[]>([]);
  const [deleteDialogVisible, setDeleteDialogVisible] = React.useState(false);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'url',
      headerName: 'Image',
      width: 80,
      renderCell: params => {
        if (params.value && params.value) {
          return <Avatar src={Config.Constants.COVER_IMAGE_PATH + params.value} />;
        }
        return (
          <Avatar>
            <CategoryIcon />
          </Avatar>
        );
      },
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      editable: true,
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 100,
      editable: true,
      valueFormatter: params => (params.value ? 'Active' : 'Inactive'),
    },
    {
      field: 'createdAt',
      headerName: 'Date Created',
      valueFormatter: params => moment(params?.value).format('DD/MM/YYYY hh:mm A'),
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 180,
    },
    {
      field: 'updatedAt',
      headerName: 'Date Updated',
      valueFormatter: params => moment(params?.value).format('DD/MM/YYYY hh:mm A'),
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 180,
    },
    {
      field: 'edit',
      headerName: '',
      width: 50,
      renderCell: params => {
        return (
          <IconButton
            onClick={() => {
              onClickEdit(params);
            }}
            aria-label="delete"
            size="small">
            <EditIcon fontSize="inherit" />
          </IconButton>
        );
      },
    },
  ];

  //Delete state
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [deleting, setDeleting] = React.useState(false);

  const onClickEdit = (params: any) => {
    navigate(`/admin/dashboard/update-cover-image?id=${params.id}`);
  };

  const onPressAddNewButton = () => {
    navigate('/admin/dashboard/add-cover-image');
  };

  React.useEffect(() => {
    (async () => {
      const data = await CoverImageService.getCoverImages();
      setRows(data!);
    })();
  }, []);

  const onSelectionModelChange = (selectionModel: GridSelectionModel, details: GridCallbackDetails) => {
    setSelectedIds(selectionModel as number[]);
  };

  const onDelete = async () => {
    setDeleteDialogVisible(false);
    try {
      setDeleting(true);
      await CoverImageService.deleteCoverImages(selectedIds);
      await reloadPage();
    } catch (e) {
      toast.error(JSON.stringify(e));
    } finally {
      setDeleting(false);
    }
  };

  const onPressDeleteButton = () => {
    setDeleteDialogVisible(true);
  };

  const reloadPage = async () => {
    setDeleteDialogVisible(false);
    setSelectedIds([]);

    const data = await CoverImageService.getCoverImages();
    setRows(data!);
  };

  return (
    <div>
      <Grid2 sx={{ flex: 1, pt: 8, paddingX: 4 }} container spacing={0}>
        <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ mt: 2, mb: 1, fontSize: 24, fontWeight: '500' }}>{'Cover Images'}</Typography>
          <div>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {popupState => (
                <React.Fragment>
                  <Button variant="contained" {...bindTrigger(popupState)}>
                    {'More Options'}
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        onPressAddNewButton();
                      }}>
                      {'ADD NEW COVER IMAGE'}
                    </MenuItem>
                    <MenuItem
                      disabled={selectedIds.length < 1}
                      onClick={() => {
                        popupState.close();
                        onPressDeleteButton();
                      }}>
                      {deleting ? 'PLEASE WAIT...' : `DELETE (${selectedIds.length})`}
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
        </Stack>
        <Box sx={{ height: height * 0.7, width: '100%' }}>
          <DataGrid
            selectionModel={selectedIds}
            rows={rows}
            columns={columns}
            pageSize={100}
            rowsPerPageOptions={[100]}
            checkboxSelection
            onSelectionModelChange={onSelectionModelChange}
          />
        </Box>
      </Grid2>
      <Components.AppAlertDialog
        body={`Are you sure you want to delete ${selectedIds.length} cover image?`}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
        isVisible={deleteDialogVisible}
        onCancel={() => {
          setDeleteDialogVisible(false);
        }}
        onConfirm={onDelete}
        title={'Delete Cover Image?'}
      />
    </div>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router';
import CategoryService from '../../../../services/api-service/category/category';
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

export default function ManageCategoryList() {
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
      field: 'images',
      headerName: 'Image',
      width: 80,
      renderCell: params => {
        if (params.value && params.value.length > 0 && params.value[0].url) {
          return <Avatar src={Config.Constants.CATEGORY_IMAGE_PATH + params.value[0].url} />;
        }
        return (
          <Avatar>
            <CategoryIcon />
          </Avatar>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 400,
      editable: true,
    },

    {
      field: 'parentId',
      headerName: 'Sub Categories',
      type: 'number',
      width: 180,
      editable: true,
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
    navigate(`/admin/dashboard/update-category?id=${params.id}`);
  };

  const onPressAddNewButton = () => {
    navigate('/admin/dashboard/add-category');
  };

  React.useEffect(() => {
    (async () => {
      const data = await CategoryService.getCategories();
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
      await CategoryService.deleteCategories(selectedIds);
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

    const data = await CategoryService.getCategories();
    setRows(data!);
  };

  return (
    <div>
      <Grid2 sx={{ flex: 1, pt: 8, paddingX: 4 }} container spacing={0}>
        <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ mt: 2, mb: 1, fontSize: 24, fontWeight: '500' }}>{'Categories'}</Typography>
          <div>
            <Button
              disabled={selectedIds.length < 1 || deleting}
              onClick={onPressDeleteButton}
              sx={{ mt: 2, marginRight: 2 }}
              variant="contained">
              {deleting ? 'PLEASE WAIT...' : `DELETE (${selectedIds.length})`}
            </Button>
            <Button onClick={onPressAddNewButton} sx={{ mt: 2 }} variant="contained">
              {'ADD NEW CATEGORY'}
            </Button>
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
        body={`Are you sure you want to delete ${selectedIds.length} category?`}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
        isVisible={deleteDialogVisible}
        onCancel={() => {
          setDeleteDialogVisible(false);
        }}
        onConfirm={onDelete}
        title={'Delete Category?'}
      />
    </div>
  );
}

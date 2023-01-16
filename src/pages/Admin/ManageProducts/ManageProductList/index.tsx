import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
<<<<<<< HEAD
import { Button, Stack, Typography } from '@mui/material';
=======
import { Button, Container, Stack, Typography } from '@mui/material';
>>>>>>> b1b90c2 (feat: api integration and data binding)
import Grid2 from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router';
import ProductService from 'services/api-service/product';
import useWindowDimensions from 'hooks/useWindowDimensions';
import moment from 'moment';
<<<<<<< HEAD
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { GridSelectionModel } from '@mui/x-data-grid/models/gridSelectionModel';
import { GridCallbackDetails } from '@mui/x-data-grid/models/api';
import { toast } from 'react-toastify';
import Components from '../../../../components';

export default function ManageProductList() {
  //Refs
=======

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
    editable: true,
  },
  {
    field: 'partNumber',
    headerName: 'Part Number',
    width: 110,
    editable: true,
  },
  {
    field: 'modelNumber',
    headerName: 'Model Number',
    width: 110,
    editable: true,
  },
  {
    field: 'categories',
    headerName: 'Categories',
    width: 100,
    editable: true,
    valueFormatter: params => JSON.stringify(params.value.length),
  },
  {
    field: 'images',
    headerName: 'Images',
    width: 100,
    editable: true,
    valueFormatter: params => JSON.stringify(params.value.length),
  },
  {
    field: 'resourcees',
    headerName: 'Resources',
    width: 100,
    editable: true,
    valueFormatter: params => JSON.stringify(params.value.length),
  },
  {
    field: 'manufacturer',
    headerName: 'Manufacturer',
    width: 100,
    editable: true,
    valueFormatter: params => params.value?.name || 'N/A',
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
];

export default function ManageProductList() {
  let navigate = useNavigate();
  const { height } = useWindowDimensions();

  const [rows, setRows] = React.useState<any[]>([]);
>>>>>>> b1b90c2 (feat: api integration and data binding)

  //Const
  const navigate = useNavigate();
  const { height } = useWindowDimensions();

  //State
  const [rows, setRows] = React.useState<any[]>([]);
  const [deleteDialogVisible, setDeleteDialogVisible] = React.useState(false);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
      editable: true,
    },
    {
      field: 'partNumber',
      headerName: 'Part Number',
      width: 110,
      editable: true,
    },
    {
      field: 'modelNumber',
      headerName: 'Model Number',
      width: 110,
      editable: true,
    },
    {
      field: 'categories',
      headerName: 'Categories',
      width: 100,
      editable: true,
      valueFormatter: params => JSON.stringify(params.value.length),
    },
    {
      field: 'images',
      headerName: 'Images',
      width: 100,
      editable: true,
      valueFormatter: params => JSON.stringify(params.value.length),
    },
    {
      field: 'resourcees',
      headerName: 'Resources',
      width: 100,
      editable: true,
      valueFormatter: params => JSON.stringify(params.value.length),
    },
    {
      field: 'manufacturer',
      headerName: 'Manufacturer',
      width: 100,
      editable: true,
      valueFormatter: params => params.value?.name || 'N/A',
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
    navigate(`/admin/dashboard/update-product?id=${params.id}`);
  };

  const onPressAddNewButton = () => {
    navigate('/admin/dashboard/add-product');
  };

  React.useEffect(() => {
    (async () => {
      let products = await ProductService.getProducts();
      setRows(products!);
    })();
  }, []);

<<<<<<< HEAD
  const onSelectionModelChange = (selectionModel: GridSelectionModel, details: GridCallbackDetails) => {
    setSelectedIds(selectionModel as number[]);
  };

  const onDelete = async () => {
    setDeleteDialogVisible(false);
    try {
      setDeleting(true);
      await ProductService.deleteProducts(selectedIds);
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

    let products = await ProductService.getProducts();
    setRows(products!);
  };

=======
>>>>>>> b1b90c2 (feat: api integration and data binding)
  return (
    <div>
      <Grid2 sx={{ flex: 1, pt: 8, paddingX: 4 }} container spacing={0}>
        <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ mt: 2, mb: 1, fontSize: 24, fontWeight: '500' }}>{'Products'}</Typography>
<<<<<<< HEAD
          <div>
            <Button
              disabled={selectedIds.length < 1 || deleting}
              onClick={onPressDeleteButton}
              sx={{ mt: 2, marginRight: 2 }}
              variant="contained">
              {deleting ? 'PLEASE WAIT...' : `DELETE (${selectedIds.length})`}
            </Button>
            <Button onClick={onPressAddNewButton} sx={{ mt: 2 }} variant="contained">
              {'ADD NEW PRODUCT'}
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
        body={`Are you sure you want to delete ${selectedIds.length} product?`}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
        isVisible={deleteDialogVisible}
        onCancel={() => {
          setDeleteDialogVisible(false);
        }}
        onConfirm={onDelete}
        title={'Delete Product?'}
      />
=======
          <Button onClick={onPressAddNewProduct} sx={{ mt: 2 }} variant="contained">
            {'ADD NEW PRODUCT'}
          </Button>
        </Stack>
        <Box sx={{ height: height * 0.7, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
        </Box>
      </Grid2>
>>>>>>> b1b90c2 (feat: api integration and data binding)
    </div>
  );
}

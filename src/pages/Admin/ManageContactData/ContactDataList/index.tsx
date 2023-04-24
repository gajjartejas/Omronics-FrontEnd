import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router';
import moment from 'moment';
import useWindowDimensions from 'hooks/useWindowDimensions';
import ContactUsService from '../../../../services/api-service/contact-data/contact-data';
import IconButton from '@mui/material/IconButton';
import { GridSelectionModel } from '@mui/x-data-grid/models/gridSelectionModel';
import { GridCallbackDetails } from '@mui/x-data-grid/models/api';
import { toast } from 'react-toastify';
import Components from '../../../../components';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function ContactDataList() {
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
      field: 'name',
      headerName: 'Name',
      width: 100,
      editable: true,
    },
    {
      field: 'phoneNo',
      headerName: 'Phone No',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      editable: true,
    },
    {
      field: 'requirements',
      headerName: 'Requirements',
      width: 400,
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
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        );
      },
    },
  ];

  //Delete state
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [deleting, setDeleting] = React.useState(false);

  const onClickEdit = (params: any) => {
    navigate(`/admin/dashboard/view-contact-data?id=${params.id}`);
  };

  React.useEffect(() => {
    (async () => {
      const data = await ContactUsService.getContactDatum();
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
      await ContactUsService.deleteContactDatum(selectedIds);
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

    const data = await ContactUsService.getContactDatum();
    setRows(data!);
  };

  return (
    <div>
      <Grid2 sx={{ flex: 1, pt: 8, paddingX: 4 }} container spacing={0}>
        <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ mt: 2, mb: 1, fontSize: 24, fontWeight: '500' }}>{'Recently Connected'}</Typography>
          <div>
            <Button
              disabled={selectedIds.length < 1 || deleting}
              onClick={onPressDeleteButton}
              sx={{ mt: 2, marginRight: 2 }}
              variant="contained">
              {deleting ? 'PLEASE WAIT...' : `DELETE (${selectedIds.length})`}
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
        body={`Are you sure you want to delete ${selectedIds.length} record?`}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
        isVisible={deleteDialogVisible}
        onCancel={() => {
          setDeleteDialogVisible(false);
        }}
        onConfirm={onDelete}
        title={'Delete record?'}
      />
    </div>
  );
}

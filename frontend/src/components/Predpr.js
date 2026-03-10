import * as React from 'react';
import './Predpr.css'
import { MenuContext } from '../context/MenuContext';
import { PredprContext } from '../context/PredprContext';
import { Box, 
         Paper, 
         IconButton, 
         Typography, 
         TextField, 
         Button, 
         FormControl, 
         Select, 
         InputLabel, 
         MenuItem } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { useSnackbar } from 'notistack';
import { DataGrid,GridActionsCellItem } from '@mui/x-data-grid';

export default function Predpr() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {setMenuItem} = React.useContext(MenuContext);
  const {statePredpr: { statusPredpr, dataPredpr, errorPredpr }, dispatchGetPredpr, dispatchAddPredpr, dispatchDeletePredpr, dispatchEditPredpr } =  React.useContext(PredprContext);

  React.useEffect(() => {
    setMenuItem(2);
    dispatchGetPredpr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  React.useEffect(() => {
    // varisnt: success, error, warning, info, default
    if(errorPredpr){
      const key = enqueueSnackbar(errorPredpr, { variant: 'error', SnackbarProps: { onClick: () => closeSnackbar(key) },});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[errorPredpr]);


//new-edit Predpr
const [editPredprId, setEditPredprId] = React.useState('');
const [editPredprName, setEditPredprName] = React.useState('');
const [editPredprAddress, setEditPredprAddress] = React.useState('');

const handleEditPredprName = (e) => {
  setEditPredprName(e.target.value);
}

const handleEditPredprAddress = (e) => {
  setEditPredprAddress(e.target.value);
}

//Predpr change in DB
const predprAddEdit = () => {
  if(!editPredprId) {
    dispatchAddPredpr(editPredprName, editPredprAddress);
  }else{
    dispatchEditPredpr(editPredprId, editPredprName, editPredprAddress)
    setEditPredprId('');
  }
  setEditPredprName('');
  setEditPredprAddress('');
}

//delete Predpruct in DB
const predprDelete = (id) => {
  dispatchDeletePredpr(id);
}

 const predprColumns = [
    { field: 'id' },
    { field: 'name', headerName: 'Наименование', width: 550 },
    { field: 'address', headerName: 'Адрес', width: 650 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      width: 100,
      cellClassName: 'actions',
      getActions: ( params ) => {
        return [
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label="Edit"
            onClick={(() => {
              setEditPredprId(params.row.id);
              setEditPredprName(params.row.name);
              setEditPredprAddress(params.row.address);
            })}
            color="primary"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlinedIcon />}
            label="Delete"
            onClick={(() => predprDelete(params.row.id))}
            color="primary"
          />,
        ];
      }
    }
  ];


  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
    <Box  sx={{width: '100%'}}>
        <Paper elevation={5}>
          <DataGrid
              rows={dataPredpr}
              columns={predprColumns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
              sx={{ border: 0, }}
              slots={{ toolbar: title => {  return (
                        <Box style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <Typography variant="h6">Предприятия</Typography>
                          <IconButton area-label = 'DeleteOutlinedIcon' color="primary" onClick={(() => dispatchGetPredpr())}>
                            <SyncOutlinedIcon />
                          </IconButton>
                          <Typography
                            variant='h6'
                            color = {statusPredpr === 'error'? 'red' : 'primary'}
                            sx = {{ ml:1 }}
                          >{ statusPredpr }</Typography>
                        </Box>
              )}}}
              columnVisibilityModel={{
                id: false,
              }}
            />
            <Box
              sx={{ p:1, width: '95%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}
            >
              <TextField 
                sx={{ width: 450, mr:1 }}
                value = { editPredprName || ''} 
                onChange ={ handleEditPredprName } 
                id="newPredprName" 
                size="small" 
                label="Наименование предприятия" 
                variant="outlined" 
              />
              <TextField 
                sx={{ width: 550, mr:1 }}
                value = { editPredprAddress || ''} 
                onChange ={ handleEditPredprAddress } 
                id="newPredprAddress" 
                size="small" 
                label="Адрес"
                variant="outlined" 
              />
              <Button size="small" onClick={ predprAddEdit } variant="outlined"><AddOutlinedIcon /><EditOutlinedIcon /></Button>
          </Box>
        </Paper>
      </Box>
    </>
  )
};

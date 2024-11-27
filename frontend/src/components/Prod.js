import * as React from 'react';
import './Prod.css'
import { ProdContext } from '../context/ProdContext';
import { CategContext } from "../context/CategContext";
import { Box, Paper, IconButton, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { useSnackbar } from 'notistack';
import { DataGrid } from '@mui/x-data-grid';


export default function Prod() {

  //snackbar
  const { enqueueSnackbar } = useSnackbar();
  const {stateProd: { dataProd }, dispatchProd } =  React.useContext(ProdContext);
  const {stateCateg: { dataCateg }, dispatchCateg } =  React.useContext(CategContext);
  React.useEffect(() => {
    dispatchCateg();
    dispatchProd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  

  const prodColumns = [
    { field: 'id' },
    { field: 'name', headerName: 'Наименование', width: 550 },
    { field: 'price', headerName: 'Цена', width: 130 },
    { field: 'categ', headerName: 'Категория', width: 450 },
    {
      field: 'tools',
      headerName: '',
      width: 100,
      sortable: false,
      disableClickEventBubbling: true,
      hideable: false,
      disableColumnMenu: true,
      renderCell: () => {
        return (
          <>
            <IconButton area-label = 'EditOutlinedIcon' color="primary" onClick={(e => enqueueSnackbar('Edit',{variant: 'info'}))}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton area-label = 'DeleteOutlinedIcon' color="primary" onClick={(e => enqueueSnackbar('Delete',{variant: 'info'}))}>
              <DeleteOutlinedIcon />
            </IconButton>
          </>
        )
      }
    }
  ];

  const categColumns = [
    { field: 'id' },
    { field: 'name', headerName: 'Наименование', width: 440 },
    {
      field: 'tools',
      headerName: '',
      width: 100,
      sortable: false,
      disableClickEventBubbling: true,
      hideable: false,
      disableColumnMenu: true,
      renderCell: () => {
        return (
          <>
            <IconButton area-label = 'EditOutlinedIcon' color="primary" onClick={(e => enqueueSnackbar('Edit',{variant: 'info'}))}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton area-label = 'DeleteOutlinedIcon' color="primary" onClick={(e => enqueueSnackbar('Delete',{variant: 'info'}))}>
              <DeleteOutlinedIcon />
            </IconButton>
          </>
        )
      }
    }
  ];



  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
      <Box sx={{width: '29%'}}>
        <Paper elevation={5}>
          <DataGrid
              rows={dataCateg}
              columns={categColumns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 20]}
              // checkboxSelection
              disableRowSelectionOnClick
              sx={{ border: 0, }}
              slots={{ toolbar: title => {  return (
                        <Box style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <Typography variant="h6">Категории</Typography>
                          <IconButton area-label = 'DeleteOutlinedIcon' color="primary" onClick={(e => dispatchCateg())}>
                            <SyncOutlinedIcon />
                          </IconButton>
                        </Box>
              )}}}
              columnVisibilityModel={{
                id: false,
              }}
            />
        </Paper>
      </Box>
      <Box  sx={{width: '70%'}}>
        <Paper elevation={5}>
          <DataGrid
              rows={dataProd}
              columns={prodColumns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 20]}
              // checkboxSelection
              disableRowSelectionOnClick
              sx={{ border: 0, }}
              slots={{ toolbar: title => {  return (
                        <Box style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <Typography variant="h6">Продукция</Typography>
                          <IconButton area-label = 'DeleteOutlinedIcon' color="primary" onClick={(e => dispatchProd())}>
                            <SyncOutlinedIcon />
                          </IconButton>
                        </Box>
              )}}}
              columnVisibilityModel={{
                id: false,
              }}
            />
        </Paper>
      </Box>
    </>
  )
}
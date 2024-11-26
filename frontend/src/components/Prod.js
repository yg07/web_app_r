import * as React from 'react';
import './Prod.css'
import { ProdContext } from '../context/GlobalState';
import { Box, Paper, IconButton, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useSnackbar } from 'notistack';
import { DataGrid } from '@mui/x-data-grid';


function setTitle(title){
  return (
    <Box style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Typography variant="h6">{title}</Typography>
    </Box>
  )
}

export default function Prod() {

  //snackbar
  const { enqueueSnackbar } = useSnackbar();
  const {prod, categ } = React.useContext(ProdContext)

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
              rows={categ}
              columns={categColumns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 20]}
              // checkboxSelection
              disableRowSelectionOnClick
              sx={{ border: 0, }}
              slots={{ toolbar: title => setTitle('Категории')}}
              columnVisibilityModel={{
                id: false,
              }}
            />
        </Paper>
      </Box>
      <Box  sx={{width: '70%'}}>
        <Paper elevation={5}>
          <DataGrid
              rows={prod}
              columns={prodColumns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 20]}
              // checkboxSelection
              disableRowSelectionOnClick
              sx={{ border: 0, }}
              slots={{ toolbar: title => setTitle('Продукция')}}
              columnVisibilityModel={{
                id: false,
              }}
            />
        </Paper>
      </Box>
    </>
  )
}
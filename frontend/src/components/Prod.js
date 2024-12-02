import * as React from 'react';
import './Prod.css'
import { ProdContext } from '../context/ProdContext';
import { CategContext } from "../context/CategContext";
import { Box, Paper, IconButton, Typography, TextField, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import { useSnackbar } from 'notistack';
import { DataGrid,GridActionsCellItem } from '@mui/x-data-grid';


export default function Prod() {

  //snackbar
  const { enqueueSnackbar } = useSnackbar();
  const {stateProd: { dataProd }, dispatchProd } =  React.useContext(ProdContext);
  const {stateCateg: { dataCateg }, dispatchCateg, dispatchAddCateg, dispatchDeleteCateg, dispatchEditCateg } =  React.useContext(CategContext);
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
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label="Edit"
            onClick={((e) => enqueueSnackbar(`Edit ${id}`,{variant: 'info'}))}
            color="primary"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlinedIcon />}
            label="Delete"
            onClick={((e) => enqueueSnackbar(`Delete ${id}`,{variant: 'info'}))}
            color="primary"
          />,
        ];
      }
    }
  ];

  const categColumns = [
    { field: 'id' },
    { field: 'name', headerName: 'Наименование', width: 440 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label="Edit"
            onClick={(() => {
              setEditCategId(params.row.id);
              setEditCategName(params.row.name);
            })}
            color="primary"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlinedIcon />}
            label="Delete"
            onClick={() => dispatchDeleteCateg(params.row.id)}
            color="primary"
          />,
        ];
      }
    }
  ];


//new-edit categ
const [editCategId, setEditCategId] = React.useState('');
const [editCategName, setEditCategName] = React.useState('');

const handleEditCategName = (e) => {
  setEditCategName(e.target.value);
}

function categAddEdit() {
  if(!editCategId) {
    dispatchAddCateg(editCategName);
  }else{
    dispatchEditCateg(editCategId,editCategName)
    setEditCategId('');
  }
  setEditCategName('');
}




//select
  const [categId, setCategId] = React.useState('');
  const selectChange = (event) => {
    setCategId(event.target.value);
  };

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
                          <IconButton area-label = 'DeleteOutlinedIcon' color="primary" onClick={(() => dispatchCateg())}>
                            <SyncOutlinedIcon />
                          </IconButton>
                        </Box>
              )}}}
              columnVisibilityModel={{
                id: false,
              }}
            />
            <Box
              sx={{ p:1, width: '95%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}
            >
              <TextField value = { editCategName || ''} onChange ={ handleEditCategName } sx={{ width: 350, mr:1 }} id="newCateg" size="small" label="Наименование категории" variant="outlined" />
              <Button onClick = { categAddEdit } variant="outlined">Добавить</Button>
            </Box>
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
            <Box
              sx={{ p:1, width: '95%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}
            >
              <TextField sx={{ width: 450, mr:1 }} id="newProdName" size="small" label="Наименование продукции" variant="outlined" />
              <TextField sx={{ width: 150, mr:1 }} id="newProdPrice" size="small" label="Цена" variant="outlined" />
              <FormControl sx={{ m: 0, p: 0, mr: 1 }} size="small">
                <InputLabel id="categ-label">Категория</InputLabel>
                <Select
                  labelId="categ-label"
                  id="categ-select"
                  value={ categId }
                  label="Категория"
                  onChange={selectChange}
                  sx = {{width: 300 }}
                >
                {
                  dataCateg ? dataCateg.map( el => <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>):''
                }
                </Select>
              </FormControl>
              <Button variant="outlined">Добавить</Button>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
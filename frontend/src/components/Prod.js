import * as React from 'react';
import './Prod.css'
import { MenuContext } from '../context/MenuContext';
import { ProdContext } from '../context/ProdContext';
import { CategContext } from "../context/CategContext";
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
// import Message from './Message';

export default function Prod() {

//snackbar
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {setMenuItem} = React.useContext(MenuContext);
  const {stateProd: { statusProd, dataProd, errorProd}, dispatchGetProd, dispatchAddProd, dispatchDeleteProd, dispatchEditProd } =  React.useContext(ProdContext);
  const {stateCateg: { statusCateg, dataCateg, errorCateg }, dispatchGetCateg, dispatchAddCateg, dispatchDeleteCateg, dispatchEditCateg } =  React.useContext(CategContext);
  
  
  React.useEffect(() => {
    setMenuItem(1);
    dispatchGetCateg();
    dispatchGetProd();
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  React.useEffect(() => {
    dispatchGetProd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataCateg]);
  
  React.useEffect(() => {
    // varisnt: success, error, warning, info, default
    if(errorCateg || errorProd){
      const key = enqueueSnackbar(errorCateg + ' ' + errorProd, { variant: 'error', SnackbarProps: { onClick: () => closeSnackbar(key) },});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[errorCateg, errorProd]);


//new-edit category
  const [editCategId, setEditCategId] = React.useState('');
  const [editCategName, setEditCategName] = React.useState('');

  const handleEditCategName = (e) => {
    setEditCategName(e.target.value);
  }

//category change in DB
  const categAddEdit = () => {
    if(!editCategId) {
      dispatchAddCateg(editCategName);
    }else{
      dispatchEditCateg(editCategId,editCategName);
      setEditCategId('');
    }
    setEditCategName('');
  }

//delete category in DB
  const categDelete = (id) => {
    dispatchDeleteCateg(id);
  }

//new-edit product
const [editProdId, setEditProdId] = React.useState('');
const [editProdName, setEditProdName] = React.useState('');
const [editProdPrice, setEditProdPrice] = React.useState('');
const [editProdCategId, setEditProdCategId] = React.useState('');

const handleEditProdName = (e) => {
  setEditProdName(e.target.value);
}

const handleEditProdPrice = (e) => {
  setEditProdPrice(e.target.value);
}

const handleEditProdCategId = (e) => {
  setEditProdCategId(e.target.value);
}

//product change in DB
const prodAddEdit = () => {
  if(!editProdId) {
    dispatchAddProd(editProdName, editProdPrice, editProdCategId);
  }else{
    dispatchEditProd(editProdId,editProdName, editProdPrice, editProdCategId)
    setEditProdId('');
  }
  setEditProdName('');
  setEditProdPrice('');
  setEditProdCategId('');
}

//delete product in DB
const prodDelete = (id) => {
  dispatchDeleteProd(id);
}

  const categColumns = [
    { field: 'id' },
    { field: 'name', headerName: 'Наименование', width: 440 },
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
              setEditCategId(params.row.id);
              setEditCategName(params.row.name);
            })}
            color="primary"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlinedIcon />}
            label="Delete"
            onClick={() => categDelete(params.row.id)}
            color="primary"
          />,
        ];
      }
    }
  ];


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
      getActions: ( params ) => {
        return [
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label="Edit"
            onClick={(() => {
              setEditProdId(params.row.id);
              setEditProdName(params.row.name);
              setEditProdPrice(params.row.price);
              setEditProdCategId(dataCateg.reduce((categId,e) => {if(e.name === params.row.categ) return e.id; else return categId},''));
            })}
            color="primary"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlinedIcon />}
            label="Delete"
            onClick={(() => prodDelete(params.row.id))}
            color="primary"
          />,
        ];
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
              disableRowSelectionOnClick
              sx={{ border: 0, }}
              slots={{ toolbar: title => {  return (
                        <Box style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <Typography variant="h6">Категории</Typography>
                          <IconButton area-label = 'DeleteOutlinedIcon' color="primary" onClick={(() => dispatchGetCateg())}>
                            <SyncOutlinedIcon />
                          </IconButton>
                          <Typography
                            variant='h6'
                            color = {statusCateg === 'error'? 'red' : 'primary'}
                            sx = {{ ml:1 }}
                          >{ statusCateg }</Typography>
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
                value = { editCategName || ''} 
                onChange ={ handleEditCategName } 
                sx={{ width: 350, mr:1 }} 
                id="newCateg" 
                size="small" 
                label="Наименование категории" 
                variant="outlined" 
              />
              <Button size="small" onClick = { categAddEdit } variant="outlined"><AddOutlinedIcon /><EditOutlinedIcon /></Button>
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
              disableRowSelectionOnClick
              sx={{ border: 0, }}
              slots={{ toolbar: title => {  return (
                        <Box style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <Typography variant="h6">Продукция</Typography>
                          <IconButton area-label = 'DeleteOutlinedIcon' color="primary" onClick={(() => dispatchGetProd())}>
                            <SyncOutlinedIcon />
                          </IconButton>
                          <Typography
                            variant='h6'
                            color = {statusProd === 'error'? 'red' : 'primary'}
                            sx = {{ ml:1 }}
                          >{ statusProd }</Typography>
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
                value = { editProdName || ''} 
                onChange ={ handleEditProdName } 
                id="newProdName" 
                size="small" 
                label="Наименование продукции" 
                variant="outlined" 
              />
              <TextField 
                sx={{ width: 150, mr:1 }}
                value = { editProdPrice || ''} 
                onChange ={ handleEditProdPrice } 
                id="newProdPrice" 
                size="small" 
                label="Цена"
                type='number'
                inputProps={{ min: "0", step: "0.01" }}
                variant="outlined" 
              />
              <FormControl sx={{ m: 0, p: 0, mr: 1 }} size="small">
                <InputLabel id="categ-label">Категория</InputLabel>
                <Select
                  labelId="categ-label"
                  id="categ-select"
                  value={ dataCateg ? editProdCategId : '' }
                  label="Категория"
                  onChange={handleEditProdCategId}
                  sx = {{width: 300 }}
                >
                {
                  dataCateg ? dataCateg.map( el => <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>) : null
                }
                </Select>
              </FormControl>
              <Button size="small" onClick={ prodAddEdit } variant="outlined"><AddOutlinedIcon /><EditOutlinedIcon /></Button>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
import * as React from 'react';
import './Sklad.css'
import { MenuContext } from '../context/MenuContext';
import { ProdContext } from '../context/ProdContext';
import { SkladContext } from "../context/SkladContext";
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

export default function Sklad() {

//snackbar
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {setMenuItem} = React.useContext(MenuContext);
  const {stateProd: { statusProd, dataProd, errorProd}, dispatchGetProd, dispatchAddProd, dispatchDeleteProd, dispatchEditProd } =  React.useContext(ProdContext);
  const {stateSklad: { statusSklad, dataSklad, errorSklad}, dispatchGetSklad, dispatchAddSklad, dispatchDeleteSklad, dispatchEditSklad } =  React.useContext(SkladContext);
    
  React.useEffect(() => {
    setMenuItem(3);
    dispatchGetSklad();
    dispatchGetProd();
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  React.useEffect(() => {
    dispatchGetSklad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataProd]);
  
  React.useEffect(() => {
    // varisnt: success, error, warning, info, default
    if(errorSklad || errorProd){
      const key = enqueueSnackbar(errorSklad + ' ' + errorProd, { variant: 'error', SnackbarProps: { onClick: () => closeSnackbar(key) },});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[errorSklad, errorProd]);


//new-edit Sklad
const [editSkladId, setEditSkladId] = React.useState('');
const [editSkladProdId, setEditSkladProdId] = React.useState('');
const [editSkladKol, setEditSkladKol] = React.useState('');

const handleEditSkladProdId = (e) => {
  setEditSkladProdId(e.target.value);
}

const handleEditSkladKol = (e) => {
  setEditSkladKol(e.target.value);
}


//sklad change in DB
const skladAddEdit = () => {
  if(!editSkladId) {
    dispatchAddSklad(editSkladProdId, editSkladKol);
  }else{
    dispatchEditSklad(editSkladId, editSkladProdId, editSkladKol)
    setEditSkladId('');
  }
  setEditSkladProdId('');
  setEditSkladKol('');
}

//delete product in DB
const skladDelete = (id) => {
  dispatchDeleteSklad(id);
}

  const skladColumns = [
    { field: 'id' },
    { field: 'prod_name', headerName: 'Наименование продукции', width: 550 },
    { field: 'kol', headerName: 'Количество', width: 130 },
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
              setEditSkladId(params.row.id);
              setEditSkladProdId(dataProd.reduce((prodId,e) => {if(e.name === params.row.prod_name) return e.id; else return prodId},''));
              setEditSkladKol(params.row.kol);
              
            })}
            color="primary"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlinedIcon />}
            label="Delete"
            onClick={(() => skladDelete(params.row.id))}
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
              rows={dataSklad}
              columns={skladColumns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
              sx={{ border: 0, }}
              slots={{ toolbar: title => {  return (
                        <Box style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <Typography variant="h6">Состояние склада</Typography>
                          <IconButton area-label = 'DeleteOutlinedIcon' color="primary" onClick={(() => dispatchGetSklad())}>
                            <SyncOutlinedIcon />
                          </IconButton>
                          <Typography
                            variant='h6'
                            color = {statusSklad === 'error'? 'red' : 'primary'}
                            sx = {{ ml:1 }}
                          >{ statusSklad }</Typography>
                        </Box>
              )}}}
              columnVisibilityModel={{
                id: false,
              }}
            />
            <Box
              sx={{ p:1, width: '95%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}
            >
              <FormControl sx={{ m: 0, p: 0, mr: 1 }} size="small">
                <InputLabel id="sklad-label">Продукция</InputLabel>
                <Select
                  labelId="sklad-label"
                  id="sklad-select"
                  value={ dataProd ? editSkladProdId : '' }
                  label="Продукция"
                  onChange={handleEditSkladProdId}
                  sx = {{width: 500 }}
                >
                {
                  dataProd ? dataProd.map( el => <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>) : null
                }
                </Select>
              </FormControl>
              <TextField 
                sx={{ width: 150, mr:1 }}
                value = { editSkladKol || ''} 
                onChange ={ handleEditSkladKol } 
                id="newSkladKol" 
                size="small" 
                label="Количество"
                type='number'
                inputProps={{ min: "0"}}
                variant="outlined" 
              />
              
              <Button size="small" onClick={ skladAddEdit } variant="outlined"><AddOutlinedIcon /><EditOutlinedIcon /></Button>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
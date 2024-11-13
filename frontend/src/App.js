import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function App() {

const [prod, setProd] = useState(null);
const [categ, setCateg] = useState(null);
const [categId, setCategId] = React.useState('');

const selectChange = (event) => {
  setCategId(event.target.value);
};

useEffect(() => {
      fetch("http://localhost:8000/prod")
      .then(response =>  response.json())
      .then( res => setProd(res))
      .catch((ex) => {
        console.log("Error: " + ex.statusText);
        alert("Error: " + ex.statusText);
    });
    fetch("http://localhost:8000/categ")
      .then(response =>  response.json())
      .then( res => setCateg(res))
      .catch((ex) => {
        console.log("Error: " + ex.statusText);
        alert("Error: " + ex.statusText);
    });
    },[])



const columns = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'name', headerName: 'Наименование', width: 400 },
  { field: 'price', headerName: 'Цена', width: 130 },
  { field: 'categ_id', headerName: 'categ_id', type: 'number',width: 90 },
];

const paginationModel = { page: 0, pageSize: 5 };


return ( 
    <div>
      <Button 
            onClick={() => {
              alert('clicked');
            }
            } 
            startIcon={<ConstructionOutlinedIcon />}
            variant="outlined" 
            size="small"
            color="success"
      >Hello world</Button>
      <Stack direction="row" spacing = {3}>
        <IconButton area-label="ConstructionOutlinedIcon" color="secondary" >
          <ConstructionOutlinedIcon />
        </IconButton>
        <IconButton area-label="FingerprintOutlinedIcon" color="primary">
            <FingerprintOutlinedIcon/>
        </IconButton>
        <IconButton area-label="PictureAsPdfOutlinedIcon" color="primary">
            <PictureAsPdfOutlinedIcon/>
        </IconButton>
        <IconButton area-label="SvgIcon" color="primary">
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                  />
                </svg>
              </SvgIcon>
        </IconButton>
        <IconButton area-label="HomeIcon" color="primary">
          <HomeIcon color="success" />
        </IconButton>
      </Stack>
      <p>
        {
          !categ? "Loading..." : JSON.stringify(categ)
        }
      </p>
      <Box sx={{ minWidth: 120, maxWidth: 300}}>
      <FormControl fullWidth>
        <InputLabel id="categ-label">Category</InputLabel>
        <Select
          labelId="categ-label"
          id="categ-select"
          value={categId}
          label="Category"
          onChange={selectChange}
        >
          {
            categ ? categ.map( el => <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>):''
          }
        </Select>
      </FormControl>
    </Box>
    <p>
      {
        categId ? `Category: 
                  Id = ${categId}; 
                  Name = ${categ.reduce(function(fname,el){
                            if(el.id === parseInt(categId)) return el.name;
                            else return fname}
                          ,'')}` 
                : 'Select category!'
      }
    </p>
    <p>
        {
          !prod? "Loading..." : JSON.stringify(prod)
        }
    </p>
    <Paper sx={{ height: 400, width: '70%' }}>
      <DataGrid
        rows={prod}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
    </div>
  );   
}

export default App;

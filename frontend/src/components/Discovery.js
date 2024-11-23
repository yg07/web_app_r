import * as React from 'react';
import {Button,
        IconButton,
        Stack,
        SvgIcon,
        Box,
        InputLabel,
        MenuItem,
        FormControl,
        Select,
        Paper,
        TextField,
        Dialog,
        DialogActions,
        DialogContent,
        DialogContentText,
        DialogTitle,
        Tabs,
        Tab
        } from '@mui/material';

import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

import { useSnackbar } from 'notistack'; // (npm install notistack)
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';


//tabs nav
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


//home icon
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function App() {

// data from api
const [prod, setProd] = React.useState(null);
const [categ, setCateg] = React.useState(null);



//snackbar
const { enqueueSnackbar } = useSnackbar();
const handleClickVariant = (message, variant) => () => {
  // variant could be success, error, warning, info, or default
  enqueueSnackbar(message , { variant });
};



//select
const [categId, setCategId] = React.useState('');
const selectChange = (event) => {
  setCategId(event.target.value);
};

//dialog
const [open, setOpen] = React.useState(false);
const handleClickOpenDialog = () => {
  setOpen(true);
};
const handleCloseDialog = () => {
  setOpen(false);
};

//tabs 
const [value, setValue] = React.useState(0);
const handleChange = (event, newValue) => {
  setValue(newValue);
};





React.useEffect(() => {
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


//table
const columns = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'name', headerName: 'Наименование', width: 400 },
  { field: 'price', headerName: 'Цена', width: 130 },
  { field: 'categ_id', headerName: 'categ_id', type: 'number',width: 90 },
];

const paginationModel = { page: 0, pageSize: 5 };


return (
  <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Page1" {...a11yProps(0)} />
          <Tab label="Page2" {...a11yProps(1)} />
          <Tab label="PAge3" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>

        <Button 
              onClick={handleClickOpenDialog} 
              startIcon={<ConstructionOutlinedIcon />}
              variant="outlined" 
              size="small"
              color="success"
        >Open Form Dialog</Button>

        <Dialog
          open={open}
          onClose={handleCloseDialog}
          closeAfterTransition={false} // to avoid message - 'Blocked aria-hidden on an element because its descendant retained focus...'
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleCloseDialog();
            },
          }}
        >
        <DialogTitle>Test Form Dialog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Текст для вывода в форме диалога.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Dialog>

        <Stack direction="row" spacing = {3}>
          <IconButton area-label="ConstructionOutlinedIcon" color="secondary" onClick={handleClickVariant('This is a SUCCESS message!','success')}>
            <ConstructionOutlinedIcon />
          </IconButton>
          <IconButton area-label="FingerprintOutlinedIcon" color="primary" onClick={handleClickVariant('This is a ERROR message!','error')}>
              <FingerprintOutlinedIcon/>
          </IconButton>
          <IconButton area-label="PictureAsPdfOutlinedIcon" color="primary" onClick={handleClickVariant('This is a WARNING message!','warning')}>
              <PictureAsPdfOutlinedIcon/>
          </IconButton>
          <IconButton area-label="SvgIcon" color="primary" onClick={handleClickVariant('This is a INFO message!','info')}>
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
          <IconButton area-label="HomeIcon" color="primary" onClick={handleClickVariant('This is a DEFAULT message!')}>
            <HomeIcon color="success" />
          </IconButton>
        </Stack>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>

        {/* <p>
          {
            !categ? "Loading..." : JSON.stringify(categ)
          }
        </p> */}
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
        {/* <p>
            {
              !prod? "Loading..." : JSON.stringify(prod)
            }
        </p> */}

      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>

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

      </CustomTabPanel>
    </Box>
  </>
  );   
}

export default function Discovery()  {
  return (
        <App />
  );
}


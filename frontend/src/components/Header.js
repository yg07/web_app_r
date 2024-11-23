import * as React from 'react';
import { Box,Tabs,Tab, Paper } from '@mui/material';
import {MenuContext} from '../context/GlobalState';
import { Link } from 'react-router-dom';


function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}



export default function Header() {
  
  const {menuItem, setMenuItem} = React.useContext(MenuContext);
  
  const handleChange = (event, newValue) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setMenuItem(newValue);
    }
  };

  return (
    <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          mb: 1
          }}>
      <Paper elevation={5}>
        <Tabs
          value={menuItem}
          onChange={handleChange}
        >
          <Tab label="Orders" to="/order" component={Link} />
          <Tab label="Products" to="/prod" component={Link} />
          <Tab label="Partners" to="/predpr" component={Link} />
          <Tab label="Discovery" to="/discovery" component={Link} />
        </Tabs>
      </Paper>
    </Box>
  );
}
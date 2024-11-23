import Header from './Header';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';



export default function Layout() {
    return (
        <>
        <Header />
        <Box sx={{ 
            borderColor: 'divider' ,
            }}>
            <Box 
                sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                p:0,
                justifyContent:'space-between'
                }}>
                <Outlet />
            </Box>
        </Box>
        </>
    )
}
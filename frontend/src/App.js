import * as React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom"; // (npm install react-router-dom)
import Layout from './components/Layout';
import Order from './components/Order'
import Prod from './components/Prod';
import Discovery from './components/Discovery';
import NotFound from './components/NotFound';
import { MenuContextProvider, ProdContextProvider } from "./context/GlobalState";
import { SnackbarProvider } from 'notistack'; // (npm install notistack)


function App() {

  return (
    <div style={{ maxWidth: "100%", margin: "0.5rem" }}>
      <MenuContextProvider>
        <ProdContextProvider>
          <BrowserRouter future={{
                          v7_startTransition: true,
                          v7_relativeSplatPath: true,
                          }}>
            <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/order" element={<Order />} />
                  <Route path="/prod" element={<Prod />} />
                  <Route path="discovery" element={<Discovery />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
          </BrowserRouter>
        </ProdContextProvider>
      </MenuContextProvider>
    </div>
  )
}

export default function AppWithSnackbar()  {
  return (
    <SnackbarProvider maxSnack={10} autoHideDuration={3000} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
        <App />
    </SnackbarProvider>
  );
}


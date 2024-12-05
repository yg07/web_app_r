import * as React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Order from './components/Order'
import Prod from './components/Prod';
import Discovery from './components/Discovery';
import NotFound from './components/NotFound';
import Layout from './components/Layout'
import { MenuContextProvider } from './context/MenuContext'
import { ProdContextProvider} from "./context/ProdContext";
import { CategContextProvider} from "./context/CategContext";
import { SnackbarProvider } from 'notistack';


function App() {

  return (
    <div style={{ maxWidth: "100%", margin: "0.5rem" }}>
      <MenuContextProvider>
        <ProdContextProvider>
          <CategContextProvider>
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
          </CategContextProvider>
        </ProdContextProvider>
      </MenuContextProvider>
    </div>
  )
}

export default function AppWithSnackbar()  {
  return (
    <SnackbarProvider maxSnack={10} autoHideDuration={10000} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
        <App />
    </SnackbarProvider>
  );
}


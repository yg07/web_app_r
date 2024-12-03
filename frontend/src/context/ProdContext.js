import { createContext, useReducer } from 'react';

const reducer = (state, { type, payload }) => {
  if (type === "loading") return { statusProd: "loading" };
  if (type === "finished") return { statusProd: "finished", dataProd: payload };
  if (type === "error") return { statusProd: "idle", errorProd: payload };
  return state;
};

export const ProdContext = createContext();

export const ProdContextProvider = ({ children }) => {

  const initialState = {
    statusProd: 'idle',
    dataProd: undefined,
    errorProd: undefined
  }
  const [stateProd, dispatch] = useReducer(reducer, initialState);

  const asyncDispatch  = () => {
    dispatch({ type: "loading" });
    fetch("http://localhost:8000/prod")
    .then(response =>  response.json())
    .then( res => {
      dispatch({ type: "finished", payload: res });
    })
    .catch((ex) => {
      console.log("Error: " + ex.statusText);
      dispatch({type: 'error', payload: ex.statusText});
    });
  };
  
  const asyncAddProd  = (nameProd, priceProd, categIdProd) => {
    dispatch({ type: "loading" });
    fetch("http://localhost:8000/prod",{
      method: 'POST',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({name: nameProd, price: priceProd, categ_id: categIdProd })
    })
    .then(response =>  response.json())
    .then(()=>{
      return fetch("http://localhost:8000/prod")
    })
    .then(response =>  response.json())
    .then( res => {
      dispatch({ type: "finished", payload: res });
    })
    .catch((ex) => {
      console.log("Error: " + ex.statusText);
      dispatch({type: 'error', payload: ex.statusText});
    });
  };

  const asyncDeleteProd  = (idProd) => {
    dispatch({ type: "loading" });
    fetch("http://localhost:8000/prod",{
      method: 'DELETE',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id: idProd })
    })
    .then(response =>  response.json())
    .then(()=>{
      return fetch("http://localhost:8000/prod")
    })
    .then(response =>  response.json())
    .then( res => {
      dispatch({ type: "finished", payload: res });
    })
    .catch((ex) => {
      console.log("Error: " + ex.statusText);
      dispatch({type: 'error', payload: ex.statusText});
    });
  };



  const asyncEditProd  = (idProd,nameProd,priceProd,categIdProd) => {
    dispatch({ type: "loading" });
    fetch("http://localhost:8000/prod",{
      method: 'PUT',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id: idProd, name: nameProd, price: priceProd, categ_id: categIdProd })
    })
    .then(response =>  response.json())
    .then(()=>{
      return fetch("http://localhost:8000/prod")
    })
    .then(response =>  response.json())
    .then( res => {
      dispatch({ type: "finished", payload: res });
    })
    .catch((ex) => {
      console.log("Error: " + ex.statusText);
      dispatch({type: 'error', payload: ex.statusText});
    });
  };




  return (
    <ProdContext.Provider value={{
        stateProd,
        dispatchGetProd: asyncDispatch,
        dispatchAddProd: asyncAddProd,
        dispatchDeleteProd: asyncDeleteProd,
        dispatchEditProd: asyncEditProd
    }}>
      {children}
    </ProdContext.Provider>
  )
}




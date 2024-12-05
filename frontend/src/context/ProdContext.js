import { createContext, useReducer } from 'react';

const reducer = (state, { type, payload }) => {
  if (type === "loading") return { ...state, statusProd: "loading", errorProd: undefined };
  if (type === "finished") return { statusProd: "finished", dataProd: payload, errorProd: undefined  };
  if (type === "error") return { ...state, statusProd: "error", errorProd: payload };
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


//get prod
  const asyncGetProd  = () => {
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
  

//add prod
  const asyncAddProd  = (nameProd, priceProd, categIdProd) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/prod",{
      method: 'POST',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({name: nameProd, price: priceProd, categ_id: categIdProd })
    })
    .then(response =>  response.json());

    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });
    
    promise.then(() => {
      return fetch("http://localhost:8000/prod");
    })
    .then(response =>  response.json())
    .then(response => {
      dispatch({type: "finished", payload: response});
    })
    .catch((ex) => {
      console.log("Error: " + ex.statusText);
      dispatch({type: 'error', payload: ex.statusText});
    });
  };


//delete prod
  const asyncDeleteProd  = (idProd) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/prod",{
      method: 'DELETE',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id: idProd })
    })
    .then(response =>  response.json());

    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });
    
    promise.then(() => {
      return fetch("http://localhost:8000/prod");
    })
    .then(response =>  response.json())
    .then(response => {
      dispatch({type: "finished", payload: response});
    })
    .catch((ex) => {
      console.log("Error: " + ex.statusText);
      dispatch({type: 'error', payload: ex.statusText});
    });
  };


//edit prod
  const asyncEditProd  = (idProd,nameProd,priceProd,categIdProd) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/prod",{
      method: 'PUT',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id: idProd, name: nameProd, price: priceProd, categ_id: categIdProd })
    })
    .then(response =>  response.json());

    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });
    
    promise.then(() => {
      return fetch("http://localhost:8000/prod");
    })
    .then(response =>  response.json())
    .then(response => {
      dispatch({type: "finished", payload: response});
    })
    .catch((ex) => {
      console.log("Error: " + ex.statusText);
      dispatch({type: 'error', payload: ex.statusText});
    });
  };


  return (
    <ProdContext.Provider value={{
        stateProd,
        dispatchGetProd: asyncGetProd,
        dispatchAddProd: asyncAddProd,
        dispatchDeleteProd: asyncDeleteProd,
        dispatchEditProd: asyncEditProd
    }}>
      {children}
    </ProdContext.Provider>
  )
}




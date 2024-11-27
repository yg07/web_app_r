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
  
  return (
    <ProdContext.Provider value={{
        stateProd,
        dispatchProd: asyncDispatch
    }}>
      {children}
    </ProdContext.Provider>
  )
}



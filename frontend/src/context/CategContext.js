import { createContext, useReducer } from 'react';

const reducer = (state, { type, payload }) => {
  if (type === "loading") return { statusCateg: "loading" };
  if (type === "finished") return { statusCateg: "finished", dataCateg: payload };
  if (type === "error") return { statusCateg: "idle", errorCateg: payload };
  return state;
};

export const CategContext = createContext();

export const CategContextProvider = ({ children }) => {

  const initialState = {
    statusCateg: 'idle',
    dataCateg: undefined,
    errorCateg: undefined
  }
  const [stateCateg, dispatch] = useReducer(reducer, initialState);

  const asyncDispatch  = () => {
    dispatch({ type: "loading" });
    fetch("http://localhost:8000/categ")
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
    <CategContext.Provider value={{
        stateCateg,
        dispatchCateg: asyncDispatch
    }}>
      {children}
    </CategContext.Provider>
  )
}




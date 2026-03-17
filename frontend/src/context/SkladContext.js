import { createContext, useReducer } from 'react';

const reducer = (state, { type, payload }) => {
  if (type === "loading") return { ...state, statusSklad: "loading", errorSklad: undefined };
  if (type === "finished") return { statusSklad: "finished", dataSklad: payload, errorSklad: undefined  };
  if (type === "error") return { ...state, statusSklad: "error", errorSklad: payload };
  return state;
};

export const SkladContext = createContext();

export const SkladContextProvider = ({ children }) => {

  const initialState = {
    statusSklad: 'idle',
    dataSklad: undefined,
    errorSklad: undefined
  }
  const [stateSklad, dispatch] = useReducer(reducer, initialState);


//get Sklad
  const asyncGetSklad  = () => {
    dispatch({ type: "loading" });
    fetch("http://localhost:8000/sklad")
    .then(response =>  response.json())
    .then( res => {
      dispatch({ type: "finished", payload: res });
    })
    .catch((ex) => {
      console.log("Error: " + ex.message);
      dispatch({type: 'error', payload: ex.message});
    });
  };
  

//add Sklad
  const asyncAddSklad  = (prodIdSklad, kolSklad, ) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/sklad",{
      method: 'POST',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({prod_id: prodIdSklad, kol: kolSklad })
    })
    .then(response =>  response.json());

    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });
    
    promise.then(() => {
      return fetch("http://localhost:8000/sklad");
    })
    .then(response =>  response.json())
    .then(response => {
      dispatch({type: "finished", payload: response});
    })
    .catch((ex) => {
      console.log("Error: " + ex.message);
      dispatch({type: 'error', payload: ex.message});
    });
  };


//delete Sklad
  const asyncDeleteSklad  = (idSklad) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/sklad",{
      method: 'DELETE',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id: idSklad })
    })
    .then(response =>  response.json());

    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });
    
    promise.then(() => {
      return fetch("http://localhost:8000/sklad");
    })
    .then(response =>  response.json())
    .then(response => {
      dispatch({type: "finished", payload: response});
    })
    .catch((ex) => {
      console.log("Error: " + ex.message);
      dispatch({type: 'error', payload: ex.message});
    });
  };


//edit Sklad
  const asyncEditSklad  = (idSklad, prodIdSklad, kolSklad,) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/sklad",{
      method: 'PUT',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id: idSklad, prod_id: prodIdSklad, kol: kolSklad })
    })
    .then(response =>  response.json());

    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });
    
    promise.then(() => {
      return fetch("http://localhost:8000/sklad");
    })
    .then(response =>  response.json())
    .then(response => {
      dispatch({type: "finished", payload: response});
    })
    .catch((ex) => {
      console.log("Error: " + ex.message);
      dispatch({type: 'error', payload: ex.message});
    });
  };


  return (
    <SkladContext.Provider value={{
        stateSklad,
        dispatchGetSklad: asyncGetSklad,
        dispatchAddSklad: asyncAddSklad,
        dispatchDeleteSklad: asyncDeleteSklad,
        dispatchEditSklad: asyncEditSklad
    }}>
      {children}
    </SkladContext.Provider>
  )
}




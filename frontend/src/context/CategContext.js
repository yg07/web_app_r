import { createContext, useReducer } from 'react';

const reducer = (state, { type, payload }) => {
  if (type === "loading") return { ...state, statusCateg: "loading", errorCateg: undefined };
  if (type === "finished") return { statusCateg: "finished", dataCateg: payload, errorCateg: undefined };
  if (type === "error") return { ...state, statusCateg: "error", errorCateg: payload };
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


//get category  
  const asyncGetCateg  = () => {
    dispatch({ type: "loading" });
    fetch("http://localhost:8000/categ")
    .then(response =>  response.json())
    .then(response => {
      dispatch({ type: "finished", payload: response });
    })
    .catch((ex) => {
      console.log( "Error: " + ex.statusText );
      dispatch({ type: 'error', payload: ex.statusText });
    });
  };
  

//add category    
  const asyncAddCateg  = (nameCateg) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/categ",{
      method: 'POST',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({name: nameCateg })
    })
    .then(response =>  response.json());
    
    
    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });

    promise.then(() => {
      return fetch("http://localhost:8000/categ");
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


//del category  
  const asyncDeleteCateg  = (idCateg) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/categ",{
      method: 'DELETE',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id: idCateg })
    })
    .then(response =>  response.json());

    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });

    promise.then(() => {
      return fetch("http://localhost:8000/categ");
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


//edit category  
  const asyncEditCateg  = (idCateg,nameCateg) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/categ",{
      method: 'PUT',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id: idCateg, name: nameCateg })
    })
    .then(response =>  response.json());

    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });

    promise.then(() => {
      return fetch("http://localhost:8000/categ");
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
    <CategContext.Provider value={{ 
        stateCateg,
        dispatchGetCateg: asyncGetCateg,
        dispatchAddCateg: asyncAddCateg,
        dispatchDeleteCateg: asyncDeleteCateg,
        dispatchEditCateg: asyncEditCateg
    }}>
      {children}
    </CategContext.Provider>
  )
}




import { createContext, useReducer } from 'react';

const reducer = (state, { type, payload }) => {
  if (type === "loading") return { ...state, statusPredpr: "loading", errorPredpr: undefined };
  if (type === "finished") return { statusPredpr: "finished", dataPredpr: payload, errorPredpr: undefined };
  if (type === "error") return { ...state, statusPredpr: "error", errorPredpr: payload };
  return state;
};

export const PredprContext = createContext();

export const PredprContextProvider = ({ children }) => {

  const initialState = {
    statusPredpr: 'idle',
    dataPredpr: undefined,
    errorPredpr: undefined
  }
  const [statePredpr, dispatch] = useReducer(reducer, initialState);


//get Predpr
  const asyncGetPredpr  = () => {
    dispatch({ type: "loading" });
    fetch("http://localhost:8000/predpr")
    .then(response =>  response.json())
    .then(response => {
      dispatch({ type: "finished", payload: response });
    })
    .catch((ex) => {
      console.log( "Error: " + ex.message );
      dispatch({ type: 'error', payload: ex.message });
    });
  };
  

//add Predpr 
  const asyncAddPredpr  = (namePredpr,addressPredpr) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/predpr",{
      method: 'POST',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({name: namePredpr, address: addressPredpr})
    })
    .then(response =>  response.json());
    
    
    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });

    promise.then(() => {
      return fetch("http://localhost:8000/predpr");
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


//del Predpr  
  const asyncDeletePredpr  = (idPredpr) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/predpr",{
      method: 'DELETE',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id: idPredpr })
    })
    .then(response =>  response.json());

    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });

    promise.then(() => {
      return fetch("http://localhost:8000/predpr");
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


//edit Predpr  
  const asyncEditPredpr  = (idPredpr,namePredpr,addressPredpr) => {
    dispatch({ type: "loading" });
    const promise = fetch("http://localhost:8000/predpr",{
      method: 'PUT',
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ id: idPredpr, name: namePredpr, address: addressPredpr})
    })
    .then(response =>  response.json());

    promise.then((response)=>{
      if(response.status !== 200){
        console.log(response.message);
        dispatch({type: 'error', payload:response.message});
      }
    });

    promise.then(() => {
      return fetch("http://localhost:8000/predpr");
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
    <PredprContext.Provider value={{ 
        statePredpr,
        dispatchGetPredpr: asyncGetPredpr,
        dispatchAddPredpr: asyncAddPredpr,
        dispatchDeletePredpr: asyncDeletePredpr,
        dispatchEditPredpr: asyncEditPredpr
    }}>
      {children}
    </PredprContext.Provider>
  )
}




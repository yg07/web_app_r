import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//menu
export const MenuContext = createContext();

export const MenuContextProvider = ({ children}) => {
  const [menuItem, setMenuItem] = React.useState(0);
  return (
      <MenuContext.Provider value={{menuItem, setMenuItem}}>
          {children}
      </MenuContext.Provider>
  );
};


//prod & categ
export const ProdContext = createContext();

export const ProdContextProvider = ({ children }) => {

  React.useEffect(() => {
    fetch("http://localhost:8000/prod")
    .then(response =>  response.json())
    .then( res => fetchData('prod', res))
    .catch((ex) => {
      console.log("Error: " + ex.statusText);
      alert("Error: " + ex.statusText);
  });
  fetch("http://localhost:8000/categ")
    .then(response =>  response.json())
    .then( res => fetchData('categ', res))
    .catch((ex) => {
      console.log("Error: " + ex.statusText);
      alert("Error: " + ex.statusText);
  });
  },[])

  const initialState = {
    prod: [],
    categ: []  
  }
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const fetchData = (tabl,data) => {
    dispatch({
      type: 'FETCH',
      target: tabl,
      payload: data
    })
  }


  const removeData = (tabl,id) => {
    dispatch({
      type: 'REMOVE',
      target: tabl,
      payload: id
    })
  }

  const addData = (tabl,data) => {
    dispatch({
      type: 'ADD',
      target: tabl,
      payload: data
    })
  }

  const editData = (tabl,data) => {
    dispatch({
      type: 'EDIT',
      target: tabl,
      payload: data
    })
  }

  return (
    <ProdContext.Provider value={{
      prod: state.prod,
      categ: state.categ,
      fetchData,
      removeData,
      addData,
      editData
    }}>
      {children}
    </ProdContext.Provider>
  )
}
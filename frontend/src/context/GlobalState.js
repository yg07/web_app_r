import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';


// Create Context

export const MenuContext = createContext();

// export const MenuContextProvider = ({ children}) => {
//   const [menuItem, setMenuItem] = React.useState(0);
//   return (
//       <MenuContext.Provider value={{menuItem, setMenuItem}}>
//           {children}
//       </MenuContext.Provider>
//   );
// };



export const DataContext = createContext();

// Provider Component
export const DataProvider = ({ children }) => {

  // Initial State
  const [prod, setProd] = React.useState(null);
  const [categ, setCateg] = React.useState(null);
  
  React.useEffect(() => {
    fetch("http://localhost:8000/prod")
    .then(response =>  response.json())
    .then( res => setProd(res))
    .catch((ex) => {
      console.log("Error: " + ex.statusText);
      alert("Error: " + ex.statusText);
  });
  fetch("http://localhost:8000/categ")
    .then(response =>  response.json())
    .then( res => setCateg(res))
    .catch((ex) => {
      console.log("Error: " + ex.statusText);
      alert("Error: " + ex.statusText);
  });
  },[])

  const initialState = {
    prod: prod,
    categ: categ  
  }
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
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
    <DataContext.Provider value={{
      prod: state.prod,
      categ: state.categ,
      removeData,
      addData,
      editData
    }}>
      {children}
    </DataContext.Provider>
  )
}
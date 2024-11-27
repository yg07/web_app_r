import { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuContextProvider = ({ children}) => {
  const [menuItem, setMenuItem] = useState(0);
  return (
      <MenuContext.Provider value={{menuItem, setMenuItem}}>
          {children}
      </MenuContext.Provider>
  );
};

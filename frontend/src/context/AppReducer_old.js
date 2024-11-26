export default function AppReducer(state, action) {
  switch (action.type) {
    case 'FETCH':
      return {
        ...state,
        prod: action.target === 'prod'? action.payload : state.prod,
        categ: action.target === 'categ'? action.payload : state.categ,
      }
    case 'REMOVE':
      return {
        ...state,
        prod: action.target === 'prod'? state.prod.filter( data => {
                                            return data.id !== action.payload;
                                            }) : state.prod,
        categ: action.target === 'categ'? state.categ.filter( data => {
                                            return data.id !== action.payload;
                                            }) : state.categ,
      }
    case 'ADD':
      return {
        ...state,
        prod: action.target === 'prod'? [action.payload, ...state.prod]:state.prod,
        categ: action.target === 'categ'? [action.payload, ...state.categ]:state.categ,
      }
    case 'EDIT':
      return {
        ...state,
        prod: action.target === 'prod'? state.prod.map(data => {
                                        if (data.id ===  action.payload.id) {
                                          return  action.payload;
                                        }
                                        return data;
                                        }) : state.prod,
        categ: action.target === 'categ'? state.categ.map(data => {
                                        if (data.id ===  action.payload.id) {
                                          return  action.payload;
                                        }
                                        return data;
                                        }) : state.categ,
      }

    default:
      return state;
  }
}
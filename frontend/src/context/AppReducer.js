export default function AppReducer(state, action) {
  switch (action.type) {
    case 'FETCH':
      return {
        ...state,
        prod: action.target === 'prod'? action.payload : state.prod,
      }
    case 'REMOVE':
      return {
        ...state,
        prod: action.target === 'prod'? state.prod.filter( data => {
                                            return data.id !== action.payload;
                                            }) : state.prod,
      }
    case 'ADD':
      return {
        ...state,
        prod: action.target === 'prod'? [action.payload, ...state.prod]:state.prod,
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
      }

    default:
      return state;
  }
}
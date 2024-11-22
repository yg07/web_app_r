export default function AppReducer(state, action) {
  switch (action.type) {
    case 'REMOVE':
      // here... remode DB.target(id)
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
        //here... action.payload -> DB.target -> id -> correct action.payload.id
      return {
        ...state,
        prod: action.target === 'prod'? [action.payload, ...state.prod]:state.prod,
        categ: action.target === 'categ'? [action.payload, ...state.categ]:state.categ,
        users: [action.payload, ...state.users]
      }
    case 'EDIT':
      //here...  update DB.target
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
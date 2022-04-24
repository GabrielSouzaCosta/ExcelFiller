const initialState = {
    currentId: "1",
    tables: [{value: null, label: null, id: null}],
    columns: [
        {name: "teste", type: ""}
    ]
}

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_TABLES":
            {
                let data = action.payload.map(({name, id}) => {
                    return {value: name, label: name, id: id};
                })
                return {...state, tables: data}
            }
        case "CHANGE_TABLE":
            {
                return {...state, currentId: action.payload}
            }
            
        case "CREATE_TABLE":
            {
                return {...state, tables: [{value: action.payload.name, label: action.payload.name, id: action.payload.id}]};
            }
            
        case "DELETE_TABLE":
            {
                return {...state, name: ""};
            }
        
        case "FETCH_COLUMNS":
            {
                let data = action.payload.map(({name}) => { return{name: name, type: ""}});
                return {...state, columns: action.payload}
            }

        case "ADD_COLUMN":
            {
                let id = action.payload.id
                console.log(state.columns)
                return {...state, columns: [...state.columns, {name: action.payload.name, type: ""}]}
            }
        
        default:    
            return state;
    }
};

export default tableReducer;
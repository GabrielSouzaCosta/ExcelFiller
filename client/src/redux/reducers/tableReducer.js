const initialState = {
    currentId: sessionStorage.getItem("table_id"),     
    tables: [{value: null, label: null, id: null}],
    columns: [
        {name: "teste", type: ""}
    ],
    rows: []
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
                sessionStorage.setItem("table_id", action.payload)
                return {...state, currentId: action.payload}
            }
            
        case "CREATE_TABLE":
            {
                return {...state, tables: [...state.tables, {value: action.payload.name, label: action.payload.name, id: action.payload.id}]};
            }
            
        case "DELETE_TABLE":
            {
                let ftables = [state.tables.filter((table) => {return table.id !== action.payload})]
                console.log(ftables)
                return {...state, tables: ftables, currentId: 1};
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

        case "ADD_ROW":
            {
                return {...state, rows: [...state.rows, action.payload]}
            }
        
        default:    
            return state;
    }
};

export default tableReducer;
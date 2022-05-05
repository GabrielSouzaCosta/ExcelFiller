const initialState = {  
    columns: {},
    rows: []
}

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
                        
        case "FETCH_COLUMNS":
            {
                let data = action.payload.columns.map((col) => { return{name: col.name, type: "text", id: col.id}});
                return {...state, columns: {tableId: action.payload.id, cols: data } }
            }

        case "ADD_COLUMN":
            {
                return {...state, columns: {...state.columns, cols: [...state.columns.cols, {name: action.payload.name, type: "", id: action.payload.id}]}}
            }

        case "ADD_ROW":
            {
                return {...state, rows: [...state.rows, action.payload]}
            }

        case "REMOVE_ROW":
            {
                let filteredRows = state.rows.filter((row, i) => {return i !== action.payload})
                return {...state, rows: filteredRows}
            }

        case "CHANGE_COLUMN_NAME":
            {
                let index = state.columns.cols.findIndex(item => item.id === parseInt(action.payload.id))
                let clone = [...state.columns.cols]
                let item = {...clone[index]}
                item.name = action.payload.newName
                clone[index] = item
                return {...state, columns: {...state.columns, cols: clone}}
            }

        case "DELETE_COLUMN":
            {
                let filteredColumns = state.columns.cols.filter((col) => {
                    if (col.id !== parseInt(action.payload.id)) {
                        return col
                    }
                    return null
                })
                return {...state, columns: {...state.columns.cols, cols: filteredColumns} }
            }

        case "SELECT_INPUT":
            {
                let index = state.columns.cols.findIndex(item => item.id === parseInt(action.payload.id) )
                let clone = [...state.columns.cols]
                let item = {...clone[index]}
                item.type = action.payload.type.value
                clone[index] = item
                return {...state, columns: {...state.columns, cols: clone}}
            }
        
        default:    
            return state;
    }
};

export default tableReducer;
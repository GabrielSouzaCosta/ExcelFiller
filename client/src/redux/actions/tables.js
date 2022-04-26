import axios from "axios"

export const createTable = (table) => async (dispatch) => {
    const response = await axios.post('/create_table', {"name": table})
    dispatch({type: "CREATE_TABLE", payload: {name: response.data.name, id: response.data.id}})
}

export const deleteTable = (id) => async (dispatch) => {
    const response = await axios.delete('/delete_table', {data: {"id": id}})
    dispatch({type: "DELETE_TABLE", payload: id})
}

export const fetchTables = () => async (dispatch) => {
        const response = await axios.get('/tables');
        dispatch({type: "FETCH_TABLES", payload: response.data})
    };

export const changeTable = (id) => {
    return {
        type: "CHANGE_TABLE",
        payload: id
    }
}

export const fetchColumns = (id) => async (dispatch) => {
    const response = await axios.get(`/tables/${id}`)
    dispatch({type: "FETCH_COLUMNS", payload: response.data.columns})
}

export const addColumn = (name, id) => async (dispatch) => {
    let data = {"name":name}
    const response = await axios.post(`/tables/${id}/add_column`, data)
    dispatch({type: "ADD_COLUMN", payload: {name: response.data.name, id: response.data.id}})
}

export const addRow = (cells) => async (dispatch) => {
    dispatch({type: "ADD_ROW", payload: cells})
}
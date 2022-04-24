import axios from "axios"

export const createTable = (table) => {
    return {
        type: "CREATE_TABLE",
        payload: {name: table}
    }
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
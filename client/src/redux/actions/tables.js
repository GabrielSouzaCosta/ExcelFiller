import axios from "axios"
import store from '../store';

export const createTable = (table) => async (dispatch) => {
    const response = await axios.post('/create_table', {"name": table})
    dispatch({type: "CREATE_TABLE", payload: {name: response.data.name, id: response.data.id}})
}

export const deleteTable = (id) => async (dispatch) => {
    await axios.delete('/delete_table', {data: {"id": id}})
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

export const changeColumnName = (newName, id) => async (dispatch) => {
    let table_id = store.getState().tableReducer.currentId
    await axios.put(`tables/${table_id}/update_column`, {data: {"new_name": newName, "id":id}})
    dispatch({type: "CHANGE_COLUMN_NAME", payload: {newName: newName, id: id}})
}
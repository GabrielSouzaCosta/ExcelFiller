import axios from "axios"
import store from '../store';

export const createTable = (table, token) => async (dispatch) => {
    console.log(token)
    const response = await axios.post('/create_table', {"name": table}, {headers: {"Authorization": "Bearer "+ token} })
    dispatch({type: "CREATE_TABLE", payload: {name: response.data.name, id: response.data.id}})
}

export const deleteTable = (id) => async (dispatch) => {
    await axios.delete('/delete_table', {data: {"id": id}})
    dispatch({type: "DELETE_TABLE", payload: id})
}

export const fetchTables = (token) => async (dispatch) => {
        const response = await axios.get('/tables', {headers: {"Authorization": "Bearer "+ token} } );
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
    dispatch({type: "FETCH_COLUMNS", payload: response.data})
}

export const addColumn = (name, id) => async (dispatch) => {
    let data = {"name":name}
    const response = await axios.post(`/tables/${id}/add_column`, data)
    dispatch({type: "ADD_COLUMN", payload: {name: response.data.name, id: response.data.id}})
}

export const addRow = (cells) => {
    return {
        type: "ADD_ROW", 
        payload: cells
    }
}

export const removeRow = (i) => {
    return {
        type: "REMOVE_ROW", payload: i
    }
}

export const changeColumnName = (newName, id, currentId) => async (dispatch) => {
    let table_id = currentId
    await axios.put(`tables/${table_id}/update_column`, {data: {"new_name": newName, "id":id}})
    dispatch({type: "CHANGE_COLUMN_NAME", payload: {newName: newName, id: id}})
}

export const deleteColumn = (id, currentId) => async (dispatch) => {
    let table_id = currentId
    await axios.delete(`tables/${table_id}/delete_column`, {data: {"column_id": id}})
    dispatch({type: "DELETE_COLUMN", payload: {table_id: table_id, id:id}})
}

export const selectInput = (type, id) => {
    return {
        type: "SELECT_INPUT",
        payload: {type: type, id: id}
    }
}
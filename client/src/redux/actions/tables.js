import axios from "axios"

export const fetchColumns = (id) => async (dispatch) => {
    const response = await axios.get(`https://lit-bastion-94694.herokuapp.com/tables/${id}`)
    dispatch({type: "FETCH_COLUMNS", payload: response.data})
}

export const addColumn = (name, id) => async (dispatch) => {
    let data = {"name":name}
    const response = await axios.post(`https://lit-bastion-94694.herokuapp.com/tables/${id}/add_column`, data)
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

export const resetRows = () => {
    return {type: "RESET_ROWS"}
}

export const changeColumnName = (newName, id, currentId) => async (dispatch) => {
    let table_id = currentId
    await axios.put(`https://lit-bastion-94694.herokuapp.com/tables/${table_id}/update_column`, {data: {"new_name": newName, "id":id}})
    dispatch({type: "CHANGE_COLUMN_NAME", payload: {newName: newName, id: id}})
}

export const deleteColumn = (id, currentId) => async (dispatch) => {
    let table_id = currentId
    await axios.delete(`https://lit-bastion-94694.herokuapp.com/tables/${table_id}/delete_column`, {data: {"column_id": id}})
    dispatch({type: "DELETE_COLUMN", payload: {table_id: table_id, id:id}})
}

export const selectInput = (type, id) => {
    return {
        type: "SELECT_INPUT",
        payload: {type: type, id: id}
    }
}
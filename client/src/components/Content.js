import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from 'react-redux';
import { createTable, fetchTables, fetchColumns, addColumn, deleteTable, addRow, changeColumnName, deleteColumn, removeRow, selectInput } from '../redux/actions/tables';
import axios from 'axios';
import InputSelector from './InputSelector';

const options = [
    { value: 'text', label: 'Manual type'},
    { value: 'item', label: 'Item'},
    { value: 'date', label: 'Date'},
    { value: 'time', label: 'Time'},
    { value: 'currency', label: 'Currency'},
    { value: 'autodate', label: 'Automatic Date'},
    { value: 'autotime', label: 'Automatic Time'}
  ]

function Content() {
  const [currentId, setCurrentId] = useState(sessionStorage.getItem("table_id"));
  const currentTable = useSelector(state => {
      let currTable = state.tableReducer.tables.filter((table) => {
          if (table.id === currentId) {
              return table
          } 
          return null
      })
      return currTable
    })
    const tablesOptions = useSelector(state => state.tableReducer.tables)
    const columns = useSelector(state => state.tableReducer.columns)
    const rows = useSelector(state => state.tableReducer.rows)
    
    const dispatch = useDispatch()
    
    const [newCol, setNewCol] = useState("")
    const [localColumns, setLocalColumns] = useState({})
    let session_id = sessionStorage.getItem("table_id")
    let [token, setToken] = useState(sessionStorage.getItem("token"))
    

  
  useEffect(() => {
      setToken(sessionStorage.getItem("token"))
      if (session_id){
          dispatch(fetchColumns(session_id))
      }
  }, [])

  useEffect(() => {
      dispatch(fetchTables(token))
      if (currentId !== undefined && currentId !== null) {
        dispatch(fetchColumns(currentId))
    }
}, [currentId])

  useEffect(() => {
      setLocalColumns(columns)
  }, [columns])    


  async function generateFile(e) {
    e.preventDefault();
    let headers = columns.cols.map((col) => {return col.name})
    let content = {'cells': rows, 'headers': headers}
    await axios( {url:'https://lit-bastion-94694.herokuapp.com/generate_file', method: 'POST', responseType: 'blob' , data: content} ).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sheet.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
    });
  }


  function handleColumnChange(e, id) {
    e.preventDefault()
    let index = localColumns.cols.findIndex(item => item.id === id)
    let clone = [...localColumns.cols]
    let item = clone[index]
    item.name = e.target.value  
    clone[index] = item
    setLocalColumns({...localColumns, cols: clone})
  }

  function createCells(e) {
    e.preventDefault()
    const cells = []
    columns.cols.forEach((column, i) => {
        let cell = document.getElementById(`value-${i}`).value
        cells.push(cell)
    })
    return cells
  }

  return (
    <div style={{backgroundColor: "#cbd4c2"}} className="vh-100">
            <div className="container-fluid">
                <h1 className="display-4 pb-2 pt-5 text-center">Tables</h1>

                <div className="nav justify-content-center">
                    <form className="text-center">
                        <div className="d-flex ">
                            <CreatableSelect placeholder="Choose or Create" options={tablesOptions} value={currentTable} id={currentId} onCreateOption={(e) => dispatch(createTable(e, token))} onChange={(e) => setCurrentId(e.id)} />
                            <button className="btn btn-danger ms-3" onClick={ (e) => {dispatch(deleteTable(currentId));  dispatch(fetchTables(token));} }>Delete Table</button>
                        </div>
                        <button type="submit" value="generateFile" onClick={(e) => generateFile(e)} className="btn btn-success mt-3 mb-4">Generate File</button>
                    </form>
                </div>

                <div className="container-fluid d-flex flex-row col-12 p-0 justify-content-start align-items-center">
                            {(columns.cols) ? <>
                                {columns.cols.map((col, i) => {
                                return(
                                    <form key={i+`-${col.name}`} className="p-0 m-0 me-3" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                                        <div className="input-group">
                                            <input tabIndex={-1} className="form-control form-control-sm text-center mb-2" id={col.id} defaultValue={col.name} onMouseLeave={(e) => { if (e.target.value !== col.name) {setTimeout(()=>{ dispatch(changeColumnName(e.target.value, e.target.id, currentId)) }, 1000)}; handleColumnChange(e, e.target.id)}} aria-describedby="button-delete"  ></input>
                                            <div className="input-group-append" >
                                            <input  tabIndex={-1} className="px-0 ms-1 pt-1" type="image" alt='delete-column' value={col.id} id="button-delete" src='delete_column.png' onClick={(e) => {e.preventDefault(); dispatch(deleteColumn(e.target.value, currentId))}}></input> 
                                            </div>
                                        </div>
                                        <Select tabIndex={-1} className=" mb-2" options={options} defaultValue={options[0]} onChange={(e) => { dispatch(selectInput(e, col.id)) }} />
                                        <InputSelector type={col.type} columnId={col.id} index={i} />
                                    </form>          
                                )
                            })}
                            <button type="submit" style={{backgroundColor: "#721817"}} className="me-3 btn text-light h-100" onClick={(e) => {
                                let cells = createCells(e);
                                dispatch(addRow(cells));
                            }}>Insert row</button>
                            </>
                             :  <div className='container-fluid text-center'>
                                    <p className='display-5 mt-5 m-auto'>"Create a table or select one..." &#128522;</p>
                                    <p style={{fontVariant: "small-caps"}} className="fs-4 pt-2"><span className='fw-bolder'>TIP</span>: Use <span className='fw-bolder'>TAB</span> to go to next value and <span className='fw-bolder'>ALT + TAB</span> to previous value</p>
                                </div>
                                }
                            
                            
                            {(columns.cols) ? <>
                                {columns.cols.length < 7 ?
                                                <form className="p-0 m-0">
                                                    <div className="d-flex flex-row">
                                                        <input type="text" tabIndex={-1} className="form-control form-control-md text-center" placeholder="Name of the column" value={newCol} onChange={(e) => setNewCol(e.target.value)}  ></input>
                                                        <input className="ms-2" style={{width: '30px'}} type="image" src="plus-square.svg" alt="add column" onClick={(e) => {e.preventDefault(); setNewCol(""); dispatch(addColumn(newCol, currentId));}}></input>
                                                    </div>
                                                </form>
                                    : ""    
                                }
                            </>  : ""}
    
                        </div>

                        <div className="col-12 p-0 justify-content-start align-items-center mt-3 ps-2" id="rowsDiv">
                            <div style={{paddingRight:"57px"}} className="row w-100">
                            {(localColumns.cols) ? <>
                                {localColumns.cols.map(col => {
                                return(         
                                    <div key={col.id + "_header"} className="col card text-center">
                                        {col.name}
                                    </div>
                                )
                            })}
                            </>
                             : ""}
                            
                                
                            </div>
                                    {rows.map((row, i) => {
                                        return(
                                            <div key={`row ${i}`} id={`row-${i}`} className="row w-100">
                                                {row.map((cell, index) => {  
                                                    return(<div key={`cell-${index}`} style={{height:"25px"}} className="col card align-middle">{cell}</div>)
                                                })}
                            
                                                <input key={"delete "+i} style={{width: '50px'}} type="image" className="ms-2" src="cancel.png" alt='delete row' onClick={(e) => {
                                                    dispatch(removeRow(i));
                                                    }}></input>
                                            </div>
                                        )
                                    })} 
                        </div>
                
        

            </div>
            </div>
  )
}

export default Content
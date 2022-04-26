import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from 'react-redux';
import { createTable, fetchTables, fetchColumns, changeTable, addColumn, deleteTable, addRow } from '../redux/actions/tables';
import axios from 'axios';

const options = [
    { value: 'manualtype', label: 'Manual type'},
    { value: 'date', label: 'Date'},
    { value: 'time', label: 'Time'},
    { value: 'currency', label: 'Currency'},
    { value: 'autodate', label: 'Automatic Date'},
    { value: 'autotime', label: 'Automatic Time'},
    { value: 'Item', label: 'Item'},
  ]

function Content() {
  const currentId = useSelector(state => state.tableReducer.currentId)
  const currentTable = useSelector(state => {
      let currTable = state.tableReducer.tables.filter((table) => {
          if (table.id == currentId) {
              return table
          }
      })
      return currTable
    })
  const tablesOptions = useSelector(state => state.tableReducer.tables)
  const columns = useSelector(state => state.tableReducer.columns)
  const rows = useSelector(state => state.tableReducer.rows)

  const dispatch = useDispatch()

  const [newCol, setNewCol] = useState("")
  

  useEffect(() => {
      dispatch(fetchColumns(sessionStorage.getItem("table_id")))
  }, [])

  useEffect(() => {
    dispatch(fetchTables())
    dispatch(fetchColumns(currentId))
  }, [currentId])

  function createCells(e) {
    e.preventDefault()
    const cells = []
    columns.forEach((column, i) => {
      let cell = document.getElementById(`value-${i}`).value
      cells.push(cell)
    })
    return cells
  }

  async function generateFile(e) {
    let content = {'cells': rows, 'headers': columns}
    e.preventDefault()
    await axios.post('/generate_file', {data: content}).catch(err => console.log(err))
  }




  return (
    <div className="vh-100">
            <div className="container-fluid">
                <h1 className="display-4 py-3 text-center">Tables</h1>

                <div className="nav justify-content-center">
                    <form className="text-center">
                        <div className="d-flex ">
                            <CreatableSelect options={tablesOptions} value={currentTable} onCreateOption={(e) => dispatch(createTable(e))} onChange={(e) => dispatch(changeTable(e.id))} />
                            <button className="btn btn-danger ms-3" onClick={(e) => {e.preventDefault(); dispatch(deleteTable(currentId))}}>Delete Table</button>
                        </div>
                        <button type="submit" value="generateFile" onClick={(e) => generateFile(e)} className="btn btn-success mt-3 mb-4">Generate File</button>
                    </form>
                </div>

                <div className="container-fluid d-flex flex-row col-12 p-0 justify-content-start align-items-center">
                            {columns.map((col, i) => {
                        
                                return(
                                    <form key={i} className="p-0 m-0 me-3">
                                        <input className="text-center mb-2" defaultValue={col.name}></input>
                                        <Select className=" mb-2" options={options} defaultValue={options[0]} />
                                        <input className="" id={`value-${i}`}></input>
                                    </form>          
                                )
                            })}
                            
                            {columns.length < 7 ?
                                    <>
                                        <form className="p-0 m-0" onSubmit={(e) => console.log(e)}>
                                            <input className="mb-2" placeholder="Name of the column" value={newCol} onChange={(e) => setNewCol(e.target.value)} ></input>
                                                <Select className=" mb-2" options={options} defaultValue={options[0]} />
                                            </form>
                                        <input className="ms-2" style={{width: '30px'}} type="image" src="plus-square.svg" alt="add column" onClick={(e) => {setNewCol(""); dispatch(addColumn(newCol, currentId))}}></input>
                                      
                                    </>
                                : ""    
                            }
                            <button type="submit" className="ms-3 btn btn-secondary h-100" onClick={(e) => {
                                let cells = createCells(e); 
                                dispatch(addRow(cells));
                            }}>Insert row</button>
    
                        </div>

                        <div className="col-12 p-0 justify-content-start align-items-center mt-3 ps-2" id="rowsDiv">
                            <div className="row w-100">
                                {columns.map(col => {
                                    return(
                                        <div key={col.id + "_header"} className="col card text-center">
                                            {col.name}
                                        </div>
                                    )
                                })}
                            </div>    
                            {rows.map(row => {
                                return(
                                    <div className="row w-100">
                                        {row.map(cell => {
                                            return(<div className="col card">{cell}</div>)
                                        })}
                                        
                                    </div>
                                )
                            })}
                        </div>
                
        

            </div>
            </div>
  )
}

export default Content
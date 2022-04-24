import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from 'react-redux';
import { createTable, fetchTables, fetchColumns, changeTable, addColumn } from '../redux/actions/tables';

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
  const tablesOptions = useSelector(state => state.tableReducer.tables)
  const columns = useSelector(state => state.tableReducer.columns)
  const rows = []

  const dispatch = useDispatch()

  console.log(columns)

  const [newCol, setNewCol] = useState("")


  useEffect(() => {
    dispatch(fetchTables())
    dispatch(fetchColumns(currentId))
  }, [currentId])

  return (
    <div className="vh-100">
            <div className="container-fluid">
                <h1 className="display-4 py-3 text-center">Tables</h1>

                <div className="nav justify-content-center">
                    <form className="text-center">
                        <div className="d-flex ">
                            <CreatableSelect options={tablesOptions} defaultValue={tablesOptions[0]} onChange={(e) => dispatch(changeTable(e.id))} />
                            <button className="btn btn-danger ms-3">Delete Table</button>
                        </div>
                        <button type="submit" value="generateFile" className="btn btn-success mt-3 mb-4">Generate File</button>
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
                                            <input className="mb-2" placeholder="Name of the column" onChange={(e) => setNewCol(e.target.value)} ></input>
                                            <Select className=" mb-2" options={options} defaultValue={options[0]} />
                                        </form>
                                        <input className="ms-2" style={{width: '30px'}} type="image" src="plus-square.svg" alt="add column" onClick={(e) => dispatch(addColumn(newCol, currentId))}></input>
                                      
                                    </>
                                : ""    
                            }
                            <button type="submit" className="ms-3 btn btn-secondary h-100">Insert row</button>
    
                        </div>

                        <div className="col-12 p-0 justify-content-start align-items-center mt-3 ps-2" id="rowsDiv">
                            <div className="row w-100">
                                {columns.map(col => {
                                    return(
                                        <div key={col.name + "_header"} className="col card text-center">
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
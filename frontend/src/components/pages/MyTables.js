import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../Navbar";
import Select, {OnChangeValue} from 'react-select'
import CreatableSelect, {useCreatable} from 'react-select/creatable';
import Table from "../Table";

const options = [
    { value: 'manualtype', label: 'Manual type'},
    { value: 'date', label: 'Date'},
    { value: 'time', label: 'Time'},
    { value: 'autodate', label: 'Automatic Date'},
    { value: 'autotime', label: 'Automatic Time'},
    { value: 'Item', label: 'Item'},
  ]

export default function MyTables(props) {
    
    const [column, setColumn] = useState("")

    function getMyTablesOptions() {
        let myTablesOptions = []

        props.tablesOptions.forEach((table) =>{
            let name = table.name
            myTablesOptions.push({ value: name, label: name})
        })

        return myTablesOptions
    }

    function handleNewColumnChange(e) {
        e.preventDefault()
        let columnName = e.target.value
        setColumn(columnName)
    }

    
    return(
        <>
            <div className="vh-100">
                
            <Navbar />
            <div className="container-fluid">
                <h1 className="display-4 py-3 text-center">My Tables</h1>

                <div className="nav justify-content-center">
                    <form className="text-center">
                        <div>
                            <CreatableSelect options={getMyTablesOptions()} onChange={(e) => props.getTable(e)} onCreateOption={(e) => props.createTable(e)}/>
                        </div>
                        <button type="submit" value="generateFile" onClick={props.handleGenerate} className="btn btn-success mt-3 mb-4">Generate File</button>
                    </form>
                </div>
                
            
            <div className="container-fluid d-flex flex-row col-12 p-0 justify-content-start align-items-center">
                            {props.columns.map((col, i) => {
                        
                                return(
                                    <form key={col.id} className="p-0 m-0 me-3">
                                        <input className="text-center mb-2" defaultValue={col.name} onChange={(e) => props.handleColumnChange(e, i)}></input>
                                        <Select className=" mb-2" options={options} defaultValue={options[0]} />
                                        <input className="" id={`value${col.id}`}></input>
                                    </form>          
                                )
                            })}
                            
                            {props.columns.length < 7 ?
                                    <>
                                        <form className="p-0 m-0">
                                            <input className="mb-2" placeholder="Name of the column" onChange={(e) => handleNewColumnChange(e)}></input>
                                            <Select className=" mb-2" options={options} defaultValue={options[0]} />
                                        </form>
                                        <input className="ms-2" style={{width: '30px'}} type="image" src="plus-square.svg" alt="add column" onClick={() => {
                                            props.addColumn(column, props.currentId);
                                            }}></input>
                                    </>
                                : ""    
                            }
                            <button type="submit" onClick={props.insertRow} className="ms-3 btn btn-secondary h-100">Insert row</button>
    
                        </div>
                        
                        <div className="col-12 p-0 justify-content-start align-items-center mt-3 ps-2" id="rowsDiv">
                            <div className="row w-100">
                                {props.columns.map(col => {
                                    return(
                                        <div key={col.id + "_header"} className="col card text-center">
                                            {col.name}
                                        </div>
                                    )
                                })}
                            </div>    
                            {props.rows.map(row => {
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
        </>
    )
                }

import React from 'react'
import Navbar from "./Navbar";
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

const options = [
    { value: 'manualtype', label: 'Manual type'},
    { value: 'date', label: 'Date'},
    { value: 'time', label: 'Time'},
    { value: 'currency', label: 'Currency'},
    { value: 'autodate', label: 'Automatic Date'},
    { value: 'autotime', label: 'Automatic Time'},
    { value: 'Item', label: 'Item'},
  ]

const tablesOptions = [
    { value: 'Sales May', label: 'Sales May'},
  ]
  
const demonstrationColumns = ['Product', 'Price', 'Profit', 'Sales', ]

function DemonstrationContent() {
  return (
    <div className="vh-100">
            <Navbar />
            <div className="container-fluid">
                <h1 className="display-4 py-3 text-center">Tables</h1>

                <div className="nav justify-content-center">
                    <form className="text-center">
                        <div className="d-flex ">
                            <CreatableSelect options={tablesOptions} defaultValue={tablesOptions[0]} />
                            <button className="btn btn-danger ms-3">Delete Table</button>
                        </div>
                        <button type="submit" value="generateFile" className="btn btn-success mt-3 mb-4">Generate File</button>
                    </form>
                </div>
                
            
                <div className="container-fluid d-flex flex-row col-12 p-0 justify-content-start align-items-center">
                    {demonstrationColumns.map((col, i) => {
                      return(
                        <form key={i} className="p-0 m-0 me-3">
                                <input className="text-center mb-2" defaultValue={col} ></input>
                                <Select className=" mb-2" options={options} defaultValue={options[0]} />
                                <input className="" id={`value-${col}`}></input>
                            </form>          
                        )
                      })}
                    
                    {demonstrationColumns.length < 7 ?
                            <>
                                <form className="p-0 m-0">
                                    <input className="mb-2" placeholder="Name of the column"></input>
                                    <Select className=" mb-2" options={options} defaultValue={options[0]} />
                                </form>
                                <input className="ms-2" style={{width: '30px'}} type="image" src="plus-square.svg" alt="add column" ></input>
                            </>
                        : ""    
                      }
                    <button type="submit" className="ms-3 btn btn-secondary h-100">Insert row</button>

                </div>
                
                <div className="col-12 p-0 justify-content-start align-items-center mt-3 ps-2" id="rowsDiv">
                    <div className="row w-100">
                        {demonstrationColumns.map((col, i) => {
                            return(
                                <div key={i + "_header"} className="col card text-center">
                                    {col}
                                </div>
                            )
                        })}
                    </div>    
                    
                </div>

            </div>
            </div>
  )
}

export default DemonstrationContent
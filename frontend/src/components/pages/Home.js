import React from "react";
import Navbar from "../Navbar";
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

const options = [
    { value: 'manualtype', label: 'Manual type'},
    { value: 'date', label: 'Date'},
    { value: 'time', label: 'Time'},
    { value: 'autodate', label: 'Automatic Date'},
    { value: 'autotime', label: 'Automatic Time'},
    { value: 'Item', label: 'Item'},
  ]

const tablesOptions = [
    { value: 'Alunos', label: 'Alunos'},
    { value: 'Orçamento 2022', label: 'Orçamento 2022'}
]

export default function Home(props) {
    



    return (
        <>
            <div className="w-100">
                
            <Navbar />
            <div className="container-fluid">
                <h1 className="display-4 py-3 text-center">Tables</h1>

                <div className="nav justify-content-center">
                    <form className="text-center">
                        <div>
                            <CreatableSelect options={tablesOptions} />
                        </div>
                        <button type="submit" value="generateFile" onClick={props.handleGenerate} className="btn btn-success mt-3">Generate File</button>
                    </form>
                </div>
                
                
                <h2 className="display-4 pt-4 pb-3 text-center">Columns</h2>
                <div className="d-flex flex-row col-12 p-0 justify-content-start align-items-center">
                    {props.columns.map(column => {
                        return(
                            <form key={column.id} className="p-0 m-0 me-3">
                                <h2>{column.name}</h2>
                                <Select className=" mb-2" options={options} defaultValue={options[0]} />
                                <input className="" id={`value${column.id}`}></input>
                            </form>          
                        )
                    })}
                    
                    {props.columns.length < 7 ?
                            <>
                                <form className="p-0 m-0">
                                    <input className="mb-2" placeholder="Name of the column"></input>
                                    <Select className=" mb-2" options={options} defaultValue={options[0]} />
                                </form>
                                <input style={{width: '30px'}} type="image" src="plus-square.svg" alt="add column" onClick={props.addColumn}></input>
                            </>
                        : ""    
                    }
                    <button type="submit" onClick={props.insertRow} className="ms-3 btn btn-secondary h-100">Insert row</button>                           
                </div>
                <div className="d-flex flex-column" id="rowsDiv">
                    
                </div>

            </div>
            </div>
        </>
    )
}



{/* <input type="image" className="ps-3 h-100" src="plus-square.svg" alt="add table" onClick={props.createTable}></input> */}
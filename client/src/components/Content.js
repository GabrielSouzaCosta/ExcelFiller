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

const tablesOptions = []

function Content() {
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
                
        

            </div>
            </div>
  )
}

export default Content
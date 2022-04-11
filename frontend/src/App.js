import './App.scss';
import { useEffect, useState } from 'react';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import MyTables from './components/pages/MyTables';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {AuthProvider} from './GlobalStates';


function App() {

  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [tablesOptions, setTablesOptions] = useState([])
  const [currentTable, setCurrentTable] = useState("")
  const [currentId, setCurrentId] = useState()

  function createTable(name) {
    fetch(`create_table`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(name)
    })
    .then(res => {
      res.json();
      console.log(res)
    })
    .catch(error => console.log(error))
  }

    function addColumn(column, id) {
      fetch(`tables/${id}/add_column`, {
        'method': 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"name": column, "id": id})
      }).then(res => res.json()).catch(error => console.log(error))
  }

  function insertRow(e) {
    e.preventDefault()
    const cells = []
    columns.forEach((column) => {
      let cell = document.getElementById(`value${column.id}`).value
      cells.push(cell)
    })
    setRows([...rows, cells])
    console.log(rows)
  }

  useEffect(() => {
      async function getTables() {
        return await fetch('tables', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
      }

      (async () => {
        const results = await getTables()
        setTablesOptions(results)
        console.log(tablesOptions)
      })()
      getColumns()

      })


  async function handleGenerateSubmit(event) {
    let content = {'cells': rows, 'headers': columns}
    event.preventDefault()
    await fetch('/generate_file', {
      'method': 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content)
  }).then(res => res.json()).catch(err => console.log(err))
  }

  function getColumns() {
    tablesOptions.forEach((table) => {
        if (table.name === currentTable) {
            setColumns(table.columns)
            setCurrentId(table.id)
            console.log(columns)
        }
    })
}

  async function getTable(table) {
    setCurrentTable(table.value)
    getColumns()
  }

  function handleColumnChange(e, i) {
    e.preventDefault()
    let clone = [...columns]
    let item1 = {...clone[i]}
    item1.name = e.target.value
    clone[i] = item1
    setColumns(clone)
  }



  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
          <Route path='/' element={<Home handleGenerate={handleGenerateSubmit} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/my_tables' element={<MyTables tablesOptions={tablesOptions} createTable={createTable} columns={columns} insertRow={insertRow} rows={rows} addColumn={addColumn} handleGenerate={handleGenerateSubmit} getTable={getTable} currentId={currentId} />} />  
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

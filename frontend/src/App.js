import './App.scss';
import { useEffect, useState } from 'react';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {AuthProvider} from './GlobalStates';


function App() {

  const [rows, setRows] = useState([])
  const [table, setTable] = useState([])
  const [columns, setColumns] = useState([])

  function createTable() {
    fetch(`/create_table`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(table)
    })
    .then(res => res.json())
    .catch(error => console.log(error))
  }

  function handleColumnChange(e, id) {
    e.preventDefault()
    let clone = [...columns]
    let item1 = {...clone[id-1]}
    item1.name = e.target.value
    clone[id-1] = item1
    setColumns(clone)
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
    fetch(`tables/1`, {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => setColumns(res.columns))  
    .catch(error => console.log(error))
  }, [])

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
  })
  }


  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
          <Route path='/' element={<Home columns={columns} insertRow={insertRow} rows={rows} handleGenerate={handleGenerateSubmit} handleColumnChange={handleColumnChange} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

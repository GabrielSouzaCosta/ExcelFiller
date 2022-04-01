import './App.scss';
import { useEffect, useState } from 'react';
import Home from './components/pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const [rows, setRows] = useState([])
  
  const [table, setTable] = useState([])
  const [columns, setColumns] = useState([])

  function createTable() {
    fetch(`/create_table/`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  function insertRow(e) {
    e.preventDefault()
    const cells = []
    let rowsDiv = document.getElementById('rowsDiv')
    let li = document.createElement('li');

    columns.forEach((column) => {
      let cell = document.getElementById(`value${column.id}`).value
      cells.push(cell)
    })
    setRows([...rows, cells])
    li.textContent = cells;
  
    rowsDiv.appendChild(li)
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
      <Routes>
        <Route path='/' element={<Home columns={columns} insertRow={insertRow} rows={rows} handleGenerate={handleGenerateSubmit} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

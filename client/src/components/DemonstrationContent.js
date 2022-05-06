import React from 'react'

function DemonstrationContent() {
  return (
    <div style={{backgroundColor: "#cbd4c2"}} className='container-fluid vh-100'>

        <header>
            <h1 className='text-center display-4 py-5'>Login or register an account and start creating your spreadsheets faster</h1>
        </header>


        <div className='d-flex justify-content-center'>
          <div style={{maxWidth: "70%"}} className='card shadow-lg'>
          <div style={{color: "#BC7C9C"}} className="card-header text-center fs-1  fw-bolder">Demonstration Video</div>
            <video loop muted src='sample.webm' id='video' onClick={ (e) => {document.getElementById("video").play()} } poster="poster.png" type="video/webm" ></video>
          </div>
        </div>
        <div className='container-fluid'>
          <ol>
            <li>Login or register</li>
            <li>Create a table</li>
            <li>Create your headers</li>
            <li>Select what data type fits you best</li>
            <li>Start filling in your rows</li>
            <li>Download your <strong>Ultra-Fast Spreadsheet</strong> generated</li>
          </ol>
        </div>
          


    </div>
  )
}

export default DemonstrationContent
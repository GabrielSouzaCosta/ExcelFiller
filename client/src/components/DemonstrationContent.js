import React from 'react'

function DemonstrationContent() {
  return (
    <div style={{backgroundColor: "#cbd4c2"}} className='container-fluid vh-100'>

        <header>
            <h1 className='text-center display-4 py-5'>Login or register an account and start creating your spreadsheets faster</h1>
        </header>


        <section className='d-flex justify-content-center align-items-center'>
          <ol className='list-group list-group-flush me-5 list-group-numbered shadow-lg'>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder border-bottom'>Login or register</li>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder border-bottom'>Create a table</li>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder border-bottom'>Create your headers</li>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder border-bottom'>Select what data type fits you best</li>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder border-bottom'>Start filling in your rows</li>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder'>Download your <strong>Ultra-Fast Spreadsheet</strong> generated</li>
          </ol>

          

          <div style={{maxWidth: "50%"}} className='card shadow-lg'>
            <div style={{color: "#BC7C9C"}} className="card-header text-center fs-1  fw-bolder">Demonstration Video</div>
              <video loop muted src='sample.webm' id='video' onClick={ (e) => {document.getElementById("video").play()} } poster="poster.png" type="video/webm" ></video>
          </div>

        </section>


          


    </div>
  )
}

export default DemonstrationContent
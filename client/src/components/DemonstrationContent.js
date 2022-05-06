import React from 'react'

function DemonstrationContent() {
  return (
    <>
      
    <div style={{backgroundColor: "#cbd4c2"}} className='container-fluid vh-100 d-flex flex-column justify-content-center align-items-center'>

          
            <h1 className='text-center display-4 py-4'>Login or register an account and start creating your spreadsheets faster</h1>


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

        <div className="container-fluid py-0 position-absolute bottom-0 w-100 py-2">
              <div className="d-flex">
                  <p className="h3 m-0 text-success me-2">Contact: <a className="btn btn-success text-decoration-none text-white" rel="noreferrer" href="mailto:gabriSco72@gmail.com" target="_blank">gabriSco72@gmail.com</a></p>
                  <a className='btn btn-primary link-light text-decoration-none ' href="https://www.linkedin.com/in/gabriel-souza-costa-8443481bb/">Linkedin</a>
              </div>

          </div>
    </div>



    
    </>
  )
}

export default DemonstrationContent
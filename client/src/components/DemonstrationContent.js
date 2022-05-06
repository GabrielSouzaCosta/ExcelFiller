import React from 'react'
import DemonstrationNavbar from './DemonstrationNavbar'

function DemonstrationContent() {
  return (
    <>
    <DemonstrationNavbar />
    <div style={{backgroundColor: "#cbd4c2"}} className='container-fluid vh-100 d-flex flex-md-column justify-content-center align-items-center'>

          
            <div className='d-block'>
              <h1 className='text-center display-4 py-4'>Login or register an account and start creating your spreadsheets faster</h1>
              <p className='d-sm-flex d-md-none text-center lead'>Open this site on a desktop, as it's only usable on it</p>
            </div>



        <section className='d-none d-md-flex justify-content-center align-items-center'>
          <ol className='list-group list-group-flush me-5 list-group-numbered shadow-lg'>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder border-bottom'>Login or register</li>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder border-bottom'>Create a table</li>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder border-bottom'>Create your headers</li>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder border-bottom'>Select what data type fits you best</li>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder border-bottom'>Start filling in your rows</li>
            <li style={{backgroundColor: "#721817ee"}} className='list-group-item text-uppercase text-white fw-bolder'>Download your <strong>Ultra-Fast Spreadsheet</strong> generated</li>
          </ol>

          <div style={{maxWidth: "50%"}} className='card shadow-lg'>
            <div style={{color: "#BC7C9C"}} className="card-header text-center fs-1 fw-bolder">Demonstration Video</div>
              <video className='' loop muted src='sample.webm' id='video' onClick={ (e) => {document.getElementById("video").play()} } poster="poster.png" type="video/webm" ></video>
          </div>

        </section>

        <div className="container-fluid position-absolute bottom-0 w-100 py-2">
              <div className="d-flex justify align-items-center">
                  <p className="h3 m-0 me-2 text-success fs-5">Contact: </p> 
                  <a className="btn btn-success text-decoration-none text-white me-2" rel="noreferrer" href="mailto:gabriSco72@gmail.com" target="_blank">Email</a>
                  <a className='d-inline btn btn-primary link-light text-decoration-none' href="https://www.linkedin.com/in/gabriel-souza-costa-8443481bb/">Linkedin</a>
              </div>

          </div>
    </div>



    
    </>
  )
}

export default DemonstrationContent
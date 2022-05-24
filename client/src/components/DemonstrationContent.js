import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Accordion from './Accordion'

function DemonstrationContent() {
  return (
    <>
    <Navbar />
    <div style={{backgroundColor: "#cbd4c2"}} className='h-100'>
    <div className='container-fluid d-flex flex-column justify-content-center align-items-center'>

        <div className='d-block'>
          <Link to='/login' className='text-center fs-1 py-3 btn btn-warning fw-bold my-3'>Start creating your spreadsheets faster</Link>
        </div>
    
        <section className='d-md-flex container-fluid justify-content-center align-items-center'>
          <div className='d-flex flex-column align-items-center me-4'>
            <h2 className='pb-3'>Save texts you use most and insert them much faster</h2> 
            <img src='creator.gif' width={"300px"} alt="item saver" className="mb-2"/>
            <h3 className='my-3'>Fill repetitive data much faster</h3>

            <div className='d-flex w-75'>
              <div className="card mt-2 mb-4 w-100">
                <div className='card-header'>
                  <h5 className="card-title text-center text-uppercase">Data Types</h5>
                </div>
                <div className="card-body">
                  <Accordion />
                </div>
              </div>
            </div>

          </div>
        </section>
        <p className='d-sm-flex d-md-none text-center lead'>Open this site on a desktop, as it's only usable on it</p>

        <div className='container card shadow-lg mb-4 p-0 max-vw-100'>
          <video className='embed-responsive' loop muted src='sample.webm' id='video' controls onClick={ (e) => {document.getElementById("video").play()} } poster="poster.png" type="video/webm" ></video>
        </div>
    </div>

    </div>
    <div className="w-100 pb-2 ps-2 m-0">
      <div className="d-flex align-items-center">
        <p className="h3 m-0 me-2 text-success fs-5">Contact: </p> 
        <a className="btn btn-success text-decoration-none text-white me-2" rel="noreferrer" href="mailto:gabriSco72@gmail.com" target="_blank">Email</a>
        <a className='d-inline btn btn-primary link-light text-decoration-none' target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/gabriel-souza-costa-8443481bb/">Linkedin</a>
      </div>
    </div>
    </>
  )
}

export default DemonstrationContent
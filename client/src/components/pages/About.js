import React from 'react';
import Navbar from '../Navbar';

function About() {
  return (
    <div className='vh-100'>
    <Navbar />
      <div className='container-fluid'>
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
        <h1>About this website</h1>
        <p>This app is intended to use as an excel creator tool by speeding up the creation of repetitive data</p>
        <a className="btn btn-success text-decoration-none text-white me-2 mb-2" rel="noreferrer" href="mailto:gabriSco72@gmail.com" target="_blank">Email</a>
        <a className='d-inline btn btn-primary link-light text-decoration-none' target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/gabriel-souza-costa-8443481bb/">Linkedin</a>
        </div>
      </div>
    </div>
  )
}

export default About
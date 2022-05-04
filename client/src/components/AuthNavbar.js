import React from 'react';

export default function AuthNavbar() {
  return (
    <>
                <nav style={{backgroundColor: "#172F2F"}} className="navbar navbar-expand-lg navbar-dark sticky-top w-100 justify-content-center position-absolute">
                    <div className="container-fluid">
                        <a tabIndex={-1} className="navbar-brand display-2 fs-1 m-auto py-2" href="/">ExcelFiller</a>
                    </div>
                </nav>
    </>
  )
}
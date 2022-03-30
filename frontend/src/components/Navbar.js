import React from "react"

export default function Navbar () {
    return (<>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top w-100 justify-content-center">
                <div className="container-fluid">
                    <a className="navbar-brand display-2 fs-2" href="/">ExcelFiller</a>
                    <ul className="nav navbar justify-content-center" >
                        <li className="nav-item"><a className="nav-link fs-5" href="http://localhost:3000/login">Login</a></li>
                    </ul>
                </div>
            </nav>
    </>

    )
}
import React, { useContext } from "react"
import { AuthContext } from "../GlobalStates";


export default function Navbar (props) {
    const [token, setToken] = useContext(AuthContext);
    
    function logout(e) {
        e.preventDefault()
        sessionStorage.removeItem("token")
        setToken("")
    }

    return (<>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top w-100 justify-content-center">
                    <div className="container-fluid">
                        <a className="navbar-brand display-2 fs-2" href="/">ExcelFiller</a>
                        <ul className="nav navbar justify-content-center" >
                            {(token && token !== "" && token !== undefined) ?
                                <>
                                    <li className="nav-item"><a className="nav-link fs-5" href="/my_tables">My Tables</a></li>
                                    <li className="nav-item"><a onClick={(e) => logout(e)} className="nav-link fs-5" >Log out</a></li>
                                </>
                                :
                                <li className="nav-item"><a className="nav-link fs-5" id="loginLink" href="http://localhost:3000/login">Login</a></li>
                            }
                        </ul>
                    </div>
                </nav>
    </>

    )
}
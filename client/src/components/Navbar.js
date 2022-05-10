import React from 'react';
import { logoutAction } from '../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'


function Navbar() {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch()

  function logout(e) {
    e.preventDefault()
    sessionStorage.removeItem("token")
    dispatch(logoutAction())
}

  return (
    <>
                <nav style={{backgroundColor: "#172F2A"}} className="navbar navbar-expand-lg navbar-dark sticky-top w-100 justify-content-center">
                    <div className="container-fluid">
                        <a tabIndex={-1} className="navbar-brand display-2 fs-2" href="/">ExcelFiller</a>
                        <ul className="nav navbar justify-content-center" >
                            <NavLink to="/about" className={"nav-link display-5 fs-3 link-light"}>About</NavLink>
                            {(token && token !== "" && token !== undefined) ?
                                <>
                                    <li className="nav-item"><a className="nav-link display-5 fs-3 link-light" tabIndex={-1} href="/" onClick={(e) => logout(e)} >Log out</a></li>
                                </>
                                : 
                                <>
                                  <NavLink to="/login" className={"nav-link display-5 fs-3 link-light"}>Login</NavLink>
                                </>
                            }
                        </ul>
                      
                    </div>
                </nav>
    </>
  )
}


export default Navbar
import React from 'react';
import { logoutAction } from '../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';


function Navbar() {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch()

  function logout(e) {
    e.preventDefault()
    sessionStorage.removeItem("token")
    console.log(token)
    dispatch(logoutAction())
}

  return (
    <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top w-100 justify-content-center">
                    <div className="container-fluid">
                        <a tabIndex={-1} className="navbar-brand display-2 fs-2" href="/">ExcelFiller</a>
                        <ul className="nav navbar justify-content-center" >
                            {(token && token !== "" && token !== undefined) ?
                                <>
                                    <li className="nav-item"><a tabIndex={-1} href="/" onClick={(e) => logout(e)} className="nav-link fs-5" >Log out</a></li>
                                </>
                                :
                                <li tabIndex={-1} className="nav-item"><a tabIndex={-1} className="nav-link fs-5" id="loginLink" href="/login">Login</a></li>
                            }
                        </ul>
                    </div>
                </nav>
    </>
  )
}


export default Navbar
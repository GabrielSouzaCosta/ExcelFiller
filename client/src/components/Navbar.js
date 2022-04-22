import React from 'react';
import { logoutAction } from '../redux/actions/logoutAction';
import { useDispatch, useSelector } from 'react-redux';


function Navbar() {
  const token = useSelector((state) => state.loginReducer.token);
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
                        <a className="navbar-brand display-2 fs-2" href="/">ExcelFiller</a>
                        <ul className="nav navbar justify-content-center" >
                            {(token && token !== "" && token !== undefined) ?
                                <>
                                    <li  className="nav-item"><a href="/" onClick={(e) => logout(e)} className="nav-link fs-5" >Log out</a></li>
                                </>
                                :
                                <li className="nav-item"><a className="nav-link fs-5" id="loginLink" href="/login">Login</a></li>
                            }
                        </ul>
                    </div>
                </nav>
    </>
  )
}

{/* <li className="nav-item"><a className="nav-link fs-5" href="/">My Tables</a></li> */}

export default Navbar
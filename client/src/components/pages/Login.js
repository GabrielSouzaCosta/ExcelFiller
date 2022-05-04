import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { loginSuccess } from '../../redux/actions/auth';
import AuthNavbar from '../AuthNavbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
  const user = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [msg, setMsg] = useState("");

  async function handleLogin() {
    if (emailValidation() === false) {
      setMsg("Please, provide a valid email.")
      return
    }
    else if (password === "") {
      setMsg("Please create a password.")
      return
    }
    await axios.post('/login', {"email": email, "password": password})
    .then(res => {if (res.status === 200) {
      console.log(res.data.access_token)
      sessionStorage.setItem("token", res.data.access_token)
      dispatch(loginSuccess(sessionStorage.getItem("token")))
      navigate('/')
    }})
    .catch(err => {
      if (err.response.status === 401) {
        let msgErr = err.response.data.msg
        setMsg(msgErr)
        throw new Error(msgErr)
    } else {
      console.log(err)
    }
  })

     
  }

  function emailValidation() {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email.match(regex)){
        setMsg("Please provide a valid email");
        console.log(msg)
        return false;
    }
    return true;
  }


  return (
    <>
    <AuthNavbar />
    <div style={{backgroundColor: "#E89291"}} className="container-fluid vh-100 w-100">
        <div className='d-flex flex-row justify-content-center align-items-center h-100'>
            <div className="card shadow-lg d-flex flex-column w-25 justify-content-center align-items-center py-5 px-1">

                <h1 className="py-4 display-5">LOGIN</h1>
                <label htmlFor="email">Email:</label>
                <input className="form-control form-control-sm w-50 my-2" type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="pwd" >Password:</label>
                <input className="form-control form-control-sm w-50 my-2" type="password" id="pwd" required value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                <button className="my-2 btn btn-danger" type="submit" onClick={handleLogin}>Login</button>
                
                <p className="mt-2">Does not have an account yet? <Link to="/register">Register now!</Link></p>
                <div id="passwordHelpBlock" className="form-text mb-3 pb-3">
                    {msg}
                </div>

            </div>
        </div>
      </div>

    </>
  )
}


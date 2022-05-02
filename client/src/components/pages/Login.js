import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { loginSuccess } from '../../redux/actions/auth';
import Navbar from '../Navbar';
import axios from 'axios';

function Login() {
  const user = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [msg, setMsg] = useState("");

  async function handleLogin() {
    let response = await axios.post('/login', {"email": email, "password": password}).catch(error => console.log(error))
    if (response.status === 200) {
      sessionStorage.setItem("token", response.data.access_token)
      dispatch(loginSuccess(sessionStorage.getItem("token")))
      navigate('/')
    } 
    let errorMsg = response.data.msg
    if (errorMsg) {
        setMsg(errorMsg)
        console.log(errorMsg)
        throw new Error(errorMsg)
    }
  }

  return (
    <>
    <Navbar />
    <div className="container-sm vh-100 vw-25">
            <div className="card d-flex flex-column w-100 h-75 justify-content-center align-items-center mt-4">
                <h1 className="py-4">Login</h1>
                <label htmlFor="email">Email:</label>
                <input className="my-2" type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="pwd" >Password:</label>
                <input className="my-2" type="password" id="pwd" required value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                <button className="my-2 btn btn-danger" type="submit" onClick={handleLogin}>Login</button>
                
                <p className="mt-2">Does not have an account yet? <a href="/register">Register now!</a></p>
                <div id="passwordHelpBlock" className="form-text mb-3   ">
                    {msg}
                </div>
            </div>
            
        </div>

    </>
  )
}

export default Login
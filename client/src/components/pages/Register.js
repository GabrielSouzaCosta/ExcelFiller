import React, { useState } from 'react'
import Navbar from '../Navbar'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { registerSuccess } from '../../redux/actions/auth'

function Register() {
  const user = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [msg, setMsg] = useState("");

  function handleRegister(){
    fetch('/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({"email": email, "password": password})
    })
    .then(res => {
        if (res.status === 200) {
            navigate('/');
        }
        return res.json();
    }).then(data => {
        if (data.msg) {
            setMsg(data.msg)
            console.log(data.msg)
            throw new Error(data.msg)
        }
        sessionStorage.setItem("token", data.access_token)
        dispatch(registerSuccess(sessionStorage.getItem("token")))
    })
    .catch(error => console.log(error))
}


  return (
    <>
    <Navbar />
    <div className="container-sm vh-100 vw-25">
        <div className="card d-flex flex-column w-100 h-75 justify-content-center align-items-center mt-4">
            <h1 className="py-4">Register</h1>
            <label htmlFor="email">Email:</label>
            <input className="my-2" type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <label htmlFor="pwd" >Password:</label>
            <input className="my-2" type="password" id="pwd" required value={password} onChange={(e) => setPassword(e.target.value)} ></input>
            <button className="my-2 btn btn-danger" type="submit" onClick={handleRegister}>Login</button>
            <div id="passwordHelpBlock" className="form-text mb-3   ">
                    {msg}
            </div>
        </div>
    </div>

    </>
  )
}

export default Register
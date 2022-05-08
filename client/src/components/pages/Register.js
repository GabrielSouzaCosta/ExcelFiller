import React, { useState } from 'react'
import AuthNavbar from '../AuthNavbar'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { registerSuccess } from '../../redux/actions/auth';
import { resetRows } from '../../redux/actions/tables';
import axios from 'axios';

function Register() {
  const user = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [msg, setMsg] = useState("");

  async function handleRegister(){
    if (emailValidation() === false) {
      setMsg("Please, provide a valid email.")
      return
    }
    else if (password === "") {
      setMsg("Please create a password.")
      return
    }
    await axios.post('https://lit-bastion-94694.herokuapp.com/register', {"email": email, "password": password})
    .then(res => {if (res.status === 200) {
      sessionStorage.setItem("token", res.data.access_token)
      dispatch(registerSuccess(sessionStorage.getItem("token")))
      navigate('/')
      dispatch(resetRows())
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
        return false;
    }
    return true;
  }


  return (
    <>
    <div style={{backgroundColor: "#E89291"}} className='d-flex flex-column vh-100'>
      <AuthNavbar />
      <div className='d-flex mw-100 align-items-center justify-content-center h-100'>
          <div className="card shadow-lg d-flex flex-column mw-100 justify-content-center align-items-center py-5 px-5">
              
              <h1 className="pt-4 pb-4 display-5">REGISTER</h1>
              <form className='form' onSubmit={(e) => e.preventDefault()}>
                <div className='d-flex flex-column justify-content-center text-center w-100 px-1'>
                  <label htmlFor="email">Email:</label>
                  <input className="form-control form-control-sm my-2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                  <label htmlFor="pwd" >Password:</label>
                  <input className="form-control form-control-sm my-2" type="password" id="pwd" required value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                  <button className="my-2 btn btn-danger" type="submit" onClick={handleRegister}>Create account</button>
                </div>
              </form>
              
              <p className="mt-2">Already have an account? <Link to="/login">Login now!</Link></p>
              <div id="passwordHelpBlock" className="form-text mb-3 ">
                      {msg}
              </div>

                

        </div>
      </div>
    </div>

    </>
  )
}

export default Register;

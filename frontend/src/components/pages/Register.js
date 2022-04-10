import React, { useState, useContext } from "react";
import { AuthContext } from "../../GlobalStates";
import { useNavigate } from "react-router";
import Navbar from "../Navbar";

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [token, setToken] = useContext(AuthContext);
    const [msg, setMsg] = useState("");

    function handleRegister(){
        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"email": email, "password": password})
        }

        fetch('/register', opts)
        .then(res => {
            if (res.status === 200) {
                navigate('/my_tables');
            }
            return res.json();
        }).then(data => {
            if (data.msg) {
                setMsg(data.msg)
                console.log(data.msg)
                throw new Error(data.msg)
            }
            sessionStorage.setItem("token", data.access_token)
            setToken(sessionStorage.getItem("token"))
        })
        .catch(error => console.log(error))
    }
    
    return(
        <>
        <Navbar />
        <div className="container">
            
            <div className="card d-flex flex-column w-100 h-75 justify-content-center align-items-center mt-4">
                <h1 className="py-4">Register</h1>
                <label htmlFor="email">Email:</label>
                <input className="my-2" type="email" id="email" onChange={(e) => setEmail(e.target.value)} required></input>
                <label htmlFor="pwd" >Password:</label>
                <input className="my-2" type="password" id="pwd" onChange={(e) => setPassword(e.target.value)} required></input>
                <div id="passwordHelpBlock" className="form-text mb-3   ">
                    {msg}
                </div>
                <button className="my-3 btn btn-danger" type="submit" onClick={handleRegister}>Register</button>
                
            </div>
        </div>
        </>
    )
}
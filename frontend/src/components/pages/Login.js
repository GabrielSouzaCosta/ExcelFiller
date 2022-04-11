import React, { useState, useContext } from "react";
import { AuthContext } from "../../GlobalStates";
import { useNavigate } from "react-router";
import Navbar from "../Navbar";

export default function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [token, setToken] = useContext(AuthContext);
    const [msg, setMsg] = useState("");


    function handleLogin() {
        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"email": email, "password": password})
        }

        fetch('/login', opts)
        .then(res => {
            if (res.status === 200) {
                navigate('/my_tables')
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
        <div className="container-sm vh-100 vw-25">
            <div className="card d-flex flex-column w-100 h-75 justify-content-center align-items-center mt-4">
                <h1 className="py-4">Login</h1>
                <label htmlFor="email">Email:</label>
                <input className="my-2" type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="pwd" >Password:</label>
                <input className="my-2" type="password" id="pwd" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button className="my-2 btn btn-danger" type="submit" onClick={handleLogin}>Login</button>
                
                <p className="mt-2">Does not have an account yet? <a href="/register">Register now!</a></p>
            </div>
            
        </div>

        </>
    )
}
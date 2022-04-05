import React from "react";
import Navbar from "../Navbar";

export default function Register() {

    function handleRegister(){
        return ""
    }
    
    return(
        <>
        <Navbar />
        <div className="container">
            
            <div className="card d-flex flex-column w-100 h-75 justify-content-center align-items-center mt-4">
                <h1 className="py-4">Register</h1>
                <label htmlFor="email">Email:</label>
                <input className="my-2" type="email" id="email" required></input>
                <label htmlFor="pwd" >Password:</label>
                <input className="my-2" type="password" id="pwd" required></input>
                <div id="passwordHelpBlock" class="form-text mb-3">
                    Sua senha deve conter no mínimo 8 caracteres
                </div>
                <button className="my-3 btn btn-danger" type="submit" onClick={handleRegister}>Register</button>
                
            </div>
        </div>
        </>
    )
}
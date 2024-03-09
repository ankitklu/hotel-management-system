import React, { useState } from "react";
import "./style.css";
import axios from 'axios';
import Alert from "./Alert";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [admin,setAdmin]= useState(false);
    const [client, setClient]= useState(false);


    function handleSubmit() {
        axios.post('http://localhost:8081/check', {
            un: username,
            pw: password
        }).then((response) => {
            if (response.data !== "fail") {
                alert(`Congrats!! you are signed in..as ${response.data.role}`);
                <Alert/>
                var role= response.data.role;
                if(role==="admin"){
                    setAdmin(true);
                }
                if(role==="client"){
                    setClient(true);
                }
                
            } else {
                setErrorMessage("Invalid username or password");
            }
        }).catch((error) => {
            setErrorMessage("An error occurred. Please try again later.");
            console.error(error);
        });
    }

    const handleClick=()=>{
        <a href='/access'></a>
    }

    return (
        <>
            <div className="page" style={{ display: "flex", justifyContent: "inline" }}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="un"
                        id="idun"
                        aria-describedby="nameHelp"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="pw"
                        id="idpw"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {admin && 
                <a href='/admin' ><button className="access-btn">View Admin Controls</button></a>
            }
            {
                client &&
                <a href='/client'><button className="access-btn">View Hotels</button></a>
            }
        </>
    );
}

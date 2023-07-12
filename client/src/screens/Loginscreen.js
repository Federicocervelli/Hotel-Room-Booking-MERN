import React, {useState} from 'react'
import axios from 'axios'
import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    async function login() {
      const user = {
        email,
        password,
      };
      try {
        setLoading(true);
        const result = (await axios.post("/api/users/login", user)).data;
        setLoading(false);
        localStorage.setItem("currentUser", JSON.stringify(result));
        window.location.href = "/home";
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }

    return (
    <div>
        {loading && (<Loader/>)}
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
            {error && (<Error message='Credenziali invalide'/>)}
                <div className='bs'>
                    <h1>
                        Autenticati
                    </h1>
                    <input type="text" placeholder="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="text" placeholder="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button className="btn mt-3" onClick={login}>Login</button>
                </div>
            </div>    
        </div>
    </div>
  )
}

export default Loginscreen
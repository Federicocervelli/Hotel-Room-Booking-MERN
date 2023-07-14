import React, {useState} from 'react'
import axios from 'axios'
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';
import { Navigate } from 'react-router-dom';


function Registerscreen() {
    const [nome, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    async function register() {
      if (password !== cpassword) {
        alert("Le password non coincidono!");
      } else {
        const user = {
          nome,
          email,
          password,
          cpassword,
        };
        try {
          setLoading(true);
          const result = (await axios.post("/api/users/register", user)).data;
          setLoading(false);
          setSuccess(true);

          setName("");
          setEmail("");
          setPassword("");
          setCpassword("");

          window.location.href = "/login";
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError(true);
        }
      }
    }
    
  return (
    <div>
        {loading && (<Loader/>)}
        {error && (<Error message='Qualcosa è andato storto'/>)}
        
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
            {success && (<Success message='Registrazione avvenuta con successo'/>)}
                <div className='bs'>
                    <h1>
                        Registrati
                    </h1>
                    <input type="text" placeholder="name" className="form-control" value={nome} onChange={(e)=>{setName(e.target.value)}}/>
                    <input type="text" placeholder="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="text" placeholder="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <input type="text" placeholder="confirm password" className="form-control" value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}}/>
                    <button className="btn mt-3" onClick={register}>Registrati</button>
                </div>
            </div>    
        </div>
    </div>
  )
}

export default Registerscreen
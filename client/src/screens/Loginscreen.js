import React, {useState , useEffect} from 'react'

function Loginscreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function login(){
        const user = {
            email,
            password
        }
        console.log(user)
    }

    return (
    <div>
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
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
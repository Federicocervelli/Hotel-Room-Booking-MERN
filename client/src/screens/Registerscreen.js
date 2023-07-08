import React, {useState , useEffect} from 'react'

function Registerscreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    function register(){
        if (password!==cpassword){
            alert('Le password non coincidono!')
            return
        } else {
            const user = {
                name,
                email,
                password
            }
            console.log(user)
        }
    }
  return (
    <div>
        <div className="row justify-content-center mt-5">
            <div className="col-md-5">
                <div className='bs'>
                    <h1>
                        Registrati
                    </h1>
                    <input type="text" placeholder="name" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}}/>
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
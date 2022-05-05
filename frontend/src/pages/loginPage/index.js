import { useState } from "react"
import {Link} from 'react-router-dom'
import loginService from "../../services/login"
import { useUser } from "../../context/userContext"
import { useNavigate } from "react-router-dom"

export default function LoginPage(){
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const {setUser} = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    loginService({username, pass})
      .then(response => response.json())
      .then(data => {
        setUser(data.user.username)
        navigate('/')

      })

    setUsername('')
    setPass('')
  }


  return (
    <>
   
    <section className="bg-white w-11/12 mx-auto flex flex-col mt-32 rounded-xl shadow-md">
      <h2 className="text-center font-bold text-4xl my-8">Login</h2>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col w-4/5 mx-auto px-5 py-10 gap-4 mb-10' >
          <label htmlFor="username" className="text-lg">username</label>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-3 rounded-md shadow-sm border bg-slate-50"/>
        
          <label htmlFor="password" className="mt-4 text-lg">password</label>
          <input type="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} className="p-3 rounded-md shadow-sm border bg-slate-50"/>

          <button className="bg-indigo-400 font-bold p-3 rounded-md text-white text-xl mt-8 hover:bg-indigo-300">Login</button>
          <small>No tenes cuenta?<span className="text-indigo-400"><Link to={'/'}> registrate</Link></span> </small>
        </form>
      </div>
    </section>
    </>
  )
}
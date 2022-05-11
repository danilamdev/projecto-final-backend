import { useState } from "react"
import {Link} from 'react-router-dom'
import registerService from '../../services/register'
import { useUser } from "../../context/userContext"
import { useNavigate } from "react-router-dom"

export default function RegisterPage(){
   const [error, setError] = useState(null)
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [mail, setMail] = useState('')
  const {setUser} = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
     e.preventDefault()
     const newUser = {
        username,
        password: pass,
        nombre,
        apellido,
        mail
     }
     try {
      const res = await registerService(newUser)
      const response = await res.json()
      if(response.status === 'error') throw response
     
      navigate('/register-success')

     } catch (error) {
        console.log('que pasho')
        console.log('error es', error)
        setError(error)
     }

     setUsername('')
     setPass('')
     setNombre('')
     setApellido('')
     setMail('')
  }
  
console.log('error es', error)

  return (
    <>
   
    <section className="bg-white max-w-lg w-11/12 mx-auto flex flex-col mt-32 rounded-xl shadow-md">
      <h2 className="text-center font-bold text-4xl my-8">Signup</h2>
      {error && <p className="shadow shadow-red-300 bg-red-100 w-52 p-2 mx-auto text-red-500 text-center">{error.msg}</p>}
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col w-4/5 mx-auto px-5 py-10 gap-4 mb-10' >
          <label htmlFor="username" className="text-lg">username</label>
          <input type="text" name="username" value={username} required onChange={(e) => setUsername(e.target.value)} className="p-3 rounded-md shadow-sm border bg-slate-50"/>
        
          <label htmlFor="password" className="mt-4 text-lg">password</label>
          <input type="password" name="password" required value={pass} onChange={(e) => setPass(e.target.value)} className="p-3 rounded-md shadow-sm border bg-slate-50"/>

          <label htmlFor="nombre" className="text-lg">nombre</label>
          <input type="text" name="username" value={nombre} onChange={(e) => setNombre(e.target.value)} className="p-3 rounded-md shadow-sm border bg-slate-50"/>

          <label htmlFor="apellido" className="text-lg">apellido</label>
          <input type="text" name="apellido" required value={apellido} onChange={(e) => setApellido(e.target.value)} className="p-3 rounded-md shadow-sm border bg-slate-50"/>

          <label htmlFor="mail" className="text-lg">mail</label>
          <input type="mail" name="mail" required value={mail} onChange={(e) => setMail(e.target.value)} className="p-3 rounded-md shadow-sm border bg-slate-50"/>

          <button className="bg-indigo-400 font-bold p-3 rounded-md text-white text-xl mt-8 hover:bg-indigo-300">Crear cuenta</button>
          <small>Ya tenes una cuenta?<span className="text-indigo-400"><Link to={'/login'}> Inicia Sesion</Link></span> </small>
        </form>
      </div>
    </section>
    </>
  )
}
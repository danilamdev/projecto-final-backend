import { useUser } from "../../context/userContext";
import { Navigate} from 'react-router-dom'

export default function CartPage() {
  const {user} = useUser()

  return (
    <>
      {
      user
        ? <div className="bg-indigo-200 rounded-lg w-max px-5 py-10 shadow shadow-violet-300 text-indigo-700 font-bold text-xl mt-24 mx-auto">
            <h1>Hola {user.username}!</h1>
             <h1>estas autorizado para ver tu cart</h1>
           </div>
        :<Navigate to={'/login'}>no estas autorizado</Navigate>
      
      }
    </>
  )
}

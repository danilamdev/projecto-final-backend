import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Mock from "./pages/mock";
import CartPage from "./pages/cart";
import LoginPage from "./pages/loginPage";
import Header from "./components/header";
import { useUser } from "./context/userContext";

function App() {
  const [loading, setLoading] = useState(true)
  const {setUser} = useUser()

  useEffect(()=>{
    fetch('/api/auth/checkUser')
      .then(res => res.json())
      .then(res => {
        if(res.error){
          setUser(null)
          setLoading(false)
        } else {
          setUser(res.user.username)
          setLoading(false)
        }
      })
  },[setUser])

  if(loading) return <h1 className="text-4xl text-indigo-500 font-bold">LOADING...</h1>

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mock" element={<Mock />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;

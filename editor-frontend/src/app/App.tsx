import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Home from './pages/Home'

function App() {
  const authContext = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={authContext.jwt?<Home/>:<Navigate to="/login"/>}/>
        <Route path='/login' element={authContext.jwt?<Navigate to="/"/>:<><Navigate to="/login"/><Login/></>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

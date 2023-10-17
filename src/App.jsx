// Estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Formulario Inicio de sesion
import LogIn from './Components/Login/Login'
// Formulario Registro
import Register from './Components/Register/Register'
// Conocida como pagina principal
import Home from './Components/Home/Home'
// Validar Ruta
import ProtectRoute from './Components/ProtectRoute/ProtectRoute'
// Ruta de cerrar sesion
import LogOut from './Components/LogOut/LogOut'

const token = localStorage.getItem('token')
console.log(token)
// Libreria React-Route
import { BrowserRouter, Routes , Route } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
     <Routes>
     <Route index element={<LogIn />} />
     <Route path='/register' element={<Register />} />
     <Route path='/home' element={
           <ProtectRoute >
                < Home />
           </ProtectRoute>
     }/>
    <Route path='/logOut' element={
           <ProtectRoute >
                < LogOut />
           </ProtectRoute>
     }/>
     </Routes>
    </BrowserRouter>
  )
}

export default App

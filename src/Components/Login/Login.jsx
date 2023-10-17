import { useState } from 'react'

import { Link , useNavigate } from "react-router-dom";

import './logIn.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function LogIn() {
    const [AlertError , setAlertError] = useState('none');
    const [TextError , setTextError] = useState('');
    const navigate= useNavigate()

    //   Validación del formulario usando JavaScript
    function form (event) {
      event.preventDefault()
          try {


            const newData = Object.fromEntries(new FormData(event.target));

      
            fetch(`${import.meta.env.VITE_URL_BACKEND}/logIn`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newData),
            })
              .then((response) => {
                if (response.status !== 200) {
                  return response.json().then((errorData) => {
                    document.querySelector('#username').value='';
                    document.querySelector('#password').value='';
                    setTextError(errorData.message)
                    setAlertError('block');
                    setTimeout(() => {
                        setAlertError('none');
                      }, 2000);
                  });
                }
                if (response.status === 200) {
                  response.json().then((responseData) => {
                    localStorage.setItem("username", responseData.username);
                    localStorage.setItem("token", responseData.token);
                    return navigate('/home', { replace: true })
                  });
                }
              })
              .catch((error) => {
                // Handle error
                console.error(error);
              });
          } catch (error) {
            console.log(error);
          }
        }

  return (
    <>
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-6 offset-md-3 mb-5">
                <h2 className="text-center my-5">Inicio de Sesión</h2>
                <form onSubmit={form}>
                    <div className="form-group">
                        <label className="text-white" for="username">Nombre de Usuario:</label>
                        <input type="text" className="form-control" id="username" name="username" required />
                    </div>
                    <div className="form-group mt-3">
                        <label className="text-white" for="password">Contraseña:</label>
                        <input type="password" className="form-control"  id="password" name="password" minLength="5" maxLength="15" required />
                    </div>
                    <div className={`alert alert-danger mt-2 p-2 d-${AlertError}`} role="alert">{TextError}</div>
                    <div className="text-center mt-3" >
                        <button type="submit" className="btn btn-light" >Iniciar Sesión</button>
                    </div>
                </form>
                <div className="register-link text-white text-center mt-5">
                    ¿No tienes una cuenta? <Link to={`/register`}>Regístrate aquí</Link>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default LogIn

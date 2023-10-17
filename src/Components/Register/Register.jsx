import { useState } from 'react'
import { Link , useNavigate} from "react-router-dom";


import './register.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function Register() {

    const [AlertError , setAlertError] = useState('none');
    const [TextError , setTextError] = useState('');
    const [show, setShow] = useState(false);
    const navigate= useNavigate()

    function formRegister (event) {
        event.preventDefault()
            try {

              const dataRegister = Object.fromEntries(new FormData(event.target));

              const validate= validatePasswords(dataRegister.password, dataRegister.confirmPassword)

              console.log(validate)

              if(!validate){

                return 
              }
  
                console.log(dataRegister)
              fetch(`${import.meta.env.VITE_URL_BACKEND}/register`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(dataRegister),
              })
                .then((response) => {
                  if (response.status !== 200) {
                    return response.json().then((errorData) => {
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
                    });
                    return navigate('/home', { replace: true })
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


    function validatePasswords(arg1,arg2){

        if(arg1 != arg2){


            document.querySelector('#password').value=''
            document.querySelector('#confirmPassword').value=''
            
            setTextError('Las contraseñas no coinciden')
            setAlertError('block')
            setTimeout(() => {
                setAlertError('none')
            }, 2000);   
            
            return false


        }

            return true
    }

  return (
    <>
<div className="container mt-5">
        <div className="row">
            <div className="col-md-6 offset-md-3 mb-5">
                <h2 className="text-center my-5">Registro de Usuario</h2>
                <form onSubmit={formRegister}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="text-white mt-3" for="nombre">Nombres:</label>
                                <input type="text" className="form-control" id="nombres" name="nombres" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="text-white mt-3" for="apellidoP">Apellido Paterno:</label>
                                <input type="text" className="form-control" id="apellidoP" name="apellidoP" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="text-white mt-3" for="apellidoM">Apellido Materno:</label>
                                <input type="text" className="form-control" id="apellidoM" name="apellidoM" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="text-white mt-3" for="email">Correo Electrónico:</label>
                                <input type="email" className="form-control" id="email" name="email" required />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="text-white mt-3" for="username">Nombre de Usuario:</label>
                        <input type="text" className="form-control" id="username" name="username" maxlength="12" required />
                    </div>
                    <div className="form-group">
                        <label className="text-white mt-3" for="password">Contraseña:</label>
                        <input type="password" className="form-control" minlength="5" maxlength="15" id="password" name="password" required />
                    </div>
                    <div className="form-group">
                        <label className="text-white mt-3" for="confirmPassword">Confirmar Contraseña:</label>
                        <input type="password" className="form-control" minlength="5" maxlength="15" id="confirmPassword" name="confirmPassword"
                            required />
                        <div className="toast w-100 mt-3" role="alert" aria-live="assertive" aria-atomic="true"
                            data-delay="3000">
                            <div className="toast-body text-danger" id="mensaje-error"></div>
                        </div>
                    </div>
                    <div className={`alert alert-danger mt-2 p-2 d-${AlertError}`} role="alert">{TextError}</div>
                    <div className="text-center mt-5">
                        <button type="submit" className="btn btn-primary" >Registrar</button>
                    </div>
                </form>
                <div className="login-link text-white text-center mt-3">
                    ¿Ya tienes una cuenta? <Link to={`/`}>Iniciar Sesión</Link>
                </div>
            </div>
        </div>
    </div>

    </>
  )
}

export default Register

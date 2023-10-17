// import './register.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState , useEffect} from 'react'
// Enlace de enrutamiento 
import { Link } from "react-router-dom";

// Componente Nota/Carta
import Card from '../Card/Card'
// Modals

// Componente Modal Creacion de nota
import ModalCreate from '../Modals/ModalCreate/ModalCreate'
// Componente Modal Edicion de nota
import ModalUpdate from '../Modals/ModalUpdate/ModalUpdate'
// Componente Modal Borrar/Eliminar de nota
import ModalDelete from '../Modals/ModalDelete/ModalDelete'



const token = localStorage.getItem("token");
const userName = localStorage.getItem("username");

console.log(userName)




function Home() {

    const [groupNotes, setGroupNotes] = useState([])
    const [ElementPNote, setElementPNote] = useState([])
    const [ElementH5Note, setElementH5Note] = useState([])
    const [stateUpdate, setStateUpdate] = useState(false)
    const [KeyNote, setKeyNote] = useState('')

        useEffect(()=>{
            
            console.log("linea 38")
            setStateUpdate(true)
        },[])


   async function obtenerDatos(event){
         setElementPNote(await event.target.parentElement.parentElement.querySelector('p').textContent)
         setElementH5Note(await event.target.parentElement.parentElement.querySelector('h5').textContent)
         setKeyNote(await event.target.id)
         
    }

    useEffect(()=>{

        console.log(stateUpdate)
        console.log(!!stateUpdate)
        
         if(stateUpdate===false){
            return

            
         }


         console.log("linea 55")
        fetch(`${import.meta.env.VITE_URL_BACKEND}/notes`, {
            method: "GET",
            headers: { token: `${token}` },
          })
            .then((response) => response.json())
            .then((notasDesdeAPI) => {
              // Llama a la función para mostrar las notas en la interfaz
              setGroupNotes(notasDesdeAPI)
              setStateUpdate(false)
            })
            .catch((error) => {
              console.error("Error al obtener las notas desde la API:", error);
              // Puedes mostrar un mensaje de error al usuario, si es necesario
            });
            
    },[stateUpdate])

    
  return (
    <>
    {/* <!-- Barra de Navegación --> */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark m-0 p-0">
        <div className="d-flex flex-grow-1 p-3 m-0 w-100">
            <Link className="navbar-brand" to={`/home`}>Task!ME</Link>
            <div className="d-flex justify-content-between w-100">
                <ul className="navbar-nav">
                {/* <!-- Botón para Agregar Nota --> */}
                <button className="btn btn-primary btn-lg btn-block" data-bs-toggle="modal"
                    data-bs-target="#modalCreate" data-action="create" >Crear Nota</button>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className="nav-link">{userName}</span>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/logOut`}>Cerrar Sesión</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>


    {/* <!-- Contenido de la Página --> */}
    <div className="container mt-5">
        <div  className="row justify-content-center my-1">        
            {/* <!-- Tarjetas de Notas --> */}
            <div className="row mt-2" id="notaContainer">
                {groupNotes.map((nota)=>{
                    return <Card nota={nota} key={nota._id} prop1={obtenerDatos} />
                })}
                {/* <!-- Las tarjetas de notas se agregarán aquí dinámicamente --> */}
            </div></div>
    </div>


                {/* MODAL'S Insert */}
                <ModalCreate render={setStateUpdate}/>
                <ModalUpdate P={ElementPNote} H5={ElementH5Note} ChangeP={setElementPNote} ChangeH5={setElementH5Note} ID={KeyNote} render={setStateUpdate}/>
                <ModalDelete idNote={KeyNote} H5={ElementH5Note} render={setStateUpdate}/> 
    </>
  )
}

export default Home

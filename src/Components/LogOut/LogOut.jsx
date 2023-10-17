import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function LogOut(){

    console.log('ya va a redireccionar?')
    const navigate= useNavigate()
    
    console.log('ya va a redireccionar?')

    useEffect(()=>{
       navigate('/', { replace: true })
    },[])
    

}



export default LogOut
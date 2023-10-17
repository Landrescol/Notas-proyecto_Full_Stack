import { useNavigate } from "react-router-dom";

//Token de autorizacion de usuario Autenticado
const token = localStorage.getItem("token");

function ProtectElement ({children , redirectTo="/"}){
    const navigate = useNavigate()

    // console.log(token)

    if(token!==null){
        return children
    }
    
    
    return navigate(redirectTo, { replace: true })

}


export default ProtectElement
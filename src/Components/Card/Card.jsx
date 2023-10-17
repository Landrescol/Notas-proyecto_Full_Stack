 
 function Card({nota , prop1}){

    
    return (
        <div className="col-md-3">
        <div className="card mb-4" id="cardNote">
        <div className="card-body overflow-hidden">
            <h5 className="card-title">{nota.titulo}</h5>
            <p className="card-text">{nota.contenido}</p>
        </div>
        <div className="card-footer text-right border-0">
            <button className="btn btn-primary mx-1" data-action="update" data-bs-toggle="modal"
            data-bs-target="#modalUpdate" onClick={prop1} id={nota._id}>Editar</button>
            <button className="btn btn-danger mx-1" data-action="delete" data-bs-toggle="modal" data-bs-target="#ModalDelete" id={nota._id} onClick={prop1}>Eliminar</button>
        </div>
    </div>
    </div>
    )
 }

 export default Card
//Token de autorizacion de usuario Autenticado
const token = localStorage.getItem("token");

function ModalDelete({idNote, H5, render}){

  const ID= {"ID": idNote};

  function deleteNote(){
    console.log(ID,H5,render)
    fetch(`${import.meta.env.VITE_URL_BACKEND}/notes/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
      body: JSON.stringify(ID),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        render(true);
      })
      .catch((error) => {
        console.error("Error al enviar la nota:", error);
      });
  }
  
  


    return(
        <>
                {/* <!-- Modal para eliminar una Nota --> */}
         <div className="modal fade" id="ModalDelete" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ModalDeleteLabel">Eliminar Nota</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                 <p>¿Estas seguro/a que desea eliminar la nota <span className="fw-bolder">{H5}</span></p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteNote}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default ModalDelete
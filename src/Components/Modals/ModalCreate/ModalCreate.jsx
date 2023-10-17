//Token de autorizacion de usuario Autenticado
const token = localStorage.getItem("token");

function ModalCreate({render}){

    function enviarDatos(event){

        event.preventDefault()
        const dataForm = Object.fromEntries(new FormData(event.target));

        console.log(dataForm)

        fetch(`${import.meta.env.VITE_URL_BACKEND}/notes/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: `${token}`,
            },
            body: JSON.stringify(dataForm),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
                render(true)
            })
            .catch((error) => {
              console.error("Error al enviar la nota:", error);
            });
    }

    return(
            <>
        {/* <!-- Modal para Agregar Nueva Nota --> */}
    <div className="modal fade" id="modalCreate"  aria-labelledby="modalMLabel" aria-hidden="true"
    data-bs-backdrop="static" data-bs-keyboard="false">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content bg-dark text-white">
            <div className="modal-header">
                <h5 className="modal-title" id="modalMLabel">Crear Nota</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {/* <!-- Formulario para ingresar título y contenido --> */}
                <form onSubmit={enviarDatos}>
                    <div className="mb-3">
                        <label for="titulo" className="form-label text-white">Título de la Nota</label>
                        <input type="text" className="form-control" id="titulo" name="titulo" required />
                    </div>
                    <div className="mb-3">
                        <label for="contenido" className="form-label text-white">Contenido</label>
                        <textarea className="form-control" id="contenido" name="contenido" rows="4" required></textarea>
                    </div>
                    <div className="mb-3">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</>
    )
}

export default ModalCreate
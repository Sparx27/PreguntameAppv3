import { navegar } from "../navigation/navegar"
import FotoUsuario from "./FotoUsuario"
import "../styles/stylesComponents/usuarioCard.css"

function UsuarioCard({ usuario }) {
  return (
    <div className="usuario-card shadow-lg mb-2 p-2 p-md-3">

      <div className="usuario-foto-container">
        <FotoUsuario username={usuario.username} ajustarMedidas='usuario-card-foto' />
      </div>

      <div className="usuario-datos">
        <p className="h4 oscuro mb-1">{usuario.nombre} {usuario.apellido}</p>
        <p className="fw-bold mb-0">@{usuario.username}</p>
      </div>

      <div className="usuario-actions">
        <button className="boton" onClick={() => navegar(`/usuarios/perfil/${usuario.username}`)}>Perfil</button>
      </div>

    </div>
  )
}

export default UsuarioCard
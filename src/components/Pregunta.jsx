import Link from "../navigation/Link"
import { navegar } from "../navigation/navegar"
import '../styles/stylesComponents/pregunta.css'

function Pregunta({ pregunta }) {
  const { id, anonima, usuarioEnvia, dsc, fecha } = pregunta

  return (
    <article className="card-pregunta shadow">
      {
        anonima
          ? <p className="autor-pregunta">Anónimo</p>
          : <Link to={`/usuarios/perfil/${usuarioEnvia}`} className='text-decoration-none'>
            <p className="autor-pregunta usuario-pregunta">{usuarioEnvia}</p>
          </Link>
      }
      <p className="dsc-pregunta">{dsc}</p>
      <div className="opts-pregunta d-flex justify-content-between align-items-center">
        <p className="fecha-pregunta">{new Date(fecha).toLocaleString().slice(0, -3)}</p>
        <button className="boton" onClick={() => navegar(`/usuario/preguntas/responder-pregunta_id=${id}`)}>Responder</button>
      </div>
    </article>
  )
}

export default Pregunta
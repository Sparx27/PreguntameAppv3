import "../styles/stylesComponents/respuesta.css"
import iconoReply from "../assets/reply_icon.webp"
import Link from "../navigation/Link"
import like_icon from "../assets/like.webp"
import nolike_icon from "../assets/no_like.webp"
import { useContext, useState } from "react"
import { SesionContext } from "../context/SesionContext"
import { navegar } from "../navigation/navegar"
import { traducirError } from "../helpers/erroresFetch"
import { fetchLike } from "../fetch/interacciones"

function Respuesta({ respuesta }) {
  const [toggleLike, setToggleLike] = useState(respuesta.likeUsuarioLog)
  const [nLikes, setNLikes] = useState(respuesta.nlikes)
  const { haySesion, setUsuarioLog, setMensajeUsuario } = useContext(SesionContext)

  async function enviarLike() {
    setToggleLike(!toggleLike)
    if (toggleLike) {
      setNLikes(nLikes - 1)
    }
    else {
      setNLikes(nLikes + 1)
    }
    try {
      await fetchLike(respuesta.respuestaID, respuesta.usuarioRecibe)
    }
    catch (error) {
      const yaManejoError = traducirError(error, setUsuarioLog, setMensajeUsuario, navegar)
      if (!yaManejoError) {
        setMensajeUsuario({ mensaje: error.message })
      }
    }
  }

  return (
    <article className="respuesta-box">

      <div className="respuesta-pregunta">
        <p className="respuesta-uenvia">
          (
          {
            respuesta.preguntaAnonima
              ? 'Anónimo'
              : <Link className='negro' to={`/usuarios/perfil/${respuesta.usuarioEnvia}`}>{respuesta.usuarioEnvia}</Link>
          }
          )&nbsp;
        </p>
        <p className="p-pregunta">{respuesta.dscPregunta} </p>

      </div>

      <div className="respuesta-respuesta">
        <img src={iconoReply} alt="icono respuesta" className="icono-respuesta" />
        <p className="p-respuesta">&nbsp;{respuesta.dscRespuesta}</p>
      </div>

      <p className="fecha-respuesta">
        {
          new Date(respuesta.fechaRespuesta).toLocaleString().slice(0, -3)
        }
      </p>

      <div className="div-like">
        {
          haySesion ? (
            toggleLike
              ? <button className="boton-img" onClick={enviarLike}>
                <img src={like_icon} alt="like" className="img-like" />
              </button>
              : <button className="boton-img" onClick={enviarLike}>
                <img src={nolike_icon} alt="dislike" className="img-like" />
              </button>
          ) : <img src={like_icon} alt="like" className="img-like" style={{ width: '20px' }} />

        }
        <p className="n-likes">{nLikes}</p>
      </div>

    </article>
  )
}

export default Respuesta
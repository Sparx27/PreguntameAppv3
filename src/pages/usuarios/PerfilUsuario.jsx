import { useContext, useEffect, useState } from "react"
import { fetchGetPerfilUsuario } from "../../fetch/usuarios"
import "../../styles/stylesPages/usuarios/perfilUsuario.css"
import Spinner from "../../components/Spinner"
import { SesionContext } from "../../context/SesionContext"
import { traducirError } from "../../helpers/erroresFetch"
import { navegar } from "../../navigation/navegar"
import BoxDescripciones from "../../components/BoxDescripciones"
import Respuesta from "../../components/Respuesta"
import { fetchPostPregunta } from "../../fetch/interacciones"
import FotoUsuario from "../../components/FotoUsuario"

function PerfilUsuario({ routeParams }) {
  const { query } = routeParams
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(false)

  const { setUsuarioLog, setMensajeUsuario } = useContext(SesionContext)

  const [dscPregunta, setDscPregunta] = useState('')
  const [letrasRestantes, setLetrasRestantes] = useState(300)


  useEffect(() => {
    async function obtenerPerfilUsuario() {
      try {
        setCargando(true)
        const res = await fetchGetPerfilUsuario(query)
        setUsuario(res)
      }
      catch (error) {
        const yaManejoError = traducirError(error, setUsuarioLog, setMensajeUsuario, navegar)
        if (!yaManejoError) {
          setMensajeUsuario({ mensaje: error.message })
        }
      }
      finally {
        setCargando(false)
      }
    }
    obtenerPerfilUsuario()
  }, [query])


  useEffect(() => {
    setLetrasRestantes(300 - dscPregunta.length)
  }, [dscPregunta])

  function manejarDscPregunta(e) {
    setDscPregunta(e.target.value)
  }

  async function hacerPregunta() {

    // Agregar validaciones a Dsc

    try {
      const res = await fetchPostPregunta({
        usuarioRecibe: usuario.username,
        dsc: dscPregunta
      })
      setDscPregunta('')
      setMensajeUsuario({ mensaje: res.message, tipo: 'success' })
    }
    catch (error) {
      const yaManejoError = traducirError(error, setUsuarioLog, setMensajeUsuario, navegar)
      if (!yaManejoError) {
        setMensajeUsuario({ mensaje: error.message })
      }
    }
  }

  return (
    <section className="perfil-usuario shadow-lg">

      <div className="container-fluid ">
        <div className='row bg-oscuro pt-3 pt-md-4 pb-md-2 usuario-presentacion align-items-start px-md-3'>

          <div className="col-12 col-md-8">
            <div className="usuario-identificacion-2">

              <FotoUsuario username={usuario?.username} ajustarMedidas='foto-usuario' />
              <div className="usuario-identificacion">
                <h1 className="h2">
                  {
                    usuario
                      ? usuario.nombre + ' ' + (usuario.apellido ?? '')
                      : 'Usuario no encontrado'
                  }
                </h1>
                <p>@
                  {
                    usuario
                      ? usuario.username
                      : 'noencontrado'
                  }
                </p>
              </div>

            </div>
          </div>

          <div className="col-12 col-md-4 px-4 align-self-md-center">
            <div className="d-flex justify-content-md-end">
              {
                usuario && <>
                  <p className="blanco fw-bold me-2">Likes {usuario.nLikes}</p>
                  <p className="blanco fw-bold ms-1">Seguidores {usuario.nSeguidores}</p>
                </>
              }
            </div>
          </div>

          {
            usuario && <div className="col-12 px-4 mt-1">
              <p>{usuario.bio}</p>
            </div>
          }

        </div>
      </div>

      <div className="usuario-hacer-pregunta px-md-4">
        {
          usuario && <>
            <h2 className="mb-2 oscuro">{usuario && (usuario.preguntasBio ? usuario.preguntasBio : 'Hazme una pregunta!')}</h2>
            <BoxDescripciones
              txtName='dscPregunta'
              txtValue={dscPregunta}
              txtOnChange={manejarDscPregunta}
              txtPlaceholder='Escribe aquí tu pregunta'
              txtRestante={letrasRestantes}
              txtOnSubmit={hacerPregunta}
              textareaStyle='textarea-100'
            />
          </>
        }
      </div>

      <div className="usuario-respuestas px-md-4">
        <h2 className="mb-3 oscuro">Respuestas</h2>
        {
          cargando
            ? <Spinner />
            : usuario?.liRespuestas.length > 0
              ? usuario.liRespuestas.map(r => <Respuesta key={r.respuestaID} respuesta={r} />)
              : <p><i>El usuario aún no tiene respuestas. Sé el primero en preguntarle!</i></p>
        }
      </div>

    </section>
  )
}

export default PerfilUsuario
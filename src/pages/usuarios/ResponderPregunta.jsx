import { useContext, useEffect, useState } from "react"
import { fetchGetPreguntaID, fetchPostRespuesta } from "../../fetch/usuarios"
import { SesionContext } from "../../context/SesionContext"
import Link from "../../navigation/Link"
import { navegar } from "../../navigation/navegar"
import "../../styles/stylesComponents/pregunta.css"
import "../../styles/stylesPages/usuarios/responderPregunta.css"
import BoxDescripciones from "../../components/BoxDescripciones"
import { traducirError } from "../../helpers/erroresFetch"
import Spinner from "../../components/Spinner"


function ResponderPregunta({ routeParams }) {
  const [pregunta, setPregunta] = useState(null)
  const [dscRespuesta, setDscRespuesta] = useState('')
  const [letrasRestantes, setLetrasRestantes] = useState(300)
  const { setUsuarioLog, setMensajeUsuario } = useContext(SesionContext)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    async function obtenerPregunta() {
      try {
        setCargando(true)
        const res = await fetchGetPreguntaID(routeParams.query)
        setPregunta(res)
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
    obtenerPregunta()
  }, [routeParams.query, setMensajeUsuario, setUsuarioLog])

  useEffect(() => {
    setLetrasRestantes(300 - dscRespuesta.length)
  }, [dscRespuesta])

  function manejarDscRespuesta(e) {
    setDscRespuesta(e.target.value)
  }

  async function responderPregunta() {
    if (dscRespuesta.trim().length < 1) {
      return setMensajeUsuario('Debe ingresar alguna respuesta')
    }
    try {
      setCargando(true)
      const res = await fetchPostRespuesta({
        preguntaId: pregunta.id,
        dsc: dscRespuesta.trim()
      })
      setDscRespuesta('')
      setCargando(false)
      navegar('/usuario/preguntas')
      setMensajeUsuario({ mensaje: res.message, tipo: 'success' })
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

  function cancelarPregunta() {
    navegar('/usuario/preguntas')
  }

  return (
    <section>
      <h1 className="oscuro text-center mt-4">Responder Pregunta</h1>
      {
        pregunta && (
          <article className="card-pregunta shadow py-4">

            <div className="box-pregunta">
              {
                pregunta.anonima
                  ? <p className="autor-pregunta">Anónimo</p>
                  : <p className="autor-pregunta usuario-pregunta">
                    Responder a&nbsp;
                    <Link to={`/usuarios/perfil/${pregunta.usuario_Envia}`} className='oscuro'>
                      {pregunta.usuario_Envia}
                    </Link>
                  </p>

              }
              <p className="dsc-pregunta">{pregunta.dsc}</p>
              <p className="fecha-pregunta mt-3">
                {new Date(pregunta.fecha).toLocaleString().slice(0, -3)}
              </p>
            </div>

            <div className="box-respuesta">
              {
                cargando
                  ? <Spinner />
                  : <BoxDescripciones
                    txtName='dscRespuesta'
                    txtValue={dscRespuesta}
                    txtOnChange={manejarDscRespuesta}
                    txtPlaceholder='Escribe aquí tu respuesta'
                    txtOnSubmit={responderPregunta}
                    txtRestante={letrasRestantes}
                    btnValue='Responder'
                    btnCancelar={true}
                    txtOnCancelar={cancelarPregunta}
                  />
              }
            </div>
          </article>
        )
      }
    </section>
  )
}

export default ResponderPregunta
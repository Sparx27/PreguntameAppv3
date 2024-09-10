import { useContext, useState } from "react"
import { useEffect } from "react"
import Pregunta from "../../components/Pregunta"
import { fetchGetPreguntas } from "../../fetch/usuarios"
import Spinner from "../../components/Spinner"
import { SesionContext } from "../../context/SesionContext"
import { navegar } from "../../navigation/navegar"
import { traducirError } from "../../helpers/erroresFetch"

function Preguntas() {
  const [cargando, setCargando] = useState(false)
  const [liPreguntas, setLiPreguntas] = useState([])
  const { setUsuarioLog, setMensajeUsuario } = useContext(SesionContext)

  useEffect(() => {
    async function obtenerPreguntas() {
      try {
        setCargando(true)
        setMensajeUsuario(null)

        const res = await fetchGetPreguntas()
        if (res.length > 0) {
          res.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
          setLiPreguntas(res)
        }
      }
      catch (error) {
        const yaManejoError = traducirError(error, setUsuarioLog, setMensajeUsuario, navegar)
        if (!yaManejoError) {
          console.log('entro')
          setMensajeUsuario({ mensaje: error.message })
        }
      }
      finally {
        setCargando(false)
      }
    }
    obtenerPreguntas()
  }, [setUsuarioLog, setMensajeUsuario])

  return (
    <section>
      <h1 className="text-center oscuro mt-4">Preguntas</h1>
      {
        cargando ? <Spinner /> : (
          liPreguntas.length > 0
            ? liPreguntas.map((p, i) => {
              return <Pregunta key={i + 1012} pregunta={p} />
            })
            : <p className="text-center mt-4 medio fs-5">No tienes Preguntas pendientes de responder en este momento</p>
        )
      }
    </section>
  )
}

export default Preguntas
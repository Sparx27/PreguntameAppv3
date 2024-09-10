import { useContext, useEffect, useState } from "react"
import { fetchBuscarUsuarios } from "../fetch/usuarios"
import { traducirError } from "../helpers/erroresFetch"
import { SesionContext } from "../context/SesionContext"
import { navegar } from "../navigation/navegar"
import Spinner from "../components/Spinner"
import UsuarioCard from "../components/UsuarioCard"

function BuscarUsuarios({ routeParams }) {
  const [listaUsuarios, setListaUsuarios] = useState([])
  const [cargando, setCargando] = useState(false)
  const { setUsuarioLog, setMensajeUsuario } = useContext(SesionContext)

  useEffect(() => {
    async function obtenerUsuarios() {
      try {
        setCargando(true)
        const res = await fetchBuscarUsuarios(routeParams.query)
        setListaUsuarios(res)
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
    obtenerUsuarios()
  }, [routeParams.query])

  return (
    <section>
      <div className="container-fluid mt-4 px-0">

        <h1 className="oscuro text-center mb-3">Resultados</h1>

        <div className="d-flex flex-column justify-content-center align-items-center">
          {
            cargando
              ? <Spinner />
              : listaUsuarios.length > 0
                ? listaUsuarios.map((u, i) => <UsuarioCard key={5721 + i} usuario={u} />)
                : <p className="text-center mt-4 oscuro fs-5">No se encontraron usuarios</p>
          }
        </div>


      </div>
    </section>
  )
}

export default BuscarUsuarios
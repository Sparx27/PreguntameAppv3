import { useContext } from "react"
import { SesionContext } from "../context/SesionContext"

function MensajeUsuario({ mensaje, tipo = 'danger' }) {
  const { haySesion } = useContext(SesionContext)

  return <div className="mensaje-usuario-container" style={{ marginTop: (haySesion ? '57px' : '5px') }}>
    <p className={`alert alert-${tipo} text-center fw-bold text-${tipo}`}>{mensaje}</p>
  </div>
}

export default MensajeUsuario
import { createContext, useEffect, useState } from "react"
import { fetchGetNPreguntas } from "../fetch/usuarios";
import { traducirError } from "../helpers/erroresFetch";
import { navegar } from "../navigation/navegar";

export const SesionContext = createContext()

function SesionProvider({ children }) {
  const [usuarioLog, setUsuarioLog] = useState(() => {
    const usuario = window.localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  });
  const [haySesion, setHaySesion] = useState(false)
  const [mensajeUsuario, setMensajeUsuario] = useState(null)
  const [nPreguntas, setNPreguntas] = useState(null)

  useEffect(() => {
    console.log('sesioneffect')
    if (usuarioLog == null) {
      window.localStorage.removeItem('usuario')
      setHaySesion(false)
    }
    else {
      setHaySesion(true)
      obtenerNumeroPreguntas()
    }
  }, [usuarioLog])


  useEffect(() => {
    if (mensajeUsuario != null) {
      const limpiarMensaje = setTimeout(() => {
        setMensajeUsuario(null)
      }, 5000)

      return () => clearTimeout(limpiarMensaje)
    }
  }, [mensajeUsuario])

  async function obtenerNumeroPreguntas() {
    console.log('preguntas')
    try {
      const res = await fetchGetNPreguntas()
      setNPreguntas(res.nPreguntas)
    }
    catch (error) {
      console.log(error)
    }
  }

  const data = {
    usuarioLog,
    setUsuarioLog,
    haySesion,
    setHaySesion,
    mensajeUsuario,
    setMensajeUsuario,
    obtenerNumeroPreguntas,
    setNPreguntas,
    nPreguntas
  }

  return <SesionContext.Provider value={data} >{children}</SesionContext.Provider>
}

export default SesionProvider
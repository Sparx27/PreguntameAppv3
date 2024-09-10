export const traducirError = (
  error,
  setUsuarioLog,
  setMensajeUsuario,
  navegar
) => {
  if (error.message == "Fallo en la autenticación del token") {
    localStorage.removeItem('usuario')
    setUsuarioLog(null)
    setMensajeUsuario({ mensaje: 'Por favor, inicie sesión nuevamente' })
    navegar('/iniciar-sesion')
    return true
  }

  if (error.code == 401) {
    localStorage.removeItem('usuario')
    setUsuarioLog(null)
    setMensajeUsuario({ mensaje: 'Por favor, inicie sesión nuevamente' })
    navegar('/iniciar-sesion')
    return true
  }

  if (error.message == "Failed to fetch") {
    setMensajeUsuario({ mensaje: "El servidor no responde" })
    return true
  }

  if (error.message == null ||
    error.message == undefined ||
    error.message == "" ||
    error.message == "Unexpected end of JSON input"
  ) {
    setMensajeUsuario({ mensaje: "Algo no salió correctamente" })
    return true
  }

  return false
}
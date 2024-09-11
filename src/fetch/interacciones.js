const INTERACCIONES_URL = 'https://localhost:7075/api/interacciones/'

export const fetchPostPregunta = async (pregunta) => {
  try {
    const res = await fetch(INTERACCIONES_URL + 'enviar-pregunta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuarioRecibe: pregunta.usuarioRecibe,
        dsc: pregunta.dsc
      }),
      credentials: 'include'
    })

    if (!res.ok) {
      const errorBody = await res.json()
      const errorCode = res.status
      return Promise.reject({ message: errorBody.message, code: errorCode })
    }

    return await res.json()
  }
  catch (errorData) {
    return Promise.reject(errorData)
  }
}

export const fetchLike = async (idRespuesta, usernameUsuarioRecibe) => {
  try {
    const res = await fetch(INTERACCIONES_URL + 'like-pregunta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idRespuesta: idRespuesta,
        usernameUsuarioRecibe: usernameUsuarioRecibe
      }),
      credentials: 'include'
    })

    if (!res.ok) {
      const errorBody = await res.json()
      const errorCode = res.status
      return Promise.reject({ message: errorBody.message, code: errorCode })
    }

    // Verificar header para largo respuesta servidor
    const contentLength = res.headers.get('Content-Length')
    if (contentLength === '0' || !contentLength) {
      return {}
    }

    return await res.json()
  }
  catch (error) {
    return Promise.reject(error)
  }
}
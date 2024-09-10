const USUARIO_URL = 'https://localhost:7075/api/usuarios/'

export const fetchRegistro = async (nuevoUsuario) => {
  try {
    const res = await fetch(USUARIO_URL + 'registrar-usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: nuevoUsuario.registroUsername,
        email: nuevoUsuario.registroEmail,
        uPassword: nuevoUsuario.registroUPassword,
        nombre: nuevoUsuario.registroNombre,
        apellido: nuevoUsuario.registroApellido
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


export const fetchiIniciarSesion = async (username, uPassword) => {
  try {
    const res = await fetch(USUARIO_URL + 'iniciar-sesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, uPassword }),
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

export const fetchGetFotoUsuario = async (username) => {
  try {
    const res = await fetch(`${USUARIO_URL}foto-usuario/${username}`)

    if (!res.ok) {
      const errorBody = await res.json()
      const errorCode = res.status
      return Promise.reject({ message: errorBody.message, code: errorCode })
    }

    return await res.blob()
  }
  catch (error) {
    return Promise.reject(error)
  }
}

export const fetchGetNPreguntas = async () => {
  try {
    const res = await fetch(USUARIO_URL + 'notificar-preguntas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    if (!res.ok) {
      const errorBody = await res.json()
      const errorCode = res.status
      return Promise.reject({ message: errorBody.message, code: errorCode })
    }

    return await res.json()
  }
  catch (error) {
    return Promise.reject(error)
  }
}

export const fetchCerrarSesion = async () => {
  try {
    const res = await fetch(USUARIO_URL + 'cerrar-sesion', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    if (!res.ok) {
      const errorBody = await res.json()
      const errorCode = res.status
      return Promise.reject({ message: errorBody.message, code: errorCode })
    }

    return await res.json()
  }
  catch (error) {
    return Promise.reject(error)
  }
}

export const fetchEditarPerfil = async (nuevosDatosUsuario) => {
  try {
    const res = await fetch(USUARIO_URL + 'editar-perfil', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevosDatosUsuario),
      credentials: 'include'
    })

    if (!res.ok) {
      const errorBody = await res.json()
      const errorCode = res.status
      return Promise.reject({ message: errorBody.message, code: errorCode })
    }

    return await res.json()
  }
  catch (error) {
    return Promise.reject(error)
  }
}

export const fetchCambiarFotoUsuario = async (formData) => {
  try {
    const res = await fetch(USUARIO_URL + 'cambiar-foto-usuario', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })

    if (!res.ok) {
      const errorCode = res.status
      const errorBody = await res.json()
      return Promise.reject({ message: errorBody, code: errorCode })
    }

    return await res.json()
  }
  catch (error) {
    return Promise.reject(error)
  }
}

export const fetchGetPerfilUsuario = async (username) => {
  try {
    const res = await fetch(USUARIO_URL + `perfil/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
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

export const fetchGetPreguntas = async () => {
  try {
    const res = await fetch(USUARIO_URL + 'preguntas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    if (!res.ok) {
      const errorBody = await res.json()
      const errorCode = res.status
      return Promise.reject({ message: errorBody.message, code: errorCode })
    }

    return await res.json()
  }
  catch (error) {
    return Promise.reject(error)
  }
}

export const fetchGetPreguntaID = async (id) => {
  try {
    const res = await fetch(USUARIO_URL + `pregunta/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    if (!res.ok) {
      const errorBody = await res.json()
      const errorCode = res.status
      return Promise.reject({ message: errorBody.message, code: errorCode })
    }

    return res.json()
  }
  catch (errorData) {
    return Promise.reject(errorData)
  }
}

export const fetchPostRespuesta = async (dataRespuesta) => {
  try {
    const res = await fetch(USUARIO_URL + 'responder-pregunta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        preguntaId: dataRespuesta.preguntaId,
        dsc: dataRespuesta.dsc
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
  catch (dataError) {
    return Promise.reject(dataError)
  }
}

export const fetchBuscarUsuarios = async (busqueda) => {
  try {
    const res = await fetch(USUARIO_URL + `buscar-usuarios/${busqueda}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      const errorBody = await res.json()
      const errorCode = res.status
      return Promise.reject({ message: errorBody.message, code: errorCode })
    }

    return await res.json()
  }
  catch (dataError) {
    return Promise.reject(dataError)
  }
}

// FIN FETCHS PARA FEED